const puppeteer = require('puppeteer');
const { spawn } = require('child_process');

const CONFIG = {
    url: 'https://cryptotick.live/bitcoin?pm=1',
    resolution: {
        width: 1280,
        height: 720
    },
    retryDelay: 5000,  // 5秒后重试
    maxRetries: 3
};

// 检查命令行参数
if (process.argv.length < 3) {
    console.error('Please provide YouTube stream key');
    console.error('Usage: node stream.js <youtube-stream-key>');
    process.exit(1);
}

// 从命令行获取 stream key
CONFIG.streamKey = process.argv[2];

async function startStreaming() {
    let retryCount = 0;
    let xvfb, browser, ffmpeg;

    try {
        // 启动虚拟显示器
        xvfb = spawn('Xvfb', [':99', '-screen', '0', 
            `${CONFIG.resolution.width}x${CONFIG.resolution.height}x24`]);
        process.env.DISPLAY = ':99';

        console.log('Starting browser...');
        browser = await puppeteer.launch({
            headless: false,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                `--window-size=${CONFIG.resolution.width},${CONFIG.resolution.height}`
            ],
            defaultViewport: CONFIG.resolution
        });

        const page = await browser.newPage();
        
        // 页面加载错误处理
        page.on('error', err => {
            console.error('Page error:', err);
            handleError();
        });

        console.log('Navigating to page...');
        await page.goto(CONFIG.url, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        console.log('Starting FFmpeg stream...');
        ffmpeg = spawn('ffmpeg', [
            '-f', 'x11grab',
            '-framerate', '30',
            '-video_size', `${CONFIG.resolution.width}x${CONFIG.resolution.height}`,
            '-i', ':99',
            '-c:v', 'libx264',
            '-preset', 'veryfast',
            '-b:v', '6000k',
            '-maxrate', '6000k',
            '-bufsize', '12000k',
            '-pix_fmt', 'yuv420p',
            '-g', '50',
            '-f', 'flv',
            `rtmp://a.rtmp.youtube.com/live2/${CONFIG.streamKey}`
        ]);

        ffmpeg.stderr.on('data', (data) => {
            console.log(`FFmpeg: ${data}`);
        });

        ffmpeg.on('error', (err) => {
            console.error('FFmpeg error:', err);
            handleError();
        });

    } catch (error) {
        console.error('Error in streaming:', error);
        handleError();
    }

    // 错误处理和重试
    async function handleError() {
        if (retryCount < CONFIG.maxRetries) {
            retryCount++;
            console.log(`Retrying (${retryCount}/${CONFIG.maxRetries}) in ${CONFIG.retryDelay/1000} seconds...`);
            await cleanup();
            setTimeout(startStreaming, CONFIG.retryDelay);
        } else {
            console.error('Max retries reached, exiting...');
            await cleanup();
            process.exit(1);
        }
    }

    // 清理函数
    async function cleanup() {
        if (browser) await browser.close();
        if (xvfb) xvfb.kill();
        if (ffmpeg) ffmpeg.kill();
    }

    // 优雅退出
    process.on('SIGINT', async () => {
        console.log('Received SIGINT, cleaning up...');
        await cleanup();
        process.exit();
    });

    process.on('SIGTERM', async () => {
        console.log('Received SIGTERM, cleaning up...');
        await cleanup();
        process.exit();
    });
}

// 启动流程
console.log('Starting streaming service...');
startStreaming().catch(console.error);
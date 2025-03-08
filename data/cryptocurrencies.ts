export type CryptoCurrency = {
  id: string
  symbol: string
  name: string
  icon?: string
  image?: string
  color?: string
}

// 前 100 个加密货币的静态数据
export const TOP_CRYPTOCURRENCIES: CryptoCurrency[] = [
  {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "icon": "₿",
    "color": "#f7931a",
    "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
  },
  {
    "id": "ethereum",
    "symbol": "eth",
    "name": "Ethereum",
    "icon": "Ξ",
    "color": "#627eea",
    "image": "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628"
  },
  {
    "id": "tether",
    "symbol": "usdt",
    "name": "Tether",
    "icon": "₮",
    "color": "#26a17b",
    "image": "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661"
  },
  {
    "id": "ripple",
    "symbol": "xrp",
    "name": "XRP",
    "icon": "✕",
    "color": "#23292f",
    "image": "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442"
  },
  {
    "id": "binancecoin",
    "symbol": "bnb",
    "name": "BNB",
    "icon": "Ƀ",
    "color": "#f3ba2f",
    "image": "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970"
  },
  {
    "id": "solana",
    "symbol": "sol",
    "name": "Solana",
    "icon": "◎",
    "color": "#00ffbd",
    "image": "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756"
  },
  {
    "id": "usd-coin",
    "symbol": "usdc",
    "name": "USDC",
    "icon": "₮",
    "image": "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694"
  },
  {
    "id": "cardano",
    "symbol": "ada",
    "name": "Cardano",
    "icon": "₳",
    "image": "https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090"
  },
  {
    "id": "dogecoin",
    "symbol": "doge",
    "name": "Dogecoin",
    "icon": "Ð",
    "color": "#c3a634",
    "image": "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409"
  },
  {
    "id": "tron",
    "symbol": "trx",
    "name": "TRON",
    "icon": "Ŧ",
    "image": "https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193"
  },
  {
    "id": "staked-ether",
    "symbol": "steth",
    "name": "Lido Staked Ether",
    "icon": "Ξˢ",
    "image": "https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206"
  },
  {
    "id": "pi-network",
    "symbol": "pi",
    "name": "Pi Network",
    "icon": "π",
    "color": "#6b3fa0",
    "image": "https://coin-images.coingecko.com/coins/images/54342/large/pi_network.jpg?1739347576"
  },
  {
    "id": "wrapped-bitcoin",
    "symbol": "wbtc",
    "name": "Wrapped Bitcoin",
    "icon": "₿ᵂ",
    "image": "https://coin-images.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png?1696507857"
  },
  {
    "id": "chainlink",
    "symbol": "link",
    "name": "Chainlink",
    "icon": "⬡",
    "image": "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009"
  },
  {
    "id": "hedera-hashgraph",
    "symbol": "hbar",
    "name": "Hedera",
    "icon": "ℏ",
    "image": "https://coin-images.coingecko.com/coins/images/3688/large/hbar.png?1696504364"
  },
  {
    "id": "leo-token",
    "symbol": "leo",
    "name": "LEO Token",
    "icon": "₴",
    "image": "https://coin-images.coingecko.com/coins/images/8418/large/leo-token.png?1696508607"
  },
  {
    "id": "wrapped-steth",
    "symbol": "wsteth",
    "name": "Wrapped stETH",
    "icon": "Ξˢᵂ",
    "image": "https://coin-images.coingecko.com/coins/images/18834/large/wstETH.png?1696518295"
  },
  {
    "id": "avalanche-2",
    "symbol": "avax",
    "name": "Avalanche",
    "icon": "Ⓐ",
    "image": "https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1696512369"
  },
  {
    "id": "stellar",
    "symbol": "xlm",
    "name": "Stellar",
    "icon": "✻",
    "image": "https://coin-images.coingecko.com/coins/images/100/large/fmpFRHHQ_400x400.jpg?1735231350"
  },
  {
    "id": "usds",
    "symbol": "usds",
    "name": "USDS",
    "icon": "₮",
    "image": "https://coin-images.coingecko.com/coins/images/39926/large/usds.webp?1726666683"
  },
  {
    "id": "sui",
    "symbol": "sui",
    "name": "Sui",
    "icon": "Ⓢ",
    "image": "https://coin-images.coingecko.com/coins/images/26375/large/sui-ocean-square.png?1727791290"
  },
  {
    "id": "litecoin",
    "symbol": "ltc",
    "name": "Litecoin",
    "icon": "Ł",
    "image": "https://coin-images.coingecko.com/coins/images/2/large/litecoin.png?1696501400"
  },
  {
    "id": "bitcoin-cash",
    "symbol": "bch",
    "name": "Bitcoin Cash",
    "icon": "Ƀ",
    "image": "https://coin-images.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png?1696501932"
  },
  {
    "id": "shiba-inu",
    "symbol": "shib",
    "name": "Shiba Inu",
    "icon": "Ʃ",
    "image": "https://coin-images.coingecko.com/coins/images/11939/large/shiba.png?1696511800"
  },
  {
    "id": "the-open-network",
    "symbol": "ton",
    "name": "Toncoin",
    "icon": "₮",
    "image": "https://coin-images.coingecko.com/coins/images/17980/large/photo_2024-09-10_17.09.00.jpeg?1725963446"
  },
  {
    "id": "polkadot",
    "symbol": "dot",
    "name": "Polkadot",
    "icon": "●",
    "image": "https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png?1696512008"
  },
  {
    "id": "mantra-dao",
    "symbol": "om",
    "name": "MANTRA",
    "icon": "Ω",
    "image": "https://coin-images.coingecko.com/coins/images/12151/large/OM_Token.png?1696511991"
  },
  {
    "id": "weth",
    "symbol": "weth",
    "name": "WETH",
    "icon": "ΞW",
    "image": "https://coin-images.coingecko.com/coins/images/2518/large/weth.png?1696503332"
  },
  {
    "id": "bitget-token",
    "symbol": "bgb",
    "name": "Bitget Token",
    "icon": "₿",
    "image": "https://coin-images.coingecko.com/coins/images/11610/large/Bitget_logo.png?1736925727"
  },
  {
    "id": "ethena-usde",
    "symbol": "usde",
    "name": "Ethena USDe",
    "icon": "₮",
    "image": "https://coin-images.coingecko.com/coins/images/33613/large/usde.png?1733810059"
  },
  {
    "id": "hyperliquid",
    "symbol": "hype",
    "name": "Hyperliquid",
    "icon": "Ⓗ",
    "image": "https://coin-images.coingecko.com/coins/images/50882/large/hyperliquid.jpg?1729431300"
  },
  {
    "id": "wrapped-eeth",
    "symbol": "weeth",
    "name": "Wrapped eETH",
    "icon": "ΞW",
    "image": "https://coin-images.coingecko.com/coins/images/33033/large/weETH.png?1701438396"
  },
  {
    "id": "uniswap",
    "symbol": "uni",
    "name": "Uniswap",
    "icon": "⟠",
    "image": "https://coin-images.coingecko.com/coins/images/12504/large/uniswap-logo.png?1720676669"
  },
  {
    "id": "whitebit",
    "symbol": "wbt",
    "name": "WhiteBIT Coin",
    "icon": "₿",
    "image": "https://coin-images.coingecko.com/coins/images/27045/large/wbt_token.png?1696526096"
  },
  {
    "id": "monero",
    "symbol": "xmr",
    "name": "Monero",
    "icon": "ɱ",
    "image": "https://coin-images.coingecko.com/coins/images/69/large/monero_logo.png?1696501460"
  },
  {
    "id": "aptos",
    "symbol": "apt",
    "name": "Aptos",
    "icon": "Ⓐ",
    "image": "https://coin-images.coingecko.com/coins/images/26455/large/aptos_round.png?1696525528"
  },
  {
    "id": "near",
    "symbol": "near",
    "name": "NEAR Protocol",
    "icon": "Ⓝ",
    "image": "https://coin-images.coingecko.com/coins/images/10365/large/near.jpg?1696510367"
  },
  {
    "id": "susds",
    "symbol": "susds",
    "name": "sUSDS",
    "icon": "₮",
    "image": "https://coin-images.coingecko.com/coins/images/52721/large/sUSDS_Coin.png?1734086971"
  },
  {
    "id": "dai",
    "symbol": "dai",
    "name": "Dai",
    "icon": "◈",
    "image": "https://coin-images.coingecko.com/coins/images/9956/large/Badge_Dai.png?1696509996"
  },
  {
    "id": "ethereum-classic",
    "symbol": "etc",
    "name": "Ethereum Classic",
    "icon": "ξ",
    "image": "https://coin-images.coingecko.com/coins/images/453/large/ethereum-classic-logo.png?1696501717"
  },
  {
    "id": "ondo-finance",
    "symbol": "ondo",
    "name": "Ondo",
    "icon": "Ⓞ",
    "image": "https://coin-images.coingecko.com/coins/images/26580/large/ONDO.png?1696525656"
  },
  {
    "id": "internet-computer",
    "symbol": "icp",
    "name": "Internet Computer",
    "icon": "∞",
    "image": "https://coin-images.coingecko.com/coins/images/14495/large/Internet_Computer_logo.png?1696514180"
  },
  {
    "id": "aave",
    "symbol": "aave",
    "name": "Aave",
    "icon": "Ⓐ",
    "image": "https://coin-images.coingecko.com/coins/images/12645/large/aave-token-round.png?1720472354"
  },
  {
    "id": "pepe",
    "symbol": "pepe",
    "name": "Pepe",
    "icon": "🐸",
    "image": "https://coin-images.coingecko.com/coins/images/29850/large/pepe-token.jpeg?1696528776"
  },
  {
    "id": "okb",
    "symbol": "okb",
    "name": "OKB",
    "icon": "Ⓞ",
    "image": "https://coin-images.coingecko.com/coins/images/4463/large/WeChat_Image_20220118095654.png?1696505053"
  },
  {
    "id": "gatechain-token",
    "symbol": "gt",
    "name": "Gate",
    "icon": "Ⓖ",
    "image": "https://coin-images.coingecko.com/coins/images/8183/large/200X200.png?1735246724"
  },
  {
    "id": "coinbase-wrapped-btc",
    "symbol": "cbbtc",
    "name": "Coinbase Wrapped BTC",
    "icon": "₿ᶜ",
    "image": "https://coin-images.coingecko.com/coins/images/40143/large/cbbtc.webp?1726136727"
  },
  {
    "id": "official-trump",
    "symbol": "trump",
    "name": "Official Trump",
    "icon": "₮",
    "image": "https://coin-images.coingecko.com/coins/images/53746/large/trump.png?1737171561"
  },
  {
    "id": "ethena",
    "symbol": "ena",
    "name": "Ethena",
    "icon": "Ξ",
    "image": "https://coin-images.coingecko.com/coins/images/36530/large/ethena.png?1711701436"
  },
  {
    "id": "vechain",
    "symbol": "vet",
    "name": "VeChain",
    "icon": "⩑",
    "image": "https://coin-images.coingecko.com/coins/images/1167/large/VET_Token_Icon.png?1710013505"
  },
  {
    "id": "mantle",
    "symbol": "mnt",
    "name": "Mantle",
    "icon": "Ⓜ",
    "image": "https://coin-images.coingecko.com/coins/images/30980/large/Mantle-Logo-mark.png?1739213200"
  },
  {
    "id": "tokenize-xchange",
    "symbol": "tkx",
    "name": "Tokenize Xchange",
    "icon": "₮",
    "image": "https://coin-images.coingecko.com/coins/images/4984/large/TKX_-_Logo_-_RGB-15.png?1696505519"
  },
  {
    "id": "crypto-com-chain",
    "symbol": "cro",
    "name": "Cronos",
    "icon": "₵",
    "image": "https://coin-images.coingecko.com/coins/images/7310/large/cro_token_logo.png?1696507599"
  },
  {
    "id": "bittensor",
    "symbol": "tao",
    "name": "Bittensor",
    "icon": "τ",
    "image": "https://coin-images.coingecko.com/coins/images/28452/large/ARUsPeNQ_400x400.jpeg?1696527447"
  },
  {
    "id": "first-digital-usd",
    "symbol": "fdusd",
    "name": "First Digital USD",
    "icon": "₮",
    "image": "https://coin-images.coingecko.com/coins/images/31079/large/FDUSD_icon_black.png?1731097953"
  },
  {
    "id": "polygon-ecosystem-token",
    "symbol": "pol",
    "name": "POL (ex-MATIC)",
    "icon": "⬡",
    "image": "https://coin-images.coingecko.com/coins/images/32440/large/polygon.png?1698233684"
  },
  {
    "id": "filecoin",
    "symbol": "fil",
    "name": "Filecoin",
    "icon": "⨎",
    "image": "https://coin-images.coingecko.com/coins/images/12817/large/filecoin.png?1696512609"
  },
  {
    "id": "algorand",
    "symbol": "algo",
    "name": "Algorand",
    "icon": "Ⓐ",
    "image": "https://coin-images.coingecko.com/coins/images/4380/large/download.png?1696504978"
  },
  {
    "id": "kaspa",
    "symbol": "kas",
    "name": "Kaspa",
    "icon": "₭",
    "image": "https://coin-images.coingecko.com/coins/images/25751/large/kaspa-icon-exchanges.png?1696524837"
  },
  {
    "id": "render-token",
    "symbol": "render",
    "name": "Render",
    "icon": "Ⓡ",
    "image": "https://coin-images.coingecko.com/coins/images/11636/large/rndr.png?1696511529"
  },
  {
    "id": "cosmos",
    "symbol": "atom",
    "name": "Cosmos Hub",
    "icon": "⚛",
    "image": "https://coin-images.coingecko.com/coins/images/1481/large/cosmos_hub.png?1696502525"
  },
  {
    "id": "celestia",
    "symbol": "tia",
    "name": "Celestia",
    "icon": "✧",
    "image": "https://coin-images.coingecko.com/coins/images/31967/large/tia.jpg?1696530772"
  },
  {
    "id": "lombard-staked-btc",
    "symbol": "lbtc",
    "name": "Lombard Staked BTC",
    "icon": "₿ˡ",
    "image": "https://coin-images.coingecko.com/coins/images/39969/large/LBTC_Logo.png?1724959872"
  },
  {
    "id": "arbitrum",
    "symbol": "arb",
    "name": "Arbitrum",
    "icon": "Ⓐ",
    "image": "https://coin-images.coingecko.com/coins/images/16547/large/arb.jpg?1721358242"
  },
  {
    "id": "fasttoken",
    "symbol": "ftn",
    "name": "Fasttoken",
    "icon": "₣",
    "image": "https://coin-images.coingecko.com/coins/images/28478/large/lightenicon_200x200.png?1696527472"
  },
  {
    "id": "sonic-3",
    "symbol": "s",
    "name": "Sonic (prev. FTM)",
    "icon": "Ⓢ",
    "image": "https://coin-images.coingecko.com/coins/images/38108/large/200x200_Sonic_Logo.png?1734679256"
  },
  {
    "id": "fetch-ai",
    "symbol": "fet",
    "name": "Artificial Superintelligence Alliance",
    "icon": "Ⓕ",
    "image": "https://coin-images.coingecko.com/coins/images/5681/large/ASI.png?1719827289"
  },
  {
    "id": "optimism",
    "symbol": "op",
    "name": "Optimism",
    "icon": "Ⓞ",
    "image": "https://coin-images.coingecko.com/coins/images/25244/large/Optimism.png?1696524385"
  },
  {
    "id": "jupiter-exchange-solana",
    "symbol": "jup",
    "name": "Jupiter",
    "icon": "♃",
    "image": "https://coin-images.coingecko.com/coins/images/34188/large/jup.png?1704266489"
  },
  {
    "id": "kucoin-shares",
    "symbol": "kcs",
    "name": "KuCoin",
    "icon": "₭",
    "image": "https://coin-images.coingecko.com/coins/images/1047/large/sa9z79.png?1696502152"
  },
  {
    "id": "binance-peg-weth",
    "symbol": "weth",
    "name": "Binance-Peg WETH",
    "icon": "ΞW",
    "image": "https://coin-images.coingecko.com/coins/images/39580/large/weth.png?1723006716"
  },
  {
    "id": "solv-btc",
    "symbol": "solvbtc",
    "name": "Solv Protocol SolvBTC",
    "icon": "₿ˢ",
    "image": "https://coin-images.coingecko.com/coins/images/36800/large/solvBTC.png?1719810684"
  },
  {
    "id": "kelp-dao-restaked-eth",
    "symbol": "rseth",
    "name": "Kelp DAO Restaked ETH",
    "icon": "Ξʳ",
    "image": "https://coin-images.coingecko.com/coins/images/33800/large/Icon___Dark.png?1702991855"
  },
  {
    "id": "story-2",
    "symbol": "ip",
    "name": "Story",
    "icon": "Ⓢ",
    "image": "https://coin-images.coingecko.com/coins/images/54035/large/Transparent_bg.png?1738075331"
  },
  {
    "id": "nexo",
    "symbol": "nexo",
    "name": "NEXO",
    "icon": "Ⓝ",
    "image": "https://coin-images.coingecko.com/coins/images/3695/large/CG-nexo-token-200x200_2x.png?1730414360"
  },
  {
    "id": "movement",
    "symbol": "move",
    "name": "Movement",
    "icon": "Ⓜ",
    "image": "https://coin-images.coingecko.com/coins/images/39345/large/movement-testnet-token.png?1721878759"
  },
  {
    "id": "quant-network",
    "symbol": "qnt",
    "name": "Quant",
    "icon": "Ⓠ",
    "image": "https://coin-images.coingecko.com/coins/images/3370/large/5ZOu7brX_400x400.jpg?1696504070"
  },
  {
    "id": "maker",
    "symbol": "mkr",
    "name": "Maker",
    "icon": "Ⓜ",
    "image": "https://coin-images.coingecko.com/coins/images/1364/large/Mark_Maker.png?1696502423"
  },
  {
    "id": "xdce-crowd-sale",
    "symbol": "xdc",
    "name": "XDC Network",
    "icon": "✕",
    "image": "https://coin-images.coingecko.com/coins/images/2912/large/xdc-icon.png?1696503661"
  },
  {
    "id": "injective-protocol",
    "symbol": "inj",
    "name": "Injective",
    "icon": "Ⓘ",
    "image": "https://coin-images.coingecko.com/coins/images/12882/large/Other_200x200.png?1738782212"
  },
  {
    "id": "rocket-pool-eth",
    "symbol": "reth",
    "name": "Rocket Pool ETH",
    "icon": "Ξʳ",
    "image": "https://coin-images.coingecko.com/coins/images/20764/large/reth.png?1696520159"
  },
  {
    "id": "dexe",
    "symbol": "dexe",
    "name": "DeXe",
    "icon": "Ⓓ",
    "image": "https://coin-images.coingecko.com/coins/images/12713/large/DEXE_token_logo.png?1696512514"
  },
  {
    "id": "blockstack",
    "symbol": "stx",
    "name": "Stacks",
    "icon": "Ⓢ",
    "image": "https://coin-images.coingecko.com/coins/images/2069/large/Stacks_Logo_png.png?1709979332"
  },
  {
    "id": "immutable-x",
    "symbol": "imx",
    "name": "Immutable",
    "icon": "Ⓘ",
    "image": "https://coin-images.coingecko.com/coins/images/17233/large/immutableX-symbol-BLK-RGB.png?1696516787"
  },
  {
    "id": "theta-token",
    "symbol": "theta",
    "name": "Theta Network",
    "icon": "θ",
    "image": "https://coin-images.coingecko.com/coins/images/2538/large/theta-token-logo.png?1696503349"
  },
  {
    "id": "usual-usd",
    "symbol": "usd0",
    "name": "Usual USD",
    "icon": "₮",
    "image": "https://coin-images.coingecko.com/coins/images/38272/large/USD0LOGO.png?1716962811"
  },
  {
    "id": "sei-network",
    "symbol": "sei",
    "name": "Sei",
    "icon": "Ⓢ",
    "image": "https://coin-images.coingecko.com/coins/images/28205/large/Sei_Logo_-_Transparent.png?1696527207"
  },
  {
    "id": "flare-networks",
    "symbol": "flr",
    "name": "Flare",
    "icon": "Ⓕ",
    "image": "https://coin-images.coingecko.com/coins/images/28624/large/FLR-icon200x200.png?1696527609"
  },
  {
    "id": "mantle-staked-ether",
    "symbol": "meth",
    "name": "Mantle Staked Ether",
    "icon": "Ξᵐ",
    "image": "https://coin-images.coingecko.com/coins/images/33345/large/symbol_transparent_bg.png?1701697066"
  },
  {
    "id": "the-graph",
    "symbol": "grt",
    "name": "The Graph",
    "image": "https://coin-images.coingecko.com/coins/images/13397/large/Graph_Token.png?1696513159"
  },
  {
    "id": "worldcoin-wld",
    "symbol": "wld",
    "name": "Worldcoin",
    "image": "https://coin-images.coingecko.com/coins/images/31069/large/worldcoin.jpeg?1696529903"
  },
  {
    "id": "binance-staked-sol",
    "symbol": "bnsol",
    "name": "Binance Staked SOL",
    "image": "https://coin-images.coingecko.com/coins/images/40132/large/bnsol.png?1725968367"
  },
  {
    "id": "lido-dao",
    "symbol": "ldo",
    "name": "Lido DAO",
    "image": "https://coin-images.coingecko.com/coins/images/13573/large/Lido_DAO.png?1696513326"
  },
  {
    "id": "bonk",
    "symbol": "bonk",
    "name": "Bonk",
    "image": "https://coin-images.coingecko.com/coins/images/28600/large/bonk.jpg?1696527587"
  },
  {
    "id": "solv-protocol-solvbtc-bbn",
    "symbol": "solvbtc.bbn",
    "name": "Solv Protocol SolvBTC.BBN",
    "image": "https://coin-images.coingecko.com/coins/images/39384/large/unnamed.png?1721961640"
  },
  {
    "id": "eos",
    "symbol": "eos",
    "name": "EOS",
    "image": "https://coin-images.coingecko.com/coins/images/738/large/CG_EOS_Icon.png?1731705232"
  },
  {
    "id": "jasmycoin",
    "symbol": "jasmy",
    "name": "JasmyCoin",
    "image": "https://coin-images.coingecko.com/coins/images/13876/large/JASMY200x200.jpg?1696513620"
  },
  {
    "id": "tezos",
    "symbol": "xtz",
    "name": "Tezos",
    "image": "https://coin-images.coingecko.com/coins/images/976/large/Tezos-logo.png?1696502091"
  },
  {
    "id": "gala",
    "symbol": "gala",
    "name": "GALA",
    "image": "https://coin-images.coingecko.com/coins/images/12493/large/GALA_token_image_-_200PNG.png?1709725869"
  },
  {
    "id": "the-sandbox",
    "symbol": "sand",
    "name": "The Sandbox",
    "image": "https://coin-images.coingecko.com/coins/images/12129/large/sandbox_logo.jpg?1696511971"
  }
]


// 导出默认的加密货币列表（可以是前12个或其他数量）
export const DEFAULT_CRYPTOCURRENCIE_IDS = ["bitcoin", "ethereum", "solana", "binancecoin", "dogecoin", "pi-network"]
export const DEFAULT_CRYPTOCURRENCIES = TOP_CRYPTOCURRENCIES.filter(crypto => DEFAULT_CRYPTOCURRENCIE_IDS.includes(crypto.id))

// 按ID查找加密货币
export function getCryptocurrencyById(id: string): CryptoCurrency | undefined {
  return TOP_CRYPTOCURRENCIES.find(crypto => crypto.id === id);
}

// 按符号查找加密货币
export function getCryptocurrencyBySymbol(symbol: string): CryptoCurrency | undefined {
  return TOP_CRYPTOCURRENCIES.find(crypto => crypto.symbol === symbol.toUpperCase());
}

export default TOP_CRYPTOCURRENCIES; 
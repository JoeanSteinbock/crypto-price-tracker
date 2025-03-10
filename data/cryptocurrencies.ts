export type CryptoCurrency = {
  id: string
  symbol: string
  name: string
  icon?: string
  image?: string
  color?: string
}

export const STABLE_COINS = ["tether", "usd-coin", "binance-usd", "dai", "frax", "true-usd", "usdd", "pax-dollar", "gemini-dollar", "husd"];

// 前 100 个加密货币的静态数据
export const TOP_CRYPTOCURRENCIES: CryptoCurrency[] = [
  {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "icon": "₿",
    "color": "#f7931a",
    "image": "/1/large/bitcoin.png?1696501400"
  },
  {
    "id": "ethereum",
    "symbol": "eth",
    "name": "Ethereum",
    "icon": "Ξ",
    "color": "#627eea",
    "image": "/279/large/ethereum.png?1696501628"
  },
  {
    "id": "tether",
    "symbol": "usdt",
    "name": "Tether",
    "icon": "₮",
    "color": "#26a17b",
    "image": "/325/large/Tether.png?1696501661"
  },
  {
    "id": "ripple",
    "symbol": "xrp",
    "name": "XRP",
    "icon": "✕",
    "color": "#23292f",
    "image": "/44/large/xrp-symbol-white-128.png?1696501442"
  },
  {
    "id": "binancecoin",
    "symbol": "bnb",
    "name": "BNB",
    "icon": "Ƀ",
    "color": "#f3ba2f",
    "image": "/825/large/bnb-icon2_2x.png?1696501970"
  },
  {
    "id": "solana",
    "symbol": "sol",
    "name": "Solana",
    "icon": "◎",
    "color": "#00ffbd",
    "image": "/4128/large/solana.png?1718769756"
  },
  {
    "id": "usd-coin",
    "symbol": "usdc",
    "name": "USDC",
    "icon": "₮",
    "color": "#4d4e50",
    "image": "/6319/large/usdc.png?1696506694"
  },
  {
    "id": "cardano",
    "symbol": "ada",
    "name": "Cardano",
    "icon": "₳",
    "color": "#0033AD",
    "image": "/975/large/cardano.png?1696502090"
  },
  {
    "id": "dogecoin",
    "symbol": "doge",
    "name": "Dogecoin",
    "icon": "Ð",
    "color": "#c3a634",
    "image": "/5/large/dogecoin.png?1696501409"
  },
  {
    "id": "tron",
    "symbol": "trx",
    "name": "TRON",
    "icon": "Ŧ",
    "image": "/1094/large/tron-logo.png?1696502193"
  },
  {
    "id": "staked-ether",
    "symbol": "steth",
    "name": "Lido Staked Ether",
    "icon": "Ξˢ",
    "image": "/13442/large/steth_logo.png?1696513206"
  },
  {
    "id": "wrapped-bitcoin",
    "symbol": "wbtc",
    "name": "Wrapped Bitcoin",
    "icon": "₿ᵂ",

    "image": "/7598/large/wrapped_bitcoin_wbtc.png?1696507857"
  },
  {
    "id": "pi-network",
    "symbol": "pi",
    "name": "Pi Network",
    "icon": "π",
    "color": "#6b3fa0",
    "image": "/54342/large/pi_network.jpg?1739347576"
  },
  {
    "id": "leo-token",
    "symbol": "leo",
    "name": "LEO Token",
    "icon": "₴",
    "image": "/8418/large/leo-token.png?1696508607"
  },
  {
    "id": "chainlink",
    "symbol": "link",
    "name": "Chainlink",
    "icon": "⬡",
    "color": "#375BD2",
    "image": "/877/large/chainlink-new-logo.png?1696502009"
  },
  {
    "id": "hedera-hashgraph",
    "symbol": "hbar",
    "name": "Hedera",
    "icon": "ℏ",
    "image": "/3688/large/hbar.png?1696504364"
  },
  {
    "id": "wrapped-steth",
    "symbol": "wsteth",
    "name": "Wrapped stETH",
    "icon": "Ξˢᵂ",
    "image": "/18834/large/wstETH.png?1696518295"
  },
  {
    "id": "stellar",
    "symbol": "xlm",
    "name": "Stellar",
    "icon": "✻",
    "image": "/100/large/fmpFRHHQ_400x400.jpg?1735231350"
  },
  {
    "id": "usds",
    "symbol": "usds",
    "name": "USDS",
    "icon": "₮",
    "image": "/39926/large/usds.webp?1726666683"
  },
  {
    "id": "avalanche-2",
    "symbol": "avax",
    "name": "Avalanche",
    "icon": "Ⓐ",
    "image": "/12559/large/Avalanche_Circle_RedWhite_Trans.png?1696512369"
  },
  {
    "id": "sui",
    "symbol": "sui",
    "name": "Sui",
    "icon": "Ⓢ",
    "color": "#4DA2FF",
    "image": "/26375/large/sui-ocean-square.png?1727791290"
  },
  {
    "id": "litecoin",
    "symbol": "ltc",
    "name": "Litecoin",
    "icon": "Ł",
    "color": "#345D9D",
    "image": "/2/large/litecoin.png?1696501400"
  },
  {
    "id": "shiba-inu",
    "symbol": "shib",
    "name": "Shiba Inu",
    "icon": "Ʃ",
    "color": "#ebaf5e",
    "image": "/11939/large/shiba.png?1696511800"
  },
  {
    "id": "bitcoin-cash",
    "symbol": "bch",
    "name": "Bitcoin Cash",
    "icon": "Ƀ",
    "image": "/780/large/bitcoin-cash-circle.png?1696501932"
  },
  {
    "id": "the-open-network",
    "symbol": "ton",
    "name": "Toncoin",
    "icon": "₮",
    "color": "#0098EA",
    "image": "/17980/large/photo_2024-09-10_17.09.00.jpeg?1725963446"
  },
  {
    "id": "polkadot",
    "symbol": "dot",
    "name": "Polkadot",
    "icon": "●",
    "color": "#E6007A",
    "image": "/12171/large/polkadot.png?1696512008"
  },
  {
    "id": "weth",
    "symbol": "weth",
    "name": "WETH",
    "icon": "ΞW",
    "color": "#000000",
    "image": "/2518/large/weth.png?1696503332"
  },
  {
    "id": "mantra-dao",
    "symbol": "om",
    "name": "MANTRA",
    "icon": "Ω",
    "color": "#ed6509",
    "image": "/12151/large/OM_Token.png?1696511991"
  },
  {
    "id": "ethena-usde",
    "symbol": "usde",
    "name": "Ethena USDe",
    "image": "/33613/large/usde.png?1733810059"
  },
  {
    "id": "bitget-token",
    "symbol": "bgb",
    "name": "Bitget Token",
    "icon": "⬇",
    "color": "#4da0b1",
    "image": "/11610/large/Bitget_logo.png?1736925727"
  },
  {
    "id": "binance-bridged-usdt-bnb-smart-chain",
    "symbol": "bsc-usd",
    "name": "Binance Bridged USDT (BNB Smart Chain)",
    "image": "/35021/large/USDT.png?1707233575"
  },
  {
    "id": "hyperliquid",
    "symbol": "hype",
    "name": "Hyperliquid",
    "icon": "Ⓗ",
    "color": "#fae466,",
    "image": "/50882/large/hyperliquid.jpg?1729431300"
  },
  {
    "id": "wrapped-eeth",
    "symbol": "weeth",
    "name": "Wrapped eETH",
    "icon": "ΞWE",
    "color": "#000000",
    "image": "/33033/large/weETH.png?1701438396"
  },
  {
    "id": "whitebit",
    "symbol": "wbt",
    "name": "WhiteBIT Coin",
    "icon": "₿",
    "image": "/27045/large/wbt_token.png?1696526096"
  },
  {
    "id": "uniswap",
    "symbol": "uni",
    "name": "Uniswap",
    "icon": "⟠",
    "color": "#13688f",
    "image": "/12504/large/uniswap-logo.png?1720676669"
  },
  {
    "id": "monero",
    "symbol": "xmr",
    "name": "Monero",
    "icon": "ɱ",
    "color": "#ff6600",
    "image": "/69/large/monero_logo.png?1696501460"
  },
  {
    "id": "aptos",
    "symbol": "apt",
    "name": "Aptos",
    "icon": "Ⓐ",
    "color": "#000000",
    "image": "/26455/large/aptos_round.png?1696525528"
  },
  {
    "id": "susds",
    "symbol": "susds",
    "name": "sUSDS",
    "icon": "₮",
    "image": "/52721/large/sUSDS_Coin.png?1734086971"
  },
  {
    "id": "dai",
    "symbol": "dai",
    "name": "Dai",
    "icon": "◈",
    "image": "/9956/large/Badge_Dai.png?1696509996"
  },
  {
    "id": "near",
    "symbol": "near",
    "name": "NEAR Protocol",
    "icon": "Ⓝ",
    "color": "#69e299",
    "image": "/10365/large/near.jpg?1696510367"
  },
  {
    "id": "aave",
    "symbol": "aave",
    "name": "Aave",
    "icon": "ⓐ",
    "color": "#B6509E",
    "image": "/12645/large/aave-token-round.png?1720472354"
  },
  {
    "id": "ondo-finance",
    "symbol": "ondo",
    "name": "Ondo",
    "icon": "Ⓞ",
    "color": "#0e09ed",
    "image": "/26580/large/ONDO.png?1696525656"
  },
  {
    "id": "ethereum-classic",
    "symbol": "etc",
    "name": "Ethereum Classic",
    "icon": "ξ",
    "color": "#669073",
    "image": "/453/large/ethereum-classic-logo.png?1696501717"
  },
  {
    "id": "internet-computer",
    "symbol": "icp",
    "name": "Internet Computer",
    "icon": "∞",
    "image": "/14495/large/Internet_Computer_logo.png?1696514180"
  },
  {
    "id": "pepe",
    "symbol": "pepe",
    "name": "Pepe",
    "icon": "🐸",
    "color": "#509624",
    "image": "/29850/large/pepe-token.jpeg?1696528776"
  },
  {
    "id": "okb",
    "symbol": "okb",
    "name": "OKB",
    "icon": "Ⓞ",
    "image": "/4463/large/WeChat_Image_20220118095654.png?1696505053"
  },
  {
    "id": "gatechain-token",
    "symbol": "gt",
    "name": "Gate",
    "icon": "Ⓖ",
    "image": "/8183/large/200X200.png?1735246724"
  },
  {
    "id": "coinbase-wrapped-btc",
    "symbol": "cbbtc",
    "name": "Coinbase Wrapped BTC",
    "icon": "₿ᶜ",
    "image": "/40143/large/cbbtc.webp?1726136727"
  },
  {
    "id": "ethena",
    "symbol": "ena",
    "name": "Ethena",
    "icon": "Ξ",
    "image": "/36530/large/ethena.png?1711701436"
  },
  {
    "id": "crypto-com-chain",
    "symbol": "cro",
    "name": "Cronos",
    "icon": "₵",
    "image": "/7310/large/cro_token_logo.png?1696507599"
  },
  {
    "id": "mantle",
    "symbol": "mnt",
    "name": "Mantle",
    "icon": "Ⓜ",
    "image": "/30980/large/Mantle-Logo-mark.png?1739213200"
  },
  {
    "id": "official-trump",
    "symbol": "trump",
    "name": "Official Trump",
    "icon": "🇺🇸",
    "color": "#C0A05E",
    "image": "/53746/large/trump.png?1737171561"
  },
  {
    "id": "vechain",
    "symbol": "vet",
    "name": "VeChain",
    "icon": "⩑",
    "image": "/1167/large/VET_Token_Icon.png?1710013505"
  },
  {
    "id": "bittensor",
    "symbol": "tao",
    "name": "Bittensor",
    "icon": "τ",
    "color": "#000000",
    "image": "/28452/large/ARUsPeNQ_400x400.jpeg?1696527447"
  },
  {
    "id": "tokenize-xchange",
    "symbol": "tkx",
    "name": "Tokenize Xchange",
    "image": "/4984/large/TKX_-_Logo_-_RGB-15.png?1696505519"
  },
  {
    "id": "first-digital-usd",
    "symbol": "fdusd",
    "name": "First Digital USD",
    "image": "/31079/large/FDUSD_icon_black.png?1731097953"
  },
  {
    "id": "polygon-ecosystem-token",
    "symbol": "pol",
    "name": "POL (ex-MATIC)",
    "icon": "⬡",
    "color": "#764AD0",
    "image": "/32440/large/polygon.png?1698233684"
  },
  {
    "id": "filecoin",
    "symbol": "fil",
    "name": "Filecoin",
    "icon": "⨎",
    "color": "#0098EA",
    "image": "/12817/large/filecoin.png?1696512609"
  },
  {
    "id": "algorand",
    "symbol": "algo",
    "name": "Algorand",
    "icon": "Ⓐ",
    "color": "#000000",
    "image": "/4380/large/download.png?1696504978"
  },
  {
    "id": "cosmos",
    "symbol": "atom",
    "name": "Cosmos Hub",
    "icon": "⚛",
    "color": "#101747",
    "image": "/1481/large/cosmos_hub.png?1696502525"
  },
  {
    "id": "fasttoken",
    "symbol": "ftn",
    "name": "Fasttoken",
    "icon": "₣",
    "image": "/28478/large/lightenicon_200x200.png?1696527472"
  },
  {
    "id": "lombard-staked-btc",
    "symbol": "lbtc",
    "name": "Lombard Staked BTC",
    "icon": "₿ˡ",
    "image": "/39969/large/LBTC_Logo.png?1724959872"
  },
  {
    "id": "celestia",
    "symbol": "tia",
    "name": "Celestia",
    "icon": "✧",
    "color": "#00db7d",
    "image": "/31967/large/tia.jpg?1696530772"
  },
  {
    "id": "kaspa",
    "symbol": "kas",
    "name": "Kaspa",
    "icon": "₭",
    "color": "#70C7BA",
    "image": "/25751/large/kaspa-icon-exchanges.png?1696524837"
  },
  {
    "id": "render-token",
    "symbol": "render",
    "name": "Render",
    "icon": "Ⓡ",

    "image": "/11636/large/rndr.png?1696511529"
  },
  {
    "id": "arbitrum",
    "symbol": "arb",
    "name": "Arbitrum",
    "icon": "⚖",
    "color": "#28a0f0",
    "image": "/16547/large/arb.jpg?1721358242"
  },
  {
    "id": "sonic-3",
    "symbol": "s",
    "name": "Sonic (prev. FTM)",
    "icon": "♃",
    "color": "#000000",
    "image": "/38108/large/200x200_Sonic_Logo.png?1734679256"
  },
  {
    "id": "optimism",
    "symbol": "op",
    "name": "Optimism",
    "icon": "Ⓞ",
    "image": "/25244/large/Optimism.png?1696524385"
  },
  {
    "id": "fetch-ai",
    "symbol": "fet",
    "name": "Artificial Superintelligence Alliance",
    "image": "/5681/large/ASI.png?1719827289"
  },
  {
    "id": "kucoin-shares",
    "symbol": "kcs",
    "name": "KuCoin",
    "image": "/1047/large/sa9z79.png?1696502152"
  },
  {
    "id": "jupiter-exchange-solana",
    "symbol": "jup",
    "name": "Jupiter",
    "image": "/34188/large/jup.png?1704266489"
  },
  {
    "id": "story-2",
    "symbol": "ip",
    "name": "Story",
    "image": "/54035/large/Transparent_bg.png?1738075331"
  },
  {
    "id": "binance-peg-weth",
    "symbol": "weth",
    "name": "Binance-Peg WETH",
    "image": "/39580/large/weth.png?1723006716"
  },
  {
    "id": "solv-btc",
    "symbol": "solvbtc",
    "name": "Solv Protocol SolvBTC",
    "icon": "₿ˢ",
    "image": "/36800/large/solvBTC.png?1719810684"
  },
  {
    "id": "kelp-dao-restaked-eth",
    "symbol": "rseth",
    "name": "Kelp DAO Restaked ETH",
    "icon": "Ξʳ",
    "image": "/33800/large/Icon___Dark.png?1702991855"
  },
  {
    "id": "movement",
    "symbol": "move",
    "name": "Movement",
    "icon": "Ⓜ",
    "image": "/39345/large/movement-testnet-token.png?1721878759"
  },
  {
    "id": "quant-network",
    "symbol": "qnt",
    "name": "Quant",
    "icon": "Ⓠ",
    "image": "/3370/large/5ZOu7brX_400x400.jpg?1696504070"
  },
  {
    "id": "xdce-crowd-sale",
    "symbol": "xdc",
    "name": "XDC Network",
    "image": "/2912/large/xdc-icon.png?1696503661"
  },
  {
    "id": "nexo",
    "symbol": "nexo",
    "name": "NEXO",
    "icon": "Ⓝ",
    "image": "/3695/large/CG-nexo-token-200x200_2x.png?1730414360"
  },
  {
    "id": "rocket-pool-eth",
    "symbol": "reth",
    "name": "Rocket Pool ETH",
    "image": "/20764/large/reth.png?1696520159"
  },
  {
    "id": "maker",
    "symbol": "mkr",
    "name": "Maker",
    "icon": "Ⓜ",
    "image": "/1364/large/Mark_Maker.png?1696502423"
  },
  {
    "id": "usual-usd",
    "symbol": "usd0",
    "name": "Usual USD",
    "icon": "₮",
    "image": "/38272/large/USD0LOGO.png?1716962811"
  },
  {
    "id": "dexe",
    "symbol": "dexe",
    "name": "DeXe",
    "icon": "Ⓓ",
    "image": "/12713/large/DEXE_token_logo.png?1696512514"
  },
  {
    "id": "blockstack",
    "symbol": "stx",
    "name": "Stacks",
    "icon": "Ⓢ",
    "image": "/2069/large/Stacks_Logo_png.png?1709979332"
  },
  {
    "id": "injective-protocol",
    "symbol": "inj",
    "name": "Injective",
    "icon": "ⓘ",
    "image": "/12882/large/Other_200x200.png?1738782212"
  },
  {
    "id": "sei-network",
    "symbol": "sei",
    "name": "Sei",
    "icon": "Ⓢ",
    "image": "/28205/large/Sei_Logo_-_Transparent.png?1696527207"
  },
  {
    "id": "immutable-x",
    "symbol": "imx",
    "name": "Immutable",
    "icon": "Ⓘ",
    "image": "/17233/large/immutableX-symbol-BLK-RGB.png?1696516787"
  },
  {
    "id": "flare-networks",
    "symbol": "flr",
    "name": "Flare",
    "icon": "ⓕ",
    "image": "/28624/large/FLR-icon200x200.png?1696527609"
  },
  {
    "id": "lido-dao",
    "symbol": "ldo",
    "name": "Lido DAO",
    "icon": "Ⓛ",
    "image": "/13573/large/Lido_DAO.png?1696513326"
  },
  {
    "id": "theta-token",
    "symbol": "theta",
    "name": "Theta Network",
    "icon": "Ⓣ",
    "image": "/2538/large/theta-token-logo.png?1696503349"
  },
  {
    "id": "worldcoin-wld",
    "symbol": "wld",
    "name": "Worldcoin",
    "icon": "Ⓦ",
    "image": "/31069/large/worldcoin.jpeg?1696529903"
  },
  {
    "id": "the-graph",
    "symbol": "grt",
    "name": "The Graph",
    "icon": "ⓖ",
    "image": "/13397/large/Graph_Token.png?1696513159"
  },
  {
    "id": "binance-staked-sol",
    "symbol": "bnsol",
    "name": "Binance Staked SOL",
    "image": "/40132/large/bnsol.png?1725968367"
  },
  {
    "id": "mantle-staked-ether",
    "symbol": "meth",
    "name": "Mantle Staked Ether",
    "image": "/33345/large/symbol_transparent_bg.png?1701697066"
  },
  {
    "id": "solv-protocol-solvbtc-bbn",
    "symbol": "solvbtc.bbn",
    "name": "Solv Protocol SolvBTC.BBN",
    "image": "/39384/large/unnamed.png?1721961640"
  },
  {
    "id": "bonk",
    "symbol": "bonk",
    "name": "Bonk",
    "image": "/28600/large/bonk.jpg?1696527587"
  },
  {
    "id": "eos",
    "symbol": "eos",
    "name": "EOS",
    "image": "/738/large/CG_EOS_Icon.png?1731705232"
  },
  {
    "id": "paypal-usd",
    "symbol": "pyusd",
    "name": "PayPal USD",
    "image": "/31212/large/PYUSD_Logo_%282%29.png?1696530039"
  },
  {
    "id": "tezos",
    "symbol": "xtz",
    "name": "Tezos",
    "image": "/976/large/Tezos-logo.png?1696502091"
  },
  {
    "id": "tether-gold",
    "symbol": "xaut",
    "name": "Tether Gold",
    "image": "/10481/large/Tether_Gold.png?1696510471"
  },
  {
    "id": "gala",
    "symbol": "gala",
    "name": "GALA",
    "image": "/12493/large/GALA_token_image_-_200PNG.png?1709725869"
  },
  {
    "id": "binance-bridged-usdc-bnb-smart-chain",
    "symbol": "usdc",
    "name": "Binance Bridged USDC (BNB Smart Chain)",
    "image": "/35220/large/USDC.jpg?1707919050"
  },
  {
    "id": "bittorrent",
    "symbol": "btt",
    "name": "BitTorrent",
    "image": "/22457/large/btt_logo.png?1696521780"
  },
  {
    "id": "wbnb",
    "symbol": "wbnb",
    "name": "Wrapped BNB",
    "image": "/12591/large/binance-coin-logo.png?1696512401"
  },
  {
    "id": "the-sandbox",
    "symbol": "sand",
    "name": "The Sandbox",
    "image": "/12129/large/sandbox_logo.jpg?1696511971"
  },
  {
    "id": "jasmycoin",
    "symbol": "jasmy",
    "name": "JasmyCoin",
    "image": "/13876/large/JASMY200x200.jpg?1696513620"
  },
  {
    "id": "arbitrum-bridged-wbtc-arbitrum-one",
    "symbol": "wbtc",
    "name": "Arbitrum Bridged WBTC (Arbitrum One)",
    "image": "/39532/large/wbtc.png?1722810336"
  },
  {
    "id": "jito-governance-token",
    "symbol": "jto",
    "name": "Jito",
    "image": "/33228/large/jto.png?1701137022"
  },
  {
    "id": "iota",
    "symbol": "iota",
    "name": "IOTA",
    "image": "/692/large/IOTA_Swirl.png?1696501881"
  },
  {
    "id": "renzo-restaked-eth",
    "symbol": "ezeth",
    "name": "Renzo Restaked ETH",
    "image": "/34753/large/Ezeth_logo_circle.png?1713496404"
  },
  {
    "id": "bitcoin-cash-sv",
    "symbol": "bsv",
    "name": "Bitcoin SV",
    "image": "/6799/large/BSV.png?1696507128"
  },
  {
    "id": "berachain-bera",
    "symbol": "bera",
    "name": "Berachain",
    "image": "/25235/large/BERA.png?1738822008"
  },
  {
    "id": "kaia",
    "symbol": "kaia",
    "name": "Kaia",
    "image": "/39901/large/KAIA.png?1724734368"
  },
  {
    "id": "flow",
    "symbol": "flow",
    "name": "Flow",
    "image": "/13446/large/5f6294c0c7a8cda55cb1c936_Flow_Wordmark.png?1696513210"
  },
  {
    "id": "usdx-money-usdx",
    "symbol": "usdx",
    "name": "Stables Labs USDX",
    "image": "/50360/large/USDX200px.png?1731906044"
  },
  {
    "id": "blackrock-usd-institutional-digital-liquidity-fund",
    "symbol": "buidl",
    "name": "BlackRock USD Institutional Digital Liquidity Fund",
    "image": "/36291/large/blackrock.png?1711013223"
  },
  {
    "id": "msol",
    "symbol": "msol",
    "name": "Marinade Staked SOL",
    "image": "/17752/large/mSOL.png?1696517278"
  },
  {
    "id": "pax-gold",
    "symbol": "paxg",
    "name": "PAX Gold",
    "image": "/9519/large/paxgold.png?1696509604"
  },
  {
    "id": "ethereum-name-service",
    "symbol": "ens",
    "name": "Ethereum Name Service",
    "image": "/19785/large/ENS.jpg?1727872989"
  },
  {
    "id": "floki",
    "symbol": "floki",
    "name": "FLOKI",
    "image": "/16746/large/PNG_image.png?1696516318"
  },
  {
    "id": "telcoin",
    "symbol": "tel",
    "name": "Telcoin",
    "image": "/1899/large/tel.png?1696502892"
  },
  {
    "id": "neo",
    "symbol": "neo",
    "name": "NEO",
    "image": "/480/large/NEO_512_512.png?1696501735"
  },
  {
    "id": "resolv-usr",
    "symbol": "usr",
    "name": "Resolv USR",
    "image": "/40008/large/USR_LOGO.png?1725222638"
  },
  {
    "id": "jupiter-staked-sol",
    "symbol": "jupsol",
    "name": "Jupiter Staked SOL",
    "image": "/37482/large/jupsol.png?1714473916"
  },
  {
    "id": "pyth-network",
    "symbol": "pyth",
    "name": "Pyth Network",
    "image": "/31924/large/pyth.png?1701245725"
  },
  {
    "id": "honey-3",
    "symbol": "honey",
    "name": "Honey",
    "image": "/54194/large/honey.png?1738725085"
  },
  {
    "id": "elrond-erd-2",
    "symbol": "egld",
    "name": "MultiversX",
    "image": "/12335/large/egld-token-logo.png?1696512162"
  },
  {
    "id": "curve-dao-token",
    "symbol": "crv",
    "name": "Curve DAO",
    "image": "/12124/large/Curve.png?1696511967"
  },
  {
    "id": "zcash",
    "symbol": "zec",
    "name": "Zcash",
    "image": "/486/large/circle-zcash-color.png?1696501740"
  },
  {
    "id": "axie-infinity",
    "symbol": "axs",
    "name": "Axie Infinity",
    "image": "/13029/large/axie_infinity_logo.png?1696512817"
  },
  {
    "id": "frax",
    "symbol": "frax",
    "name": "Frax",
    "image": "/13422/large/frax-logo.png?1739780303"
  },
  {
    "id": "decentraland",
    "symbol": "mana",
    "name": "Decentraland",
    "image": "/878/large/decentraland-mana.png?1696502010"
  },
  {
    "id": "true-usd",
    "symbol": "tusd",
    "name": "TrueUSD",
    "image": "/3449/large/tusd.png?1696504140"
  },
  {
    "id": "raydium",
    "symbol": "ray",
    "name": "Raydium",
    "image": "/13928/large/PSigc4ie_400x400.jpg?1696513668"
  },
  {
    "id": "l2-standard-bridged-weth-base",
    "symbol": "weth",
    "name": "L2 Standard Bridged WETH (Base)",
    "image": "/39810/large/weth.png?1724139790"
  },
  {
    "id": "ronin",
    "symbol": "ron",
    "name": "Ronin",
    "image": "/20009/large/photo_2024-04-06_22-52-24.jpg?1712415367"
  },
  {
    "id": "mantle-restaked-eth",
    "symbol": "cmeth",
    "name": "Mantle Restaked ETH",
    "image": "/51114/large/symbol.png?1730117724"
  },
  {
    "id": "arbitrum-bridged-weth-arbitrum-one",
    "symbol": "weth",
    "name": "Arbitrum Bridged WETH (Arbitrum One)",
    "image": "/39713/large/WETH.PNG?1723731496"
  },
  {
    "id": "pumpbtc",
    "symbol": "pumpbtc",
    "name": "pumpBTC",
    "image": "/39232/large/200pxPumpBTCLogo.png?1721227861"
  },
  {
    "id": "beldex",
    "symbol": "bdx",
    "name": "Beldex",
    "image": "/5111/large/Beldex.png?1696505631"
  },
  {
    "id": "helium",
    "symbol": "hnt",
    "name": "Helium",
    "image": "/4284/large/Helium_HNT.png?1696504894"
  },
  {
    "id": "dogwifcoin",
    "symbol": "wif",
    "name": "dogwifhat",
    "image": "/33566/large/dogwifhat.jpg?1702499428"
  },
  {
    "id": "aerodrome-finance",
    "symbol": "aero",
    "name": "Aerodrome Finance",
    "image": "/31745/large/token.png?1696530564"
  },
  {
    "id": "pancakeswap-token",
    "symbol": "cake",
    "name": "PancakeSwap",
    "image": "/12632/large/pancakeswap-cake-logo_%281%29.png?1696512440"
  },
  {
    "id": "kava",
    "symbol": "kava",
    "name": "Kava",
    "image": "/9761/large/kava.png?1696509822"
  },
  {
    "id": "thorchain",
    "symbol": "rune",
    "name": "THORChain",
    "image": "/6595/large/Rune200x200.png?1696506946"
  },
  {
    "id": "dydx-chain",
    "symbol": "dydx",
    "name": "dYdX",
    "image": "/32594/large/dydx.png?1698673495"
  },
  {
    "id": "apenft",
    "symbol": "nft",
    "name": "APENFT",
    "image": "/15687/large/apenft.jpg?1696515316"
  },
  {
    "id": "binance-peg-dogecoin",
    "symbol": "doge",
    "name": "Binance-Peg Dogecoin",
    "image": "/15768/large/dogecoin.png?1696515392"
  },
  {
    "id": "bridged-usdc-polygon-pos-bridge",
    "symbol": "usdc.e",
    "name": "Bridged USDC (Polygon PoS Bridge)",
    "image": "/33000/large/usdc.png?1700119918"
  },
  {
    "id": "starknet",
    "symbol": "strk",
    "name": "Starknet",
    "image": "/26433/large/starknet.png?1696525507"
  },
  {
    "id": "chain-2",
    "symbol": "xcn",
    "name": "Onyxcoin",
    "image": "/24210/large/onyxlogo.jpg?1696523397"
  },
  {
    "id": "grass",
    "symbol": "grass",
    "name": "Grass",
    "image": "/40094/large/Grass.jpg?1725697048"
  },
  {
    "id": "arweave",
    "symbol": "ar",
    "name": "Arweave",
    "image": "/4343/large/oRt6SiEN_400x400.jpg?1696504946"
  },
  {
    "id": "bitcoin-avalanche-bridged-btc-b",
    "symbol": "btc.b",
    "name": "Avalanche Bridged BTC (Avalanche)",
    "image": "/26115/large/btcb.png?1696525205"
  },
  {
    "id": "ether-fi-staked-eth",
    "symbol": "eeth",
    "name": "ether.fi Staked ETH",
    "image": "/33049/large/ether.fi_eETH.png?1700473063"
  },
  {
    "id": "chiliz",
    "symbol": "chz",
    "name": "Chiliz",
    "image": "/8834/large/CHZ_Token_updated.png?1696508986"
  },
  {
    "id": "clbtc",
    "symbol": "clbtc",
    "name": "clBTC",
    "image": "/54164/large/clBTC.png?1738482999"
  },
  {
    "id": "virtual-protocol",
    "symbol": "virtual",
    "name": "Virtuals Protocol",
    "image": "/34057/large/LOGOMARK.png?1708356054"
  },
  {
    "id": "conflux-token",
    "symbol": "cfx",
    "name": "Conflux",
    "image": "/13079/large/3vuYMbjN.png?1696512867"
  },
  {
    "id": "ousg",
    "symbol": "ousg",
    "name": "OUSG",
    "image": "/29023/large/OUSG.png?1696527993"
  },
  {
    "id": "ecash",
    "symbol": "xec",
    "name": "eCash",
    "image": "/16646/large/Logo_final-22.png?1696516207"
  },
  {
    "id": "usdb",
    "symbol": "usdb",
    "name": "USDB",
    "image": "/35595/large/65c67f0ebf2f6a1bd0feb13c_usdb-icon-yellow.png?1709255427"
  },
  {
    "id": "hashnote-usyc",
    "symbol": "usyc",
    "name": "Hashnote USYC",
    "image": "/51054/large/Hashnote_SDYC_200x200.png?1730370965"
  },
  {
    "id": "coredaoorg",
    "symbol": "core",
    "name": "Core",
    "image": "/28938/large/file_589.jpg?1701868471"
  },
  {
    "id": "matic-network",
    "symbol": "matic",
    "name": "Polygon",
    "image": "/4713/large/polygon.png?1698233745"
  },
  {
    "id": "compound-governance-token",
    "symbol": "comp",
    "name": "Compound",
    "image": "/10775/large/COMP.png?1696510737"
  },
  {
    "id": "trust-wallet-token",
    "symbol": "twt",
    "name": "Trust Wallet",
    "image": "/11085/large/Trust.png?1696511026"
  },
  {
    "id": "apecoin",
    "symbol": "ape",
    "name": "ApeCoin",
    "image": "/24383/large/apecoin.jpg?1696523566"
  },
  {
    "id": "ondo-us-dollar-yield",
    "symbol": "usdy",
    "name": "Ondo US Dollar Yield",
    "image": "/31700/large/usdy_%281%29.png?1696530524"
  },
  {
    "id": "spx6900",
    "symbol": "spx",
    "name": "SPX6900",
    "image": "/31401/large/centeredcoin_%281%29.png?1737048493"
  },
  {
    "id": "cgeth-hashkey-cloud",
    "symbol": "cgeth.hashkey",
    "name": "cgETH Hashkey Cloud",
    "image": "/54162/large/Cgeth_Hashkey.png?1738482570"
  },
  {
    "id": "olympus",
    "symbol": "ohm",
    "name": "Olympus",
    "image": "/14483/large/token_OHM_%281%29.png?1696514169"
  },
  {
    "id": "infrared-bera",
    "symbol": "ibera",
    "name": "Infrared Bera",
    "image": "/54671/large/ibera.jpg?1740966414"
  },
  {
    "id": "stakewise-v3-oseth",
    "symbol": "oseth",
    "name": "StakeWise Staked ETH",
    "image": "/33117/large/Frame_27513839.png?1700732599"
  },
  {
    "id": "kaito",
    "symbol": "kaito",
    "name": "KAITO",
    "image": "/54411/large/Qm4DW488_400x400.jpg?1739552780"
  },
  {
    "id": "pudgy-penguins",
    "symbol": "pengu",
    "name": "Pudgy Penguins",
    "image": "/52622/large/PUDGY_PENGUINS_PENGU_PFP.png?1733809110"
  },
  {
    "id": "axelar",
    "symbol": "axl",
    "name": "Axelar",
    "image": "/27277/large/V-65_xQ1_400x400.jpeg?1696526329"
  },
  {
    "id": "tbtc",
    "symbol": "tbtc",
    "name": "tBTC",
    "image": "/11224/large/0x18084fba666a33d37592fa2633fd49a74dd93a88.png?1696511155"
  },
  {
    "id": "pendle",
    "symbol": "pendle",
    "name": "Pendle",
    "image": "/15069/large/Pendle_Logo_Normal-03.png?1696514728"
  },
  {
    "id": "amp-token",
    "symbol": "amp",
    "name": "Amp",
    "image": "/12409/large/amp-200x200.png?1696512231"
  },
  {
    "id": "gnosis",
    "symbol": "gno",
    "name": "Gnosis",
    "image": "/662/large/logo_square_simple_300px.png?1696501854"
  },
  {
    "id": "stakestone-berachain-vault-token",
    "symbol": "berastone",
    "name": "StakeStone Berachain Vault Token",
    "image": "/53143/large/beraSTONE.png?1735377526"
  },
  {
    "id": "terra-luna",
    "symbol": "lunc",
    "name": "Terra Luna Classic",
    "image": "/8284/large/01_LunaClassic_color.png?1696508486"
  },
  {
    "id": "mantle-bridged-usdt-mantle",
    "symbol": "usdt",
    "name": "Mantle Bridged USDT (Mantle)",
    "image": "/35069/large/logo.png?1707291114"
  },
  {
    "id": "binance-peg-busd",
    "symbol": "busd",
    "name": "Binance-Peg BUSD",
    "image": "/31273/large/new_binance-peg-busd.png?1696530096"
  },
  {
    "id": "verus-coin",
    "symbol": "vrsc",
    "name": "Verus",
    "image": "/6769/large/Screenshot_33.png?1696507103"
  },
  {
    "id": "mina-protocol",
    "symbol": "mina",
    "name": "Mina Protocol",
    "image": "/15628/large/JM4_vQ34_400x400.png?1696515261"
  },
  {
    "id": "based-brett",
    "symbol": "brett",
    "name": "Brett",
    "image": "/35529/large/1000050750.png?1709031995"
  },
  {
    "id": "just",
    "symbol": "jst",
    "name": "JUST",
    "image": "/11095/large/JUST.jpg?1696511035"
  },
  {
    "id": "coinbase-wrapped-staked-eth",
    "symbol": "cbeth",
    "name": "Coinbase Wrapped Staked ETH",
    "image": "/27008/large/cbeth.png?1709186989"
  },
  {
    "id": "morpho",
    "symbol": "morpho",
    "name": "Morpho",
    "image": "/29837/large/Morpho-token-icon.png?1726771230"
  },
  {
    "id": "reserve-rights-token",
    "symbol": "rsr",
    "name": "Reserve Rights",
    "image": "/8365/large/RSR_Blue_Circle_1000.png?1721777856"
  },
  {
    "id": "beam-2",
    "symbol": "beam",
    "name": "Beam",
    "image": "/32417/large/chain-logo.png?1698114384"
  },
  {
    "id": "polygon-pos-bridged-weth-polygon-pos",
    "symbol": "weth",
    "name": "Polygon PoS Bridged WETH (Polygon POS)",
    "image": "/39708/large/WETH.PNG?1723730343"
  },
  {
    "id": "aioz-network",
    "symbol": "aioz",
    "name": "AIOZ Network",
    "image": "/14631/large/aioz-logo-200.png?1696514309"
  },
  {
    "id": "1inch",
    "symbol": "1inch",
    "name": "1inch",
    "image": "/13469/large/1inch-token.png?1696513230"
  },
  {
    "id": "plume",
    "symbol": "plume",
    "name": "Plume",
    "image": "/53623/large/plume-token.png?1736896935"
  },
  {
    "id": "elixir-deusd",
    "symbol": "deusd",
    "name": "Elixir deUSD",
    "image": "/39494/large/deUSD_Logo_%281%29.png?1723689002"
  },
  {
    "id": "havven",
    "symbol": "snx",
    "name": "Synthetix Network",
    "image": "/3406/large/SNX.png?1696504103"
  },
  {
    "id": "eigenlayer",
    "symbol": "eigen",
    "name": "Eigenlayer",
    "image": "/37441/large/eigen.jpg?1728023974"
  },
  {
    "id": "stader-ethx",
    "symbol": "ethx",
    "name": "Stader ETHx",
    "image": "/30870/large/staderx.png?1696529717"
  },
  {
    "id": "akash-network",
    "symbol": "akt",
    "name": "Akash Network",
    "image": "/12785/large/akash-logo.png?1696512580"
  },
  {
    "id": "mx-token",
    "symbol": "mx",
    "name": "MX",
    "image": "/8545/large/MEXC_GLOBAL_LOGO.jpeg?1696508719"
  },
  {
    "id": "golem",
    "symbol": "glm",
    "name": "Golem",
    "image": "/542/large/Golem_Submark_Positive_RGB.png?1696501761"
  },
  {
    "id": "sweth",
    "symbol": "sweth",
    "name": "Swell Ethereum",
    "image": "/30326/large/_lB7zEtS_400x400.jpg?1696529227"
  },
  {
    "id": "kusama",
    "symbol": "ksm",
    "name": "Kusama",
    "image": "/9568/large/m4zRhP5e_400x400.jpg?1696509648"
  },
  {
    "id": "safepal",
    "symbol": "sfp",
    "name": "SafePal",
    "image": "/13905/large/sfp.png?1696513647"
  },
  {
    "id": "super-oeth",
    "symbol": "superoethb",
    "name": "Super OETH",
    "image": "/39828/large/Super_OETH.png?1724208268"
  },
  {
    "id": "dash",
    "symbol": "dash",
    "name": "Dash",
    "image": "/19/large/dash-logo.png?1696501423"
  },
  {
    "id": "frax-ether",
    "symbol": "frxeth",
    "name": "Frax Ether",
    "image": "/28284/large/frxETH_icon.png?1696527284"
  },
  {
    "id": "ai-companions",
    "symbol": "aic",
    "name": "AI Companions",
    "image": "/40130/large/AI_Companions.png?1725942702"
  },
  {
    "id": "compound-wrapped-btc",
    "symbol": "cwbtc",
    "name": "cWBTC",
    "image": "/10823/large/cwbtc.png?1696510780"
  },
  {
    "id": "zksync",
    "symbol": "zk",
    "name": "ZKsync",
    "image": "/38043/large/ZKTokenBlack.png?1718614502"
  },
  {
    "id": "theta-fuel",
    "symbol": "tfuel",
    "name": "Theta Fuel",
    "image": "/8029/large/1_0YusgngOrriVg4ZYx4wOFQ.png?1696508251"
  },
  {
    "id": "polygon-bridged-wbtc-polygon-pos",
    "symbol": "wbtc",
    "name": "Polygon Bridged WBTC (Polygon POS)",
    "image": "/39530/large/wbtc.png?1722809402"
  },
  {
    "id": "wormhole",
    "symbol": "w",
    "name": "Wormhole",
    "image": "/35087/large/womrhole_logo_full_color_rgb_2000px_72ppi_fb766ac85a.png?1708688954"
  },
  {
    "id": "ether-fi-staked-btc",
    "symbol": "ebtc",
    "name": "Ether.fi Staked BTC",
    "image": "/50411/large/eBTC.png?1727664788"
  },
  {
    "id": "creditcoin-2",
    "symbol": "ctc",
    "name": "Creditcoin",
    "image": "/10569/large/Creditcoin_Symbol_dark56.png?1737796066"
  },
  {
    "id": "sats-ordinals",
    "symbol": "sats",
    "name": "SATS (Ordinals)",
    "image": "/30666/large/_dD8qr3M_400x400.png?1702913020"
  },
  {
    "id": "quorium",
    "symbol": "qgold",
    "name": "Quorium",
    "image": "/33597/large/Linked_in_Profile_Picture.png?1702476714"
  },
  {
    "id": "snek",
    "symbol": "snek",
    "name": "Snek",
    "image": "/30496/large/snek_icon_200_v2.png?1737994261"
  },
  {
    "id": "blur",
    "symbol": "blur",
    "name": "Blur",
    "image": "/28453/large/blur.png?1696527448"
  },
  {
    "id": "zilliqa",
    "symbol": "zil",
    "name": "Zilliqa",
    "image": "/2687/large/Zilliqa-logo.png?1696503475"
  },
  {
    "id": "astar",
    "symbol": "astr",
    "name": "Astar",
    "image": "/22617/large/astr.png?1696521933"
  },
  {
    "id": "fartcoin",
    "symbol": "fartcoin",
    "name": "Fartcoin",
    "image": "/50891/large/fart.jpg?1729503972"
  },
  {
    "id": "aethir",
    "symbol": "ath",
    "name": "Aethir",
    "image": "/36179/large/logogram_circle_dark_green_vb_green_%281%29.png?1718232706"
  },
  {
    "id": "nervos-network",
    "symbol": "ckb",
    "name": "Nervos Network",
    "image": "/9566/large/Nervos_White.png?1696509646"
  },
  {
    "id": "basic-attention-token",
    "symbol": "bat",
    "name": "Basic Attention",
    "image": "/677/large/basic-attention-token.png?1696501867"
  },
  {
    "id": "usdd",
    "symbol": "usdd",
    "name": "USDD",
    "image": "/25380/large/UUSD.jpg?1696524513"
  },
  {
    "id": "safe",
    "symbol": "safe",
    "name": "Safe",
    "image": "/27032/large/Artboard_1_copy_8circle-1.png?1696526084"
  },
  {
    "id": "liquid-staked-ethereum",
    "symbol": "lseth",
    "name": "Liquid Staked ETH",
    "image": "/28848/large/LsETH-receipt-token-circle.png?1696527824"
  },
  {
    "id": "qtum",
    "symbol": "qtum",
    "name": "Qtum",
    "image": "/684/large/Qtum_Logo_blue_CG.png?1696501874"
  },
  {
    "id": "oasis-network",
    "symbol": "rose",
    "name": "Oasis",
    "image": "/13162/large/OASIS.jpg?1727698287"
  },
  {
    "id": "superfarm",
    "symbol": "super",
    "name": "SuperVerse",
    "image": "/14040/large/SV-Logo-200x200.png?1706880312"
  },
  {
    "id": "mask-network",
    "symbol": "mask",
    "name": "Mask Network",
    "image": "/14051/large/Mask_Network.jpg?1696513776"
  },
  {
    "id": "instadapp",
    "symbol": "fluid",
    "name": "Fluid",
    "image": "/14688/large/Logo_1_%28brighter%29.png?1734430693"
  },
  {
    "id": "dydx",
    "symbol": "ethdydx",
    "name": "dYdX",
    "image": "/17500/large/hjnIm9bV.jpg?1696517040"
  },
  {
    "id": "livepeer",
    "symbol": "lpt",
    "name": "Livepeer",
    "image": "/7137/large/badge-logo-circuit-green.png?1719357686"
  },
  {
    "id": "deep",
    "symbol": "deep",
    "name": "DeepBook",
    "image": "/50648/large/DEEP_Logo_256x256_px_%282%29.png?1728612340"
  },
  {
    "id": "vethor-token",
    "symbol": "vtho",
    "name": "VeThor",
    "image": "/5230/large/VTHO_Token_Icon.png?1696505735"
  },
  {
    "id": "echelon-prime",
    "symbol": "prime",
    "name": "Echelon Prime",
    "image": "/29053/large/prime-logo-small-border_%282%29.png?1696528020"
  },
  {
    "id": "chex-token",
    "symbol": "chex",
    "name": "CHEX Token",
    "image": "/10349/large/logo-white-bg-dark.png?1733475849"
  },
  {
    "id": "0x",
    "symbol": "zrx",
    "name": "0x Protocol",
    "image": "/863/large/0x.png?1696501996"
  },
  {
    "id": "meow",
    "symbol": "meow",
    "name": "MEOW",
    "image": "/38796/large/MEOW.png?1718897555"
  },
  {
    "id": "wemix-token",
    "symbol": "wemix",
    "name": "WEMIX",
    "image": "/12998/large/wemixcoin_color_200.png?1696512788"
  },
  {
    "id": "ai16z",
    "symbol": "ai16z",
    "name": "ai16z",
    "image": "/51090/large/AI16Z.jpg?1730027175"
  },
  {
    "id": "notcoin",
    "symbol": "not",
    "name": "Notcoin",
    "image": "/33453/large/rFmThDiD_400x400.jpg?1701876350"
  },
  {
    "id": "gho",
    "symbol": "gho",
    "name": "GHO",
    "image": "/30663/large/gho-token-logo.png?1720517092"
  },
  {
    "id": "staked-frax-ether",
    "symbol": "sfrxeth",
    "name": "Staked Frax Ether",
    "image": "/28285/large/sfrxETH_icon.png?1696527285"
  },
  {
    "id": "holotoken",
    "symbol": "hot",
    "name": "Holo",
    "image": "/3348/large/Holologo_Profile.png?1696504052"
  },
  {
    "id": "usda-2",
    "symbol": "usda",
    "name": "USDa",
    "image": "/51599/large/SUSDA.png?1731604761"
  },
  {
    "id": "layerzero",
    "symbol": "zro",
    "name": "LayerZero",
    "image": "/28206/large/ftxG9_TJ_400x400.jpeg?1696527208"
  },
  {
    "id": "chia",
    "symbol": "xch",
    "name": "Chia",
    "image": "/15174/large/zV5K5y9f_400x400.png?1696514829"
  },
  {
    "id": "celo",
    "symbol": "celo",
    "name": "Celo",
    "image": "/11090/large/InjXBNx9_400x400.jpg?1696511031"
  },
  {
    "id": "osmosis",
    "symbol": "osmo",
    "name": "Osmosis",
    "image": "/16724/large/osmo.png?1696516298"
  },
  {
    "id": "stargate-finance",
    "symbol": "stg",
    "name": "Stargate Finance",
    "image": "/24413/large/STG_LOGO.png?1696523595"
  },
  {
    "id": "btse-token",
    "symbol": "btse",
    "name": "BTSE Token",
    "image": "/10807/large/BTSE_logo_Square.jpeg?1696510765"
  },
  {
    "id": "baby-doge-coin",
    "symbol": "babydoge",
    "name": "Baby Doge Coin",
    "image": "/16125/large/babydoge.jpg?1696515731"
  },
  {
    "id": "cheems-token",
    "symbol": "cheems",
    "name": "Cheems Token",
    "image": "/30376/large/Hg4_Lhbg_400x400.jpg?1696529270"
  },
  {
    "id": "dog-go-to-the-moon-rune",
    "symbol": "dog",
    "name": "Dog (Bitcoin)",
    "image": "/37352/large/DOGGOTOTHEMOON.png?1714096969"
  },
  {
    "id": "resolv-wstusr",
    "symbol": "wstusr",
    "name": "Resolv wstUSR",
    "image": "/51880/large/USR_LOGO.png?1732098841"
  },
  {
    "id": "ket",
    "symbol": "ket",
    "name": "Ket",
    "image": "/53789/large/edfw.jpg?1737381234"
  },
  {
    "id": "arkham",
    "symbol": "arkm",
    "name": "Arkham",
    "image": "/30929/large/Arkham_Logo_CG.png?1696529771"
  },
  {
    "id": "agentfun-ai",
    "symbol": "agentfun",
    "name": "AgentFun.AI",
    "image": "/52133/large/AIFUN_%282%29.png?1732639482"
  },
  {
    "id": "swissborg",
    "symbol": "borg",
    "name": "SwissBorg",
    "image": "/2117/large/YJUrRy7r_400x400.png?1696503083"
  },
  {
    "id": "gas",
    "symbol": "gas",
    "name": "Gas",
    "image": "/858/large/GAS_512_512.png?1696501992"
  },
  {
    "id": "decred",
    "symbol": "dcr",
    "name": "Decred",
    "image": "/329/large/decred.png?1696501665"
  },
  {
    "id": "digibyte",
    "symbol": "dgb",
    "name": "DigiByte",
    "image": "/63/large/digibyte.png?1696501454"
  },
  {
    "id": "act-i-the-ai-prophecy",
    "symbol": "act",
    "name": "Act I The AI Prophecy",
    "image": "/50984/large/ai_prophecy.jpg?1729653897"
  },
  {
    "id": "origintrail",
    "symbol": "trac",
    "name": "OriginTrail",
    "image": "/1877/large/TRAC.jpg?1696502873"
  },
  {
    "id": "bridged-wrapped-ether-starkgate",
    "symbol": "eth",
    "name": "Bridged Ether (StarkGate)",
    "image": "/32208/large/ethereum.png?1696752015"
  },
  {
    "id": "acet-token",
    "symbol": "act",
    "name": "Acet",
    "image": "/18205/large/ACET-LOGO.png?1696517703"
  },
  {
    "id": "apf-coin",
    "symbol": "apfc",
    "name": "APF coin",
    "image": "/30990/large/photo_2023-10-28_09-48-25.jpg?1698518912"
  },
  {
    "id": "abtc",
    "symbol": "abtc",
    "name": "aBTC",
    "image": "/50837/large/aBTC_512.png?1729260701"
  },
  {
    "id": "siacoin",
    "symbol": "sc",
    "name": "Siacoin",
    "image": "/289/large/siacoin.png?1696501638"
  },
  {
    "id": "mimblewimblecoin",
    "symbol": "mwc",
    "name": "MimbleWimbleCoin",
    "image": "/9989/large/E5zZUXza_400x400.jpg?1696510026"
  },
  {
    "id": "yearn-finance",
    "symbol": "yfi",
    "name": "yearn.finance",
    "image": "/11849/large/yearn.jpg?1696511720"
  },
  {
    "id": "treehouse-eth",
    "symbol": "teth",
    "name": "Treehouse ETH",
    "image": "/40155/large/tETH_logo_2_%281%29.png?1726079209"
  },
  {
    "id": "ankr",
    "symbol": "ankr",
    "name": "Ankr Network",
    "image": "/4324/large/U85xTl2.png?1696504928"
  },
  {
    "id": "nem",
    "symbol": "xem",
    "name": "NEM",
    "image": "/242/large/NEM_WC_Logo_200px.png?1696501595"
  },
  {
    "id": "rollbit-coin",
    "symbol": "rlb",
    "name": "Rollbit Coin",
    "image": "/24552/large/unziL6wO_400x400.jpg?1696523729"
  },
  {
    "id": "ravencoin",
    "symbol": "rvn",
    "name": "Ravencoin",
    "image": "/3412/large/ravencoin.png?1696504108"
  },
  {
    "id": "drift-protocol",
    "symbol": "drift",
    "name": "Drift Protocol",
    "image": "/37509/large/DRIFT.png?1715842607"
  },
  {
    "id": "ordinals",
    "symbol": "ordi",
    "name": "ORDI",
    "image": "/30162/large/ordi.png?1696529082"
  },
  {
    "id": "gmt-token",
    "symbol": "gomining",
    "name": "GoMining Token",
    "image": "/15662/large/GoMining_Logo.png?1714757256"
  },
  {
    "id": "mocaverse",
    "symbol": "moca",
    "name": "Moca Network",
    "image": "/37812/large/moca.jpg?1720693068"
  },
  {
    "id": "tribe-2",
    "symbol": "tribe",
    "name": "Tribe",
    "image": "/14575/large/tribe.PNG?1696514256"
  },
  {
    "id": "benqi-liquid-staked-avax",
    "symbol": "savax",
    "name": "BENQI Liquid Staked AVAX",
    "image": "/23657/large/savax_blue.png?1696522860"
  },
  {
    "id": "rcge",
    "symbol": "$rcge",
    "name": "RCGE",
    "image": "/51366/large/1000233806.png?1730910977"
  },
  {
    "id": "popcat",
    "symbol": "popcat",
    "name": "Popcat",
    "image": "/33760/large/image.jpg?1702964227"
  },
  {
    "id": "mog-coin",
    "symbol": "mog",
    "name": "Mog Coin",
    "image": "/31059/large/MOG_LOGO_200x200.png?1696529893"
  },
  {
    "id": "aelf",
    "symbol": "elf",
    "name": "aelf",
    "image": "/1371/large/aelf-logo.png?1696502429"
  },
  {
    "id": "cat-in-a-dogs-world",
    "symbol": "mew",
    "name": "cat in a dogs world",
    "image": "/36440/large/MEW.png?1711442286"
  },
  {
    "id": "enjincoin",
    "symbol": "enj",
    "name": "Enjin Coin",
    "image": "/1102/large/Symbol_Only_-_Purple.png?1709725966"
  },
  {
    "id": "threshold-network-token",
    "symbol": "t",
    "name": "Threshold Network",
    "image": "/22228/large/nFPNiSbL_400x400.jpg?1696521570"
  },
  {
    "id": "elixir-staked-deusd",
    "symbol": "sdeusd",
    "name": "Elixir Staked deUSD",
    "image": "/52847/large/Staked_deUSD_%28sdeUSD%29_Logo.png?1734473339"
  },
  {
    "id": "trip",
    "symbol": "trip",
    "name": "Trip",
    "image": "/54717/large/IMG-20250120-184423-846.png?1741186152"
  },
  {
    "id": "peanut-the-squirrel",
    "symbol": "pnut",
    "name": "Peanut the Squirrel",
    "image": "/51301/large/Peanut_the_Squirrel.png?1734941241"
  },
  {
    "id": "sun-token",
    "symbol": "sun",
    "name": "Sun Token",
    "image": "/12424/large/RSFOmQ.png?1696512245"
  },
  {
    "id": "solayer",
    "symbol": "layer",
    "name": "Solayer",
    "image": "/53498/large/Layer_320x320.png?1737481230"
  },
  {
    "id": "convex-finance",
    "symbol": "cvx",
    "name": "Convex Finance",
    "image": "/15585/large/convex.png?1696515221"
  },
  {
    "id": "woo-network",
    "symbol": "woo",
    "name": "WOO",
    "image": "/12921/large/WOO_Logos_2023_Profile_Pic_WOO.png?1696512709"
  },
  {
    "id": "hivemapper",
    "symbol": "honey",
    "name": "Hivemapper",
    "image": "/28388/large/honey.png?1696527388"
  },
  {
    "id": "vana",
    "symbol": "vana",
    "name": "Vana",
    "image": "/51404/large/logo.png?1731086679"
  },
  {
    "id": "lorenzo-stbtc",
    "symbol": "stbtc",
    "name": "Lorenzo stBTC",
    "image": "/50978/large/a.jpg?1730208372"
  },
  {
    "id": "lcx",
    "symbol": "lcx",
    "name": "LCX",
    "image": "/9985/large/zRPSu_0o_400x400.jpg?1696510023"
  },
  {
    "id": "ether-fi",
    "symbol": "ethfi",
    "name": "Ether.fi",
    "image": "/35958/large/etherfi.jpeg?1710254562"
  },
  {
    "id": "zetachain",
    "symbol": "zeta",
    "name": "ZetaChain",
    "image": "/26718/large/Twitter_icon.png?1696525788"
  },
  {
    "id": "wrapped-ether-mantle-bridge",
    "symbol": "weth",
    "name": "Wrapped Ether (Mantle Bridge)",
    "image": "/31013/large/wrapped-eth-mantle-bridge.png?1696529850"
  },
  {
    "id": "wrapped-beacon-eth",
    "symbol": "wbeth",
    "name": "Wrapped Beacon ETH",
    "image": "/30061/large/wbeth-icon.png?1696528983"
  },
  {
    "id": "zencash",
    "symbol": "zen",
    "name": "Horizen",
    "image": "/691/large/horizen.png?1696501880"
  },
  {
    "id": "toshi",
    "symbol": "toshi",
    "name": "Toshi",
    "image": "/31126/large/Toshi_Logo_-_Circular.png?1721677476"
  },
  {
    "id": "uxlink",
    "symbol": "uxlink",
    "name": "UXLINK",
    "image": "/39229/large/uxlink.jpg?1721201390"
  },
  {
    "id": "bitkub-coin",
    "symbol": "kub",
    "name": "Bitkub Coin",
    "image": "/15760/large/KUB.png?1696515385"
  },
  {
    "id": "ethereum-pow-iou",
    "symbol": "ethw",
    "name": "EthereumPoW",
    "image": "/26997/large/logo-clear.png?1696526049"
  },
  {
    "id": "skale",
    "symbol": "skl",
    "name": "SKALE",
    "image": "/13245/large/SKALE_token_300x300.png?1696513021"
  },
  {
    "id": "metaplex",
    "symbol": "mplx",
    "name": "Metaplex",
    "image": "/27344/large/mplx.png?1696526391"
  },
  {
    "id": "turbo",
    "symbol": "turbo",
    "name": "Turbo",
    "image": "/30117/large/TurboMark-QL_200.png?1708079597"
  },
  {
    "id": "polymesh",
    "symbol": "polyx",
    "name": "Polymesh",
    "image": "/23496/large/Polymesh-symbol.png?1696522706"
  },
  {
    "id": "harmony",
    "symbol": "one",
    "name": "Harmony",
    "image": "/4344/large/Y88JAze.png?1696504947"
  },
  {
    "id": "coinex-token",
    "symbol": "cet",
    "name": "CoinEx",
    "image": "/4817/large/coinex-token.png?1696505367"
  },
  {
    "id": "gmx",
    "symbol": "gmx",
    "name": "GMX",
    "image": "/18323/large/arbit.png?1696517814"
  },
  {
    "id": "nano",
    "symbol": "xno",
    "name": "Nano",
    "image": "/756/large/nano.png?1696501910"
  },
  {
    "id": "iotex",
    "symbol": "iotx",
    "name": "IoTeX",
    "image": "/3334/large/Token_Icon_Token_Icon.png?1727899869"
  },
  {
    "id": "the-grays-currency",
    "symbol": "ptgc",
    "name": "The Grays Currency",
    "image": "/32933/large/IMG_8413.jpeg?1738402400"
  },
  {
    "id": "waves",
    "symbol": "waves",
    "name": "Waves",
    "image": "/425/large/waves.png?1696501700"
  },
  {
    "id": "casper-network",
    "symbol": "cspr",
    "name": "Casper Network",
    "image": "/15279/large/Casper_Token_Circle_SU_Red-White_RGB_200_x_200.png?1734587165"
  },
  {
    "id": "xyo-network",
    "symbol": "xyo",
    "name": "XYO Network",
    "image": "/4519/large/XYO_Network-logo.png?1696505103"
  },
  {
    "id": "constellation-labs",
    "symbol": "dag",
    "name": "Constellation",
    "image": "/4645/large/Constellation_Network_Logo.png?1696505213"
  },
  {
    "id": "binance-peg-sol",
    "symbol": "sol",
    "name": "Binance-Peg SOL",
    "image": "/54582/large/wsol.png?1740542147"
  },
  {
    "id": "amnis-aptos",
    "symbol": "amapt",
    "name": "Amnis Aptos",
    "image": "/32567/large/amAPT.png?1730240666"
  },
  {
    "id": "hamster-kombat",
    "symbol": "hmstr",
    "name": "Hamster Kombat",
    "image": "/39102/large/hamster-removebg-preview.png?1720514486"
  },
  {
    "id": "magic-eden",
    "symbol": "me",
    "name": "Magic Eden",
    "image": "/39850/large/_ME_Profile_Dark_2x.png?1734013082"
  },
  {
    "id": "stp-network",
    "symbol": "stpt",
    "name": "STP",
    "image": "/8713/large/STP.png?1696508875"
  },
  {
    "id": "bnb48-club-token",
    "symbol": "koge",
    "name": "KOGE",
    "image": "/13827/large/bnb48.png?1696513570"
  },
  {
    "id": "world-mobile-token",
    "symbol": "wmtx",
    "name": "World Mobile Token",
    "image": "/17333/large/Token_icon_round_1024.png?1741247846"
  },
  {
    "id": "bio-protocol",
    "symbol": "bio",
    "name": "Bio Protocol",
    "image": "/53022/large/bio.jpg?1735011002"
  },
  {
    "id": "redstone-oracles",
    "symbol": "red",
    "name": "RedStone",
    "image": "/53640/large/RedStone_Logo_New_White.png?1740640919"
  },
  {
    "id": "ripple-usd",
    "symbol": "rlusd",
    "name": "Ripple USD",
    "image": "/39651/large/RLUSD_200x200_%281%29.png?1727376633"
  },
  {
    "id": "stasis-eurs",
    "symbol": "eurs",
    "name": "STASIS EURO",
    "image": "/5164/large/EURS_300x300.png?1696505680"
  },
  {
    "id": "mag7-ssi",
    "symbol": "mag7.ssi",
    "name": "MAG7.ssi",
    "image": "/52962/large/mag7.png?1734863745"
  },
  {
    "id": "kinesis-gold",
    "symbol": "kau",
    "name": "Kinesis Gold",
    "image": "/29788/large/kau-currency-ticker.png?1696528718"
  },
  {
    "id": "kadena",
    "symbol": "kda",
    "name": "Kadena",
    "image": "/3693/large/Social_-_Profile_Picture.png?1723001308"
  },
  {
    "id": "nxm",
    "symbol": "nxm",
    "name": "Nexus Mutual",
    "image": "/11810/large/NXMmain.png?1696511684"
  },
  {
    "id": "cronos-bridged-usdc-cronos",
    "symbol": "usdc",
    "name": "Cronos Bridged USDC (Cronos)",
    "image": "/35227/large/USDC.jpg?1707923223"
  },
  {
    "id": "ontology",
    "symbol": "ont",
    "name": "Ontology",
    "image": "/3447/large/ONT.png?1696504138"
  },
  {
    "id": "wrapped-avax",
    "symbol": "wavax",
    "name": "Wrapped AVAX",
    "image": "/15075/large/wrapped-avax.png?1696514734"
  },
  {
    "id": "loopring",
    "symbol": "lrc",
    "name": "Loopring",
    "image": "/913/large/LRC.png?1696502034"
  },
  {
    "id": "b3",
    "symbol": "b3",
    "name": "B3 (Base)",
    "image": "/54287/large/B3.png?1739001374"
  },
  {
    "id": "stepn",
    "symbol": "gmt",
    "name": "GMT",
    "image": "/23597/large/token-gmt-200x200.png?1703153841"
  },
  {
    "id": "ipmb",
    "symbol": "gpro",
    "name": "GoldPro",
    "image": "/32952/large/20250109_144921.jpg?1736542449"
  },
  {
    "id": "reserve-protocol-eth-plus",
    "symbol": "eth+",
    "name": "ETHPlus",
    "image": "/38061/large/ETH__Logo.png?1716440789"
  },
  {
    "id": "frax-share",
    "symbol": "fxs",
    "name": "Frax Share",
    "image": "/13423/large/Frax_Shares_icon.png?1696513183"
  },
  {
    "id": "terra-luna-2",
    "symbol": "luna",
    "name": "Terra",
    "image": "/25767/large/01_Luna_color.png?1696524851"
  },
  {
    "id": "freysa-ai",
    "symbol": "fai",
    "name": "Freysa AI",
    "image": "/52315/large/FAI.png?1733076295"
  },
  {
    "id": "euro-coin",
    "symbol": "eurc",
    "name": "EURC",
    "image": "/26045/large/euro.png?1696525125"
  },
  {
    "id": "venom",
    "symbol": "venom",
    "name": "Venom",
    "image": "/28660/large/Venom_Icon.png?1696527645"
  },
  {
    "id": "kinesis-silver",
    "symbol": "kag",
    "name": "Kinesis Silver",
    "image": "/29789/large/kag-currency-ticker.png?1696528719"
  },
  {
    "id": "swftcoin",
    "symbol": "swftc",
    "name": "SWFTCOIN",
    "image": "/2346/large/SWFTCoin.jpg?1696503223"
  },
  {
    "id": "global-commercial-business",
    "symbol": "gcb",
    "name": "Global Commercial Business",
    "image": "/39089/large/gcbt.png?1720461904"
  },
  {
    "id": "polyhedra-network",
    "symbol": "zkj",
    "name": "Polyhedra Network",
    "image": "/36198/large/ZK.jpg?1710812518"
  },
  {
    "id": "project-galaxy",
    "symbol": "gal",
    "name": "Galxe",
    "image": "/24530/large/galaxy.jpg?1696523708"
  },
  {
    "id": "m2-global-wealth-limited-mmx",
    "symbol": "mmx",
    "name": "MMX",
    "image": "/33161/large/mmx.png?1700830276"
  },
  {
    "id": "band-protocol",
    "symbol": "band",
    "name": "Band Protocol",
    "image": "/9545/large/Band_token_blue_violet_token.png?1696509627"
  },
  {
    "id": "global-dollar",
    "symbol": "usdg",
    "name": "Global Dollar",
    "image": "/51281/large/GDN_USDG_Token_200x200.png?1730484111"
  },
  {
    "id": "polygon-pos-bridged-dai-polygon-pos",
    "symbol": "dai",
    "name": "Polygon PoS Bridged DAI (Polygon POS)",
    "image": "/39787/large/dai.png?1724110678"
  },
  {
    "id": "sushi",
    "symbol": "sushi",
    "name": "Sushi",
    "image": "/12271/large/512x512_Logo_no_chop.png?1696512101"
  },
  {
    "id": "coti",
    "symbol": "coti",
    "name": "COTI",
    "image": "/2962/large/Coti.png?1696503705"
  },
  {
    "id": "io",
    "symbol": "io",
    "name": "io.net",
    "image": "/37754/large/io_blackbg.png?1715446363"
  },
  {
    "id": "eutbl",
    "symbol": "eutbl",
    "name": "Spiko EU T-Bills Money Market Fund",
    "image": "/39657/large/EUTBL.png?1723517425"
  },
  {
    "id": "swipe",
    "symbol": "sxp",
    "name": "Solar",
    "image": "/9368/large/swipe.png?1696509466"
  },
  {
    "id": "alchemy-pay",
    "symbol": "ach",
    "name": "Alchemy Pay",
    "image": "/12390/large/ACH_%281%29.png?1696512213"
  },
  {
    "id": "usual",
    "symbol": "usual",
    "name": "Usual",
    "image": "/51091/large/USUAL.jpg?1730035787"
  },
  {
    "id": "compound-ether",
    "symbol": "ceth",
    "name": "cETH",
    "image": "/10643/large/ceth.png?1696510617"
  },
  {
    "id": "realtoken-ecosystem-governance",
    "symbol": "reg",
    "name": "RealToken Ecosystem Governance",
    "image": "/37785/large/REG_Logo_200x200.png?1737625372"
  },
  {
    "id": "auction",
    "symbol": "auction",
    "name": "Bounce",
    "image": "/13860/large/1_KtgpRIJzuwfHe0Rl0avP_g.jpeg?1696513606"
  },
  {
    "id": "nkyc-token",
    "symbol": "nkyc",
    "name": "NKYC Token",
    "image": "/30337/large/NKYC-Logo.png?1696529238"
  },
  {
    "id": "zignaly",
    "symbol": "zig",
    "name": "ZIGChain",
    "image": "/14796/large/zig.jpg?1731990265"
  },
  {
    "id": "audius",
    "symbol": "audio",
    "name": "Audius",
    "image": "/12913/large/AudiusCoinLogo_2x.png?1696512701"
  },
  {
    "id": "proton",
    "symbol": "xpr",
    "name": "XPR Network",
    "image": "/10941/large/XPR.jpg?1696510891"
  },
  {
    "id": "bybit-staked-sol",
    "symbol": "bbsol",
    "name": "Bybit Staked SOL",
    "image": "/40095/large/400x400.png?1725628094"
  },
  {
    "id": "melania-meme",
    "symbol": "melania",
    "name": "Melania Meme",
    "image": "/53775/large/melania-meme.png?1737329885"
  },
  {
    "id": "rocket-pool",
    "symbol": "rpl",
    "name": "Rocket Pool",
    "image": "/2090/large/rocket_pool_%28RPL%29.png?1696503058"
  },
  {
    "id": "hive",
    "symbol": "hive",
    "name": "Hive",
    "image": "/10840/large/logo_transparent_4x.png?1696510797"
  },
  {
    "id": "g-token",
    "symbol": "g",
    "name": "Gravity",
    "image": "/39200/large/gravity.jpg?1721020647"
  },
  {
    "id": "zebec-network",
    "symbol": "zbcn",
    "name": "Zebec Network",
    "image": "/37052/large/zbcn.jpeg?1713168241"
  },
  {
    "id": "illuvium",
    "symbol": "ilv",
    "name": "Illuvium",
    "image": "/14468/large/logo-200x200.png?1696514154"
  },
  {
    "id": "gigachad-2",
    "symbol": "giga",
    "name": "Gigachad",
    "image": "/34755/large/IMG_0015.png?1705957165"
  },
  {
    "id": "syrup",
    "symbol": "syrup",
    "name": "Maple Finance",
    "image": "/51232/large/IMG_7420.png?1730831572"
  },
  {
    "id": "metis-token",
    "symbol": "metis",
    "name": "Metis",
    "image": "/15595/large/Metis_Black_Bg.png?1702968192"
  },
  {
    "id": "usd-coin-ethereum-bridged",
    "symbol": "usdc.e",
    "name": "Arbitrum Bridged USDC (Arbitrum)",
    "image": "/30691/large/usdc.png?1696529560"
  },
  {
    "id": "biconomy",
    "symbol": "bico",
    "name": "Biconomy",
    "image": "/21061/large/biconomy_logo.jpg?1696520444"
  },
  {
    "id": "steakhouse-usdc-morpho-vault",
    "symbol": "steakusdc",
    "name": "Steakhouse USDC Morpho Vault",
    "image": "/51473/large/steakUSDC.png?1731396462"
  },
  {
    "id": "cow-protocol",
    "symbol": "cow",
    "name": "CoW Protocol",
    "image": "/24384/large/CoW-token_logo.png?1719524382"
  },
  {
    "id": "prometeus",
    "symbol": "prom",
    "name": "Prom",
    "image": "/8825/large/Ticker.png?1696508978"
  },
  {
    "id": "zelcash",
    "symbol": "flux",
    "name": "Flux",
    "image": "/5163/large/Flux_symbol_blue-white.png?1696505679"
  },
  {
    "id": "uxd-protocol-token",
    "symbol": "uxp",
    "name": "UXD Protocol",
    "image": "/20319/large/UXP.jpg?1696519722"
  },
  {
    "id": "neiro-3",
    "symbol": "neiro",
    "name": "Neiro",
    "image": "/39488/large/neiro.jpg?1731449567"
  },
  {
    "id": "icon",
    "symbol": "icx",
    "name": "ICON",
    "image": "/1060/large/ICON-symbol-coingecko_latest.png?1706638336"
  },
  {
    "id": "euler",
    "symbol": "eul",
    "name": "Euler",
    "image": "/26149/large/Coingecko_logo_%281%29.png?1706026067"
  },
  {
    "id": "crypto-trading-fund",
    "symbol": "ctf",
    "name": "Crypto Trading Fund",
    "image": "/37122/large/33DE079C-182B-40D7-B26D-0D7E12158140.jpeg?1713366927"
  },
  {
    "id": "anzen-usdz",
    "symbol": "usdz",
    "name": "Anzen USDz",
    "image": "/38039/large/usdz-image-200x200.png?1716334412"
  },
  {
    "id": "resolv-rlp",
    "symbol": "rlp",
    "name": "Resolv RLP",
    "image": "/40017/large/orangeLogo..png?1725344586"
  },
  {
    "id": "deso",
    "symbol": "deso",
    "name": "Decentralized Social",
    "image": "/16310/large/deso-logo-refresh-white.png?1696515911"
  },
  {
    "id": "astherus-usdf",
    "symbol": "usdf",
    "name": "Astherus USDF",
    "image": "/54133/large/USDF_LOGO.png?1738393978"
  },
  {
    "id": "bonfida",
    "symbol": "fida",
    "name": "Solana Name Service",
    "image": "/13395/large/bonfida.png?1696513157"
  },
  {
    "id": "adventure-gold",
    "symbol": "agld",
    "name": "Adventure Gold",
    "image": "/18125/large/lpgblc4h_400x400.jpg?1696517628"
  },
  {
    "id": "aevo-exchange",
    "symbol": "aevo",
    "name": "Aevo",
    "image": "/35893/large/aevo.png?1710138340"
  },
  {
    "id": "solo-coin",
    "symbol": "solo",
    "name": "Sologenic",
    "image": "/10771/large/solo.png?1696510734"
  },
  {
    "id": "supra",
    "symbol": "supra",
    "name": "Supra",
    "image": "/35836/large/photo_2024-03-09_19-25-08.jpg?1709983533"
  },
  {
    "id": "memecoin-2",
    "symbol": "meme",
    "name": "Memecoin",
    "image": "/32528/large/memecoin_%282%29.png?1698912168"
  },
  {
    "id": "geodnet",
    "symbol": "geod",
    "name": "Geodnet",
    "image": "/31608/large/Circular_White.png?1696530424"
  },
  {
    "id": "avail",
    "symbol": "avail",
    "name": "Avail",
    "image": "/37372/large/avail-logo.png?1714145201"
  },
  {
    "id": "l2-standard-bridged-weth-blast",
    "symbol": "weth",
    "name": "L2 Standard Bridged WETH (Blast)",
    "image": "/39727/large/weth.png?1723758119"
  },
  {
    "id": "mythos",
    "symbol": "myth",
    "name": "Mythos",
    "image": "/28045/large/Mythos_Logos_200x200.png?1696527059"
  },
  {
    "id": "status",
    "symbol": "snt",
    "name": "Status",
    "image": "/779/large/status.png?1696501931"
  },
  {
    "id": "uma",
    "symbol": "uma",
    "name": "UMA",
    "image": "/10951/large/UMA.png?1696510900"
  },
  {
    "id": "vvs-finance",
    "symbol": "vvs",
    "name": "VVS Finance",
    "image": "/20210/large/8glAYOTM_400x400.jpg?1696519620"
  },
  {
    "id": "blockv",
    "symbol": "vee",
    "name": "BLOCKv",
    "image": "/1266/large/blockv.png?1696502339"
  },
  {
    "id": "oec-token",
    "symbol": "okt",
    "name": "OKT Chain",
    "image": "/13708/large/WeChat_Image_20220118095654.png?1696513453"
  },
  {
    "id": "anime",
    "symbol": "anime",
    "name": "Animecoin",
    "image": "/53575/large/anime.jpg?1736748703"
  },
  {
    "id": "sathosi-airlines-token",
    "symbol": "jet",
    "name": "Satoshi Airline",
    "image": "/34036/large/IMG_20231225_194035_093.jpg?1703690482"
  },
  {
    "id": "aleo",
    "symbol": "aleo",
    "name": "ALEO",
    "image": "/27916/large/secondary-icon-dark.png?1726770428"
  },
  {
    "id": "infinitar-governance-token",
    "symbol": "igt",
    "name": "Infinitar Governance Token",
    "image": "/50985/large/infinitar.jpg?1729654559"
  },
  {
    "id": "ecoin-2",
    "symbol": "ecoin",
    "name": "Ecoin",
    "image": "/10849/large/IMG_4307.jpg?1696510805"
  },
  {
    "id": "balancer",
    "symbol": "bal",
    "name": "Balancer",
    "image": "/11683/large/Balancer.png?1696511572"
  },
  {
    "id": "l2-standard-bridged-frxusd",
    "symbol": "frxusd",
    "name": "L2 Standard Bridged frxUSD",
    "image": "/54455/large/frxusd.png?1739790094"
  },
  {
    "id": "altlayer",
    "symbol": "alt",
    "name": "AltLayer",
    "image": "/34608/large/Logomark_200x200.png?1715107868"
  },
  {
    "id": "manta-network",
    "symbol": "manta",
    "name": "Manta Network",
    "image": "/34289/large/manta.jpg?1704468717"
  },
  {
    "id": "bora",
    "symbol": "bora",
    "name": "BORA",
    "image": "/7646/large/mqFw8hxm_400x400.jpeg?1696507900"
  },
  {
    "id": "aixbt",
    "symbol": "aixbt",
    "name": "aixbt by Virtuals",
    "image": "/51784/large/3.png?1731981138"
  },
  {
    "id": "velo",
    "symbol": "velo",
    "name": "Velo",
    "image": "/12538/large/Logo_200x_200.png?1696512350"
  },
  {
    "id": "peaq-2",
    "symbol": "peaq",
    "name": "peaq",
    "image": "/51415/large/peaq-token-brand-icon_%281%29.png?1731122664"
  },
  {
    "id": "lisk",
    "symbol": "lsk",
    "name": "Lisk",
    "image": "/385/large/Lisk_logo.png?1722338450"
  },
  {
    "id": "spell-token",
    "symbol": "spell",
    "name": "Spell",
    "image": "/15861/large/abracadabra-3.png?1696515477"
  },
  {
    "id": "venus",
    "symbol": "xvs",
    "name": "Venus",
    "image": "/12677/large/XVS_Token.jpg?1727454303"
  },
  {
    "id": "zano",
    "symbol": "zano",
    "name": "Zano",
    "image": "/8370/large/zano.png?1696508563"
  },
  {
    "id": "zeus-network",
    "symbol": "zeus",
    "name": "Zeus Network",
    "image": "/36692/large/logo-v1.png?1712427948"
  },
  {
    "id": "ignition-fbtc",
    "symbol": "fbtc",
    "name": "Function ƒBTC",
    "image": "/39182/large/fbtc.png?1740123952"
  },
  {
    "id": "solayer-staked-sol",
    "symbol": "ssol",
    "name": "Solayer Staked SOL",
    "image": "/39933/large/image_%283%29.png?1731705921"
  },
  {
    "id": "mines-of-dalarnia",
    "symbol": "dar",
    "name": "Mines of Dalarnia",
    "image": "/19837/large/dar.png?1696519259"
  },
  {
    "id": "across-protocol",
    "symbol": "acx",
    "name": "Across Protocol",
    "image": "/28161/large/across-200x200.png?1696527165"
  },
  {
    "id": "book-of-meme",
    "symbol": "bome",
    "name": "BOOK OF MEME",
    "image": "/36071/large/bome.png?1710407255"
  },
  {
    "id": "zircuit",
    "symbol": "zrc",
    "name": "Zircuit",
    "image": "/35960/large/zircuit_token_icon_2.png?1732502352"
  },
  {
    "id": "space-id",
    "symbol": "id",
    "name": "SPACE ID",
    "image": "/29468/large/sid_token_logo_%28green2%29.png?1696528413"
  },
  {
    "id": "everipedia",
    "symbol": "iq",
    "name": "IQ",
    "image": "/5010/large/YAIS3fUh.png?1696505542"
  },
  {
    "id": "pha",
    "symbol": "pha",
    "name": "PHALA",
    "image": "/12451/large/phala.png?1696512270"
  },
  {
    "id": "orbs",
    "symbol": "orbs",
    "name": "Orbs",
    "image": "/4630/large/Orbs.jpg?1696505200"
  },
  {
    "id": "power-ledger",
    "symbol": "powr",
    "name": "Powerledger",
    "image": "/1104/large/Powerledger_Northstar_colour_digital_%282%29.png?1706702222"
  },
  {
    "id": "moonbeam",
    "symbol": "glmr",
    "name": "Moonbeam",
    "image": "/22459/large/Moonbeam_GLMR_ICON.png?1716647586"
  },
  {
    "id": "cronos-bridged-usdt-cronos",
    "symbol": "usdt",
    "name": "Cronos Bridged USDT (Cronos)",
    "image": "/35025/large/USDT.png?1707233700"
  },
  {
    "id": "tokenlon",
    "symbol": "lon",
    "name": "Tokenlon",
    "image": "/13454/large/lon_logo.png?1696513217"
  },
  {
    "id": "gama-coin",
    "symbol": "gama",
    "name": "GAMA Coin",
    "image": "/51308/large/Gama_Icon_%281%29.png?1730628523"
  },
  {
    "id": "iagon",
    "symbol": "iag",
    "name": "Iagon",
    "image": "/3264/large/d8c5hLbX9u0GwYCKcZRbXS2vAQ0Vd-Hfjg-3zQ73ucSZQoFYsLH4NEKN8EQkwwBVR8OPJgrTRG-_dW_XVHL058ezYSvwsSB4bjYtHH7xjZNHBaAaX1NZl7axG8zm2FIRV6AUmgdmxcbP0BcuWvUJkcUKrYYEDf0Msx2_3arxgmS1V85YMb_1SVbWt6E3QnkpvLcGyC0SxN6rGTr.jpg?1696503977"
  },
  {
    "id": "zentry",
    "symbol": "zent",
    "name": "Zentry",
    "image": "/36979/large/Zentry-rebrand-Primary_200px.png?1713743277"
  },
  {
    "id": "bitmart-token",
    "symbol": "bmx",
    "name": "BitMart",
    "image": "/5236/large/bitmart-token.png?1696505741"
  },
  {
    "id": "temple",
    "symbol": "temple",
    "name": "TempleDAO",
    "image": "/20040/large/LPK15ZOW_400x400.jpg?1696519459"
  },
  {
    "id": "astherus-staked-bnb",
    "symbol": "asbnb",
    "name": "Astherus Staked BNB",
    "image": "/54129/large/asBNB_logo_%28200x200%29.png?1738393597"
  },
  {
    "id": "iostoken",
    "symbol": "iost",
    "name": "IOST",
    "image": "/2523/large/IOST.png?1696503337"
  },
  {
    "id": "qubic-network",
    "symbol": "qubic",
    "name": "Qubic",
    "image": "/32949/large/QubicLogo-Token.png?1731185925"
  },
  {
    "id": "frax-usd",
    "symbol": "frxusd",
    "name": "Frax USD",
    "image": "/53963/large/frxUSD.png?1737792154"
  },
  {
    "id": "request-network",
    "symbol": "req",
    "name": "Request",
    "image": "/1031/large/Request_icon_green.png?1696502140"
  },
  {
    "id": "dkargo",
    "symbol": "dka",
    "name": "dKargo",
    "image": "/11875/large/DKA_ticker.png?1732553189"
  },
  {
    "id": "wax",
    "symbol": "waxp",
    "name": "WAX",
    "image": "/1372/large/WAX_Coin_Tickers_P_512px.png?1696502430"
  },
  {
    "id": "chromaway",
    "symbol": "chr",
    "name": "Chromia",
    "image": "/5000/large/Chromia.png?1696505533"
  },
  {
    "id": "ong",
    "symbol": "ong",
    "name": "Ontology Gas",
    "image": "/5716/large/ONG_logo.png?1696506172"
  },
  {
    "id": "tensor",
    "symbol": "tnsr",
    "name": "Tensor",
    "image": "/35972/large/tnsr.png?1712687367"
  },
  {
    "id": "big-time",
    "symbol": "bigtime",
    "name": "Big Time",
    "image": "/32251/large/-6136155493475923781_121.jpg?1696998691"
  },
  {
    "id": "orca",
    "symbol": "orca",
    "name": "Orca",
    "image": "/17547/large/Orca_Logo.png?1696517083"
  },
  {
    "id": "sbtc-2",
    "symbol": "sbtc",
    "name": "sBTC",
    "image": "/54285/large/sbtc-logo-orange-bg-white-circle-1000px_2.png?1739000556"
  },
  {
    "id": "venice-token",
    "symbol": "vvv",
    "name": "Venice Token",
    "image": "/54023/large/Venice_Token_%281%29.png?1738017546"
  },
  {
    "id": "iexec-rlc",
    "symbol": "rlc",
    "name": "iExec RLC",
    "image": "/646/large/pL1VuXm.png?1696501840"
  },
  {
    "id": "avalon-2",
    "symbol": "avl",
    "name": "Avalon",
    "image": "/54119/large/AV.png?1738314011"
  },
  {
    "id": "ai-rig-complex",
    "symbol": "arc",
    "name": "AI Rig Complex",
    "image": "/52701/large/u312bPNA_400x400.jpg?1734044765"
  },
  {
    "id": "marlin",
    "symbol": "pond",
    "name": "Marlin",
    "image": "/8903/large/200x200.png?1706115827"
  },
  {
    "id": "mass-vehicle-ledger",
    "symbol": "mvl",
    "name": "MVL",
    "image": "/3476/large/CoinGecko.png?1711620384"
  },
  {
    "id": "usdt0",
    "symbol": "usdt0",
    "name": "USDT0",
    "image": "/53705/large/usdt0.jpg?1737086183"
  },
  {
    "id": "metfi-2",
    "symbol": "metfi",
    "name": "MetFi",
    "image": "/29676/large/logo-200.png?1696528611"
  },
  {
    "id": "blast",
    "symbol": "blast",
    "name": "Blast",
    "image": "/35494/large/Blast.jpg?1719385662"
  },
  {
    "id": "ampleforth",
    "symbol": "ampl",
    "name": "Ampleforth",
    "image": "/4708/large/Ampleforth.png?1696505273"
  },
  {
    "id": "paal-ai",
    "symbol": "paal",
    "name": "PAAL AI",
    "image": "/30815/large/Paal_New_Logo_%281%29.png?1718160584"
  },
  {
    "id": "clearpool",
    "symbol": "cpool",
    "name": "Clearpool",
    "image": "/19252/large/photo_2022-08-31_12.45.02.jpeg?1696518697"
  },
  {
    "id": "coreum",
    "symbol": "coreum",
    "name": "Coreum",
    "image": "/24169/large/Coreum-Icon_%282%29.png?1738317497"
  },
  {
    "id": "myshell",
    "symbol": "shell",
    "name": "MyShell",
    "image": "/54374/large/myshell.jpg?1739428226"
  },
  {
    "id": "paxos-standard",
    "symbol": "usdp",
    "name": "Pax Dollar",
    "image": "/6013/large/Pax_Dollar.png?1696506427"
  },
  {
    "id": "huobi-token",
    "symbol": "ht",
    "name": "Huobi",
    "image": "/2822/large/huobi-token-logo.png?1696503584"
  },
  {
    "id": "sonic-svm",
    "symbol": "sonic",
    "name": "Sonic SVM",
    "image": "/53061/large/Token.png?1735169618"
  },
  {
    "id": "syrupusdc",
    "symbol": "syrupusdc",
    "name": "SyrupUSDC",
    "image": "/54658/large/syrup_logo-_200x200.jpg?1740895597"
  },
  {
    "id": "hashkey-ecopoints",
    "symbol": "hsk",
    "name": "HashKey Platform Token",
    "image": "/29779/large/HSKlogo.jpg?1719445510"
  },
  {
    "id": "radix",
    "symbol": "xrd",
    "name": "Radix",
    "image": "/4374/large/6266da240f9ff5b6237a154c_Radix-Icon-256x256.png?1719376420"
  },
  {
    "id": "civic",
    "symbol": "cvc",
    "name": "Civic",
    "image": "/788/large/civic-orange.png?1696501939"
  },
  {
    "id": "taiko",
    "symbol": "taiko",
    "name": "Taiko",
    "image": "/38058/large/icon.png?1717626867"
  },
  {
    "id": "verge",
    "symbol": "xvg",
    "name": "Verge",
    "image": "/203/large/Verge_Coin_%28native%29_icon_200x200.jpg?1699220755"
  },
  {
    "id": "bitdca",
    "symbol": "bdca",
    "name": "BitDCA",
    "image": "/54590/large/bdca_logo_transparent200x200.png?1740562139"
  },
  {
    "id": "stratis",
    "symbol": "strax",
    "name": "Stratis",
    "image": "/531/large/stratis.png?1696501751"
  },
  {
    "id": "arcblock",
    "symbol": "abt",
    "name": "Arcblock",
    "image": "/2341/large/arcblock.png?1696503220"
  },
  {
    "id": "pundi-x-2",
    "symbol": "pundix",
    "name": "Pundi X",
    "image": "/14571/large/vDyefsXq_400x400.jpg?1696514252"
  },
  {
    "id": "pixer-eternity",
    "symbol": "pxt",
    "name": "Pixer Eternity",
    "image": "/31989/large/PXT.png?1696530791"
  },
  {
    "id": "puff-the-dragon",
    "symbol": "puff",
    "name": "Puff The Dragon",
    "image": "/35950/large/photo_2024-03-11_10.18.27.jpeg?1710240090"
  }
].map(r => ({
  ...r,
  image: `https://coin-images.coingecko.com/coins/images${r.image}`
}))


// 导出默认的加密货币列表（可以是前12个或其他数量）
export const DEFAULT_CRYPTOCURRENCIE_IDS = ["bitcoin", "ethereum", "solana", "binancecoin", "dogecoin", "pi-network"]
export const DEFAULT_CRYPTOCURRENCIES = TOP_CRYPTOCURRENCIES.filter(crypto => DEFAULT_CRYPTOCURRENCIE_IDS.includes(crypto.id))

export function getTopNCryptos(n: number, excludeIds?: string[]): CryptoCurrency[] {
  return TOP_CRYPTOCURRENCIES.filter(crypto => !STABLE_COINS.includes(crypto.id) && !excludeIds?.includes(crypto.id)).slice(0, n);
}

// 按ID查找加密货币
export function getCryptocurrencyById(id: string): CryptoCurrency | undefined {
  return TOP_CRYPTOCURRENCIES.find(crypto => crypto.id === id);
}

// 按符号查找加密货币
export function getCryptocurrencyBySymbol(symbol: string): CryptoCurrency | undefined {
  return TOP_CRYPTOCURRENCIES.find(crypto => crypto.symbol === symbol.toUpperCase());
}

export default TOP_CRYPTOCURRENCIES; 
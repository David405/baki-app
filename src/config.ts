export const config: any = {
  vaultAddress: "0x4f419B3BCF37Ff8BAe4Db159b74fFC863e3DF2fb",
  faucetAddress: "0xBD1807f49468Dd55db7765e2fb901920F9c174C9",
  zUSD: "0x6FA3799DA3dC375c9d44255f7C817BC737c2150E",
  zNGN: "0x96C56eD50CA4cBfEea11FEc307FFDA5080454C2e",
  zZAR: "0x312AE91cef504226edddA8364A08DaB207aa6Fcd",
  zCFA: "0x3C790049BFAF24BbE1da29E6C5c56E25C1Af9FCA",
  USDC: "0x15857C5368F3b6cC64A62e9193A6c9D642a7f170",

  networks: [
    {
      chainId: `0x${Number(43113).toString(16)}`,
      rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
      name: "Avalanche",
      nativeCurrency: {
        name: "AVAX",
        symbol: "AVAX",
        decimals: 18,
      },
      blockExplorerUrls: ["https://explorer.avax.network/"],
    },
    // {
    //   chainId: `0x${Number(44787).toString(16)}`,
    //   rpcUrls: ["https://alfajores-forno.celo-testnet.org/"],
    //   name: "Celo",
    //   nativeCurrency: {
    //     name: "CELO",
    //     symbol: "CELO",
    //     decimals: 18,
    //   },
    //   blockExplorerUrls: ["https://alfajoresblockscout.celo-testnet.org"],
    // },
  ],
  exchangeRatesAPIKEY: "DARFb80BUBixEzeCe6fgq5JouZR6QuSq",
  coinlayerAPIKEY: "49505e855f2ab02b59638b6895755f23",
};

export const config: any = {
  vaultAddress: "0x1122dc9FfE1391FeaA98A4eBA52661dDE6111A49",
  zUSD: "0x0C0d84Bc9Af6C4A2Cc75406376538e2B6f0A39d8",
  zNGN: "0x19E66c04907a2BF819CBD08261a78f7e28930545",
  zZAR: "0xD454128E7572aFd38577B5ea97c06244Cda768B6",
  zCFA: "0x9153B86Af4d5C8b554Aa36b2660f257045a34B4d",
  USDC: "0x2aC77d3c40C49D88c7fFc20BC0584A496E495786",

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

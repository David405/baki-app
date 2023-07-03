export const config: any = {
  vaultAddress: "0xB7Bec997244AB148B2C200c6c6a645c73A3C47Be",
  oracleAddress: "0x58f50611d98cbD27202e6F8ee133c866Ef8386d5",
  faucetAddress: "0xaDF6b980f5cdd81fCf4D67061ce9f93D2010Df17",
  zUSD: "0x35148be39035456aD5073E8d2836fc5d1af5fe71",
  zNGN: "0x74286f069Cb2FF6B2176c3016C5f9E54c69Cbf77",
  zZAR: "0x7dc93f303335D2220094fa34e14D1A322b6B266e",
  zCFA: "0x17036a347f7AFf9BAd1b21266d33889EeDf66C28",
  USDC: "0x3313cECA9753d5abAff9743D5E35b1783C79D08B",

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
  ],
  exchangeRatesAPIKEY: "X2zkqxHTJploZTApTgHFjbJjARZF09wO",
  coinlayerAPIKEY: "49505e855f2ab02b59638b6895755f23",
};

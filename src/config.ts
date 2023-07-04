export const config: any = {
  vaultAddress: "0x158855D3CA96D7a51601B2167FA1D322F8cC7c0e",
  oracleAddress: "0x890e894077fB3860374E51A4c86c4358ec24C327",
  faucetAddress: "0xaDF6b980f5cdd81fCf4D67061ce9f93D2010Df17",
  zUSD: "0x8271A38dF6aE0F191787466ab7AEa1bb1a177152",
  zNGN: "0xc50259E080C2Db8625c46e92Bde21dc1A618E2Ed",
  zZAR: "0x4368b6339926c6B2AbB49532A24cDee9B1d05f39",
  zCFA: "0xCAcAF881fcCF6A2455cDFdeDa26174a8b6C1ADf6",
  USDC: "0x0E57b62ABe5873c0eF25d576C3a098d872102330",

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

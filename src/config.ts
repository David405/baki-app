export const config: any = {
  vaultAddress: "0x3ab5E7a3466d0e5B556e0005D705cbC3ADc34767",
  oracleAddress: "0x24FDFFEa92bcED86cB2e93B82915479b8675FC17",
  faucetAddress: "0x64C10D91886ffeC3bc15bA8C6A19A24012A260Df",
  zUSD: "0x985cF17100E8f9839d5D4fE2f910CFaDA230fF51",
  zNGN: "0x8da29a5C650e87cf111a83686Ef47E45987b3d27",
  zZAR: "0xd9F0d372e2A2189c355381BDAA38B2391B37Faf2",
  zCFA: "0xa9C24b74Bd8332a374fb0278A308b52A1432BaD1",
  USDC: "0xF4b95520519894CFbffCE3A36532090f292812B5",

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

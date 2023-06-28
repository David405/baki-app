export const config: any = {
  vaultAddress: "0xBB293840BE6df378B5bb38699cb8e299C56e6546",
  oracleAddress: "0x50604DAf4522DAFe6Da374b7850095C1cF46fa26",
  faucetAddress: "0xaDF6b980f5cdd81fCf4D67061ce9f93D2010Df17",
  zUSD: "0x58D1662BA609A972c2F6118FB7E3EcfFC0cbAC09",
  zNGN: "0xea4491A6aB9fe6086aa531f5dEa201F186c51492",
  zZAR: "0xBAB85eaeeC8FA4120Dae17dA2CFa4b168a9Ee3e6",
  zCFA: "0x988A906f6ec3570a5D5Bfdd8EF27c5c18FAB9264",
  USDC: "0x94572aEa83a964fBd96B9753ce501998b528149a",

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

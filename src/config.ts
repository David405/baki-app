export const config: any = {
  vaultAddress: "0x0E9F4bb05cdf0Caa321F94A07a0Ac6a6fd9D1121",
  oracleAddress: "0xF06FC4cf9DE964B89dFf3EFF0429a5415B2972df",
  faucetAddress: "0xaDF6b980f5cdd81fCf4D67061ce9f93D2010Df17",
  zUSD: "0x31CE708577376a3D9bf5FB84981F2E6A7b7E6Bbb",
  zNGN: "0x3cB8d803a70952462Ce86A918AA3c44164F76880",
  zZAR: "0x3C780313BD616b8Aa84f944ae616DcF434c2d650",
  zCFA: "0xF39775cAd563491bb21CB713412278B6A7eB055a",
  USDC: "0xb7FA9797530CeB76A68a6bFcb3D5219047DB1FE4",

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

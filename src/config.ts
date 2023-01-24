export const config: any = {
  vaultAddress: "0xD634fFBC922C26aD5A1A48c3711Bbd502E25da64",
  faucetAddress: "0xBD1807f49468Dd55db7765e2fb901920F9c174C9",
  zUSD: "0x35C7ac29bCaeC5e6651512BF45785b2c35b8E701",
  zNGN: "0xf0b04261a85fE02f51f3f0AF96C10B1C46C594Ef",
  zZAR: "0xE0f406b0018B2b291A4F2b6eDf647DeEf2c261E2",
  zCFA: "0x08F279ead0FdBE1b02d53fcaC965b2e8E28c050c",
  USDC: "0x1F78737F3379CD2d970E0f7A485C02E05b81A472",

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

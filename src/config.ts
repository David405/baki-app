export const config: any = {
  vaultAddress: "0x4f419B3BCF37Ff8BAe4Db159b74fFC863e3DF2fb",
  faucetAddress: "0xBD1807f49468Dd55db7765e2fb901920F9c174C9",
  zUSD: "0xFc95F2FAC0C98690E1cB6b393FdA17734Abd3759",
  zNGN: "0x48cf9e41ee0E3C3fc13Eac34B68Fb840C9e9d52C",
  zZAR: "0xD771AC458c4844f19066E6487C54F5f9887cd931",
  zCFA: "0x27329241Fc8E1a316d1E7257Ef3536C25582caF1",
  USDC: "0x24A7AEcE652Ef97f2A0488e15BC5aCD2E82BeeC8",

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

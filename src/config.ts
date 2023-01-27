export const config: any = {
  vaultAddress: "0x02F5758d30db0B9eB07ff48b649Ba195883600AC",
  faucetAddress: "0xe0B55Fb73e0DC0a4502e36eaB1aA7106a290aC05",
  zUSD: "0xaff7bbd74BD0c7db7AC7f7a53e82d637508E3a09",
  zNGN: "0x7F4252d33b0d757E52443aba3506a5437660421A",
  zZAR: "0xD846A131bAfd07CE43a768969d16528cA3b1C62e",
  zCFA: "0x430748F08EDCD97Dd8b11Cee900279Dffcf17e84",
  USDC: "0x6C4dB16EEE11f194EDb920563BE00Cbfb760037a",

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

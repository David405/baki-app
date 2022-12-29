export const config: any = {
  vaultAddress: "0xA9D80232bA1cBd665A556c2bA021ae57F958b191",
  faucetAddress: "0x577427dAFd864F1dDEFaa8Ac4d9E4CfE0DcF85A4",
  zUSD: "0xd869AcBcbE80eBd16588c7Fb38591aC215F00AB4",
  zNGN: "0xf966E0779652C94cE0D6C890CDC23fCE412A731d",
  zCFA: "0x38448b150be9F52ac6382f506F7E23e8fEE12Aac",
  zZAR: "0x35daEe44deA489D4ACb34319c101ba9F7ba68e91",
  cUSD: "0x206a6162b8ED9Db0568aE44C2525629c54b2B33a",
  USDC: "0x206a6162b8ED9Db0568aE44C2525629c54b2B33a",

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
  exchangeRatesAPIKEY: "RPGQctIVDY8a27eDUSB3i8BU4qGdqqMM",
  coinlayerAPIKEY: "49505e855f2ab02b59638b6895755f23",
};

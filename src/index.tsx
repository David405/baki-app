import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CeloProvider, SupportedProviders } from "@celo/react-celo";
import "@celo/react-celo/lib/styles.css";
import icon from "./assets/logo.png";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CeloProvider
      dapp={{
        icon: "http://localhost:3000/logo.png",
        name: "Baki",
        description:
          "Baki is an infinite liquidity FX exchange, built on @CeloOrg providing the first on-chain implementation of African stable coins.",
        url: "https://baki.jollof.fi",
      }}
      networks={[
        {
          name: "Avalanche",
          chainId: 43113,
          graphQl: "https://alfajores-blockscout.celo-testnet.org/graphiql",
          rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
          explorer: "https://explorer.avax.network/",
        },
        {
          name: "Celo",
          rpcUrl: "https://alfajores-forno.celo-testnet.org",
          graphQl: "https://alfajores-blockscout.celo-testnet.org/graphiql",
          explorer: "https://alfajores-blockscout.celo-testnet.org",
          chainId: 44787,
        },
      ]}
      network={{
        name: "Celo",
        rpcUrl: "https://alfajores-forno.celo-testnet.org",
        graphQl: "https://alfajores-blockscout.celo-testnet.org/graphiql",
        explorer: "https://alfajores-blockscout.celo-testnet.org",
        chainId: 44787,
      }}
      connectModal={{
        // This options changes the title of the modal and can be either a string or a react element
        title: <span>Connect your Wallet</span>,
        providersOptions: {
          // This option hides specific wallets from the default list
          hideFromDefaults: [
            SupportedProviders.PrivateKey,
            SupportedProviders.Omni,
            SupportedProviders.CoinbaseWallet,
          ],

          // This option toggles on and off the searchbar
          searchable: true,
        },
      }}
    >
      <App />
    </CeloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

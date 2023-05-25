import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { WagmiConfig, createConfig } from "wagmi";
import { avalanche, avalancheFuji } from "wagmi/chains";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
const chains = [avalancheFuji, avalanche];
const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    infuraId: "edb0ba7e47924fa8befefcb905e768d4", // or infuraId
    walletConnectProjectId: "753c09ecc1921f88eca50236e1c611e2",

    // Required
    appName: "Baki",

    // Optional
    appDescription:
      "The infinite liquidity FX exchange for african stablecoins",
    appUrl: "https://baki.exchange",
    chains,
  })
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiConfig config={config}>
        <ConnectKitProvider>
          <App />
        </ConnectKitProvider>
      </WagmiConfig>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

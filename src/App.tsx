/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Swap from "./pages/App/Swap/Swap";
import Mint from "./pages/App/Mint/Mint";
import Transactions from "./pages/App/Transactions/Transactions";
import Liquidation from "./pages/App/Liquidation/Liquidation";
import Error from "./pages/Error/Error";
import { ToastContainer } from "react-toastify";
import Page404 from "./pages/Page404/Page404";
import Faucet from "./pages/App/Faucet/Faucet";
import NoChain from "./pages/NoBlockchain/NoChain";

declare const window: any;

function App() {
  if (!window.ethereum) {
    return <NoChain />;
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/app" element={<AppHome />} /> */}
        <Route path="/mint" element={<Mint />} />
        <Route path="/faucet" element={<Faucet />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/liquidation" element={<Liquidation />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;

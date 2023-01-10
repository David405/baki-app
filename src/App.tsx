/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
// import AppHome from "./pages/App/Home/Home";
import Swap from "./pages/App/Swap/Swap";
import Mint from "./pages/App/Mint/Mint";
import Transactions from "./pages/App/Transactions/Transactions";
import Liquidation from "./pages/App/Liquidation/Liquidation";
import { ToastContainer } from "react-toastify";
import useData from "./hooks/useData";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/app" element={<AppHome />} /> */}
        <Route path="/mint" element={<Mint />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/liquidation" element={<Liquidation />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;

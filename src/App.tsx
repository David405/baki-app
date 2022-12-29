import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
// import AppHome from "./pages/App/Home/Home";
import Swap from "./pages/App/Swap/Swap";
import Mint from "./pages/App/Mint/Mint";
import Transactions from "./pages/App/Transactions/Transactions";
import Liquidation from "./pages/App/Liquidation/Liquidation";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/app" element={<AppHome />} /> */}
        <Route path="/app" element={<Mint />} />
        <Route path="/app/swap" element={<Swap />} />
        <Route path="/app/liquidation" element={<Liquidation />} />
        <Route path="/app/transactions" element={<Transactions />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;

import { useState } from "react";
import useFaucet from "../../../hooks/useFaucet";
import loader from "../../../assets/loader/loader.gif";
import "./Faucet.css";
import baki from "../../../assets/baki.png";

function Faucet() {
  const { getUSDC, _address, setAddress, myWallet } = useFaucet();
  const [loading, setLoading] = useState<boolean>(false);

  const handleAction = async () => {
    setLoading(true);
    await getUSDC();
    setLoading(false);
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-red-100">
      <img src={baki} alt="" className="mb-6" />
      <div className="shadow-md rounded-lg p-2  bg-white box">
        <div className="flex justify-between">
          <p className="h1">Request Test USDC</p>
          <button
            onClick={myWallet}
            style={{
              backgroundColor: "#fb5f33",
              padding: 10,
              borderRadius: 5,
              color: "white",
            }}
          >
            My Wallet
          </button>
        </div>
        <div className="border-2 p-2 rounded-lg mt-5">
          <input
            value={_address}
            className="w-full focus:outline-none"
            type="text"
            placeholder="Enter wallet Address"
            onChange={e => setAddress(e.target.value)}
          />
        </div>

        {_address && (
          <button className="mint-btn" onClick={handleAction}>
            {loading && (
              <img
                src={loader}
                style={{
                  height: "40px",
                }}
                alt="Loader"
              />
            )}
            Request
          </button>
        )}
      </div>

      <div className="p-6 mt-5">
        <a href="/mint">Go to App 🔥</a>
      </div>
    </div>
  );
}

export default Faucet;

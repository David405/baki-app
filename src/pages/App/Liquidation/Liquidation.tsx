import { useSelector } from "react-redux";
import useLiquidations from "../../../hooks/useLiquidations";
import MainLayout from "../../../layouts/MainLayout";
import empty from "../../../assets/empty.png";
import loader from "../../../assets/loader/loader.gif";
import { toast } from "react-toastify";
import "./Liquidation.css";
import { useState } from "react";
declare const window: any;
function Liquidation() {
  const { liquidateNow } = useLiquidations();
  const [loading, setLoading] = useState<boolean>(false);
  const { liquidations, liquidLoading } = useSelector(
    (state: any) => state.baki
  );

  const handleLiquidate = async (_address: string) => {
    setLoading(true);
    const result = await liquidateNow(_address);
    if (result) {
      setLoading(false);
      toast.success("Liquidation Successful !!");
      window.location.reload();
    } else {
      setLoading(false);
      toast.error("Liquidation Failed !!");
    }
  };

  return (
    <MainLayout>
      <div className="liquidation">
        <div className="li-header">
          <p className="font-bold">Liquidations</p>
        </div>
        <div className="li-table-box">
          <div className="li-table-row li-table-head">
            <div className="li-table-cell">
              <p>Owner</p>
            </div>
            <div className="li-table-cell">
              <p>Potential Rewards</p>
            </div>
            <div className="li-table-cell">
              <p>Required zUSD</p>
            </div>

            <div className="li-table-cell">
              <p>Action</p>
            </div>
          </div>
          {!liquidations?.length && !liquidLoading && (
            <div className="transactions-no">
              <img src={empty} alt="" />
              <p>No liquidations were found !!</p>
            </div>
          )}
          {liquidLoading && (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Loading ...
            </div>
          )}
          {!liquidLoading &&
            liquidations?.map((liquidation: any, index: number) => (
              <div className="li-table-row" key={index}>
                <div className="li-table-cell">
                  <p>
                    {liquidation.address?.slice(0, 5)}...{" "}
                    {liquidation.address?.slice(35, 50)}
                  </p>
                </div>
                <div className="li-table-cell">
                  <p>
                    {liquidation.reward?.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                    <span className="ml-1"> zUSD</span>
                  </p>
                </div>
                <div className="li-table-cell">
                  <p>
                    {liquidation.requiredZUSD?.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                    <span className="ml-1"> zUSD</span>
                  </p>
                </div>

                <div className="li-table-cell">
                  <button
                    className="liquidate bg-dark-orange p-2 rounded text-white "
                    onClick={() => handleLiquidate(liquidation?.address)}
                  >
                    {loading ? (
                      <img
                        src={loader}
                        style={{
                          height: "40px",
                        }}
                        alt="Loader"
                      />
                    ) : (
                      "Liquidate"
                    )}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default Liquidation;

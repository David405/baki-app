import { useSelector } from "react-redux";
import useLiquidations from "../../../hooks/useLiquidations";
import MainLayout from "../../../layouts/MainLayout";
import empty from "../../../assets/empty.png";

import "./Liquidation.css";
function Liquidation() {
  const { liquidateNow } = useLiquidations();
  const { liquidations, liquidLoading } = useSelector(
    (state: any) => state.baki
  );

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
              <p>Action</p>
            </div>
          </div>
          {!liquidations?.length && !liquidLoading && (
            <div className="transactions-no">
              <img src={empty} alt="" />
              <p>No liquidations were found !!</p>
            </div>
          )}
          {liquidLoading && <div>Loading ...</div>}
          {liquidations?.map((liquidation: any, index: number) => (
            <div className="li-table-row" key={index}>
              <div className="li-table-cell">
                <p>
                  {liquidation.address?.slice(0, 5)}...{" "}
                  {liquidation.address?.slice(35, 50)}
                </p>
              </div>
              <div className="li-table-cell">
                <p>
                  {liquidation.value?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                  zUSD
                </p>
              </div>

              <div className="li-table-cell">
                <button
                  className="liquidate bg-dark-orange p-2 rounded text-white "
                  onClick={() => liquidateNow(liquidation?.address)}
                >
                  Liquidate
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

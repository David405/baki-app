import MainLayout from "../../../layouts/MainLayout";
import "./Liquidation.css";
function Liquidation() {
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
              <p>Collateral</p>
            </div>
            <div className="li-table-cell">
              <p>Debt</p>
            </div>
            <div className="li-table-cell">
              <p>Coll Ration</p>
            </div>
            <div className="li-table-cell">
              <p>Action</p>
            </div>
          </div>

          <div className="li-table-row">
            <div className="li-table-cell">
              <p>
                {"0xdkekjkjwy677iug2iw9asjhgasjhgtw8jka6dsd".slice(0, 5)}...{" "}
                {"0xdkekjkjwy677iug2iw9asjhgasjhgtw8jka6dsd".slice(35, 50)}
              </p>
            </div>
            <div className="li-table-cell">
              <p>
                {0.0?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{" "}
                USDC
              </p>
            </div>
            <div className="li-table-cell">
              <div className="sub-detail">
                <p className="text-font-grey">TSD</p>
                <p>
                  {Number(74647676)?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
            <div className="li-table-cell">
              <div className="sub-detail">
                <p className="text-font-grey">TSD</p>
                <p>
                  {Number(10)?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                  %
                </p>
              </div>
            </div>
            <div className="li-table-cell">
              <button className="liquidate bg-dark-orange p-2 rounded text-white ">
                Liquidate
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Liquidation;

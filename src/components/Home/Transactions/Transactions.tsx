/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import "./Transactions.css";
import empty from "../../../assets/empty.png";

import { useSelector } from "react-redux";
function Transactiions() {
  const { transactions, address } = useSelector((state: any) => state.baki);

  return (
    <div className="transactions">
      <div className="table-box">
        <p className="recent-transactions">Recent Transactions</p>

        <div className="table-row table-head">
          <div className="table-cell">
            <p>Action</p>
          </div>
          <div className="table-cell">
            <p>STATUS</p>
          </div>
          <div className="table-cell">
            <p>DATE</p>
          </div>
          <div className="table-cell">
            <p>ACTION</p>
          </div>
        </div>

        {!transactions[address]?.length && (
          <>
            <img
              style={{
                marginLeft: "45%",
                width: 83,
                height: 90,
              }}
              src="/images/empty.png"
              alt=""
            />
            <div className="transactions-no">
              <p className="text">You have no recent transaction !!</p>
            </div>
          </>
        )}
        {transactions[address]?.map((transaction: any, index: number) => (
          <div
            className="table-row"
            key={index}
            style={{
              borderBottom:
                index === transactions[address].length - 1
                  ? "none"
                  : "1px solid #ccc",
            }}
          >
            <div className="table-cell">
              {transaction.action === "Deposit" && (
                <p>{`Deposited ${transaction.depositBody.colAmount.toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 2,
                  }
                )} USDC and Minted ${transaction.depositBody.mintAmount.toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 2,
                  }
                )} zUSD`}</p>
              )}
              {transaction.action === "Swap" && (
                <p>{`Swap ${transaction.swapBody.fromAmount.toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 2,
                  }
                )}  ${
                  transaction.swapBody.fromCurrency
                } for ${transaction.swapBody.toAmount.toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 2,
                  }
                )} ${transaction.swapBody.toCurrency}`}</p>
              )}
              {transaction.action === "Reward" && (
                <p>{`${transaction.rewardBody.amount.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })} zUSD  Claimed in Rewards`}</p>
              )}
              {transaction.action === "Withdraw" && (
                <p>{`Repaid ${transaction.repayBody.repayAmount.toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 2,
                  }
                )} ${
                  transaction.repayBody.repayCurrency
                } and Withdrawn ${transaction.repayBody.withdrawAmount.toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 2,
                  }
                )} USDC`}</p>
              )}
            </div>
            <div className="table-cell">
              <p
                style={{
                  color: transaction.status === "Successful" ? "green" : "red",
                }}
              >
                {transaction.status}
              </p>
            </div>
            <div className="table-cell">
              <p>{transaction.date}</p>
            </div>
            <div className="table-cell">
              {transaction.hash && (
                <a
                  href={
                    transaction.hash
                      ? `https://testnet.snowtrace.io/tx/${transaction.hash}`
                      : "/mint"
                  }
                  target={transaction.hash && "_blank"}
                >
                  view transaction
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactiions;

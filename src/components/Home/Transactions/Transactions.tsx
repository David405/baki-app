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
      <div className="flex justify-between">
        <p className="font-bold">Activity</p>
      </div>
      <div className="table-box">
        <div className="table-row table-head">
          <div className="table-cell">
            <p>Action</p>
          </div>
          <div className="table-cell">
            <p>Status</p>
          </div>
          <div className="table-cell">
            <p>View Transaction</p>
          </div>
        </div>
        {!transactions[address]?.length && (
          <div className="transactions-no">
            <img src={empty} alt="" />
            <p>No transactions were found !!</p>
          </div>
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
              {transaction.hash && (
                <a
                  href={
                    transaction.hash
                      ? `https://testnet.snowtrace.io/tx/${transaction.hash}`
                      : "/mint"
                  }
                  target={transaction.hash && "_blank"}
                >
                  View on explorer
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

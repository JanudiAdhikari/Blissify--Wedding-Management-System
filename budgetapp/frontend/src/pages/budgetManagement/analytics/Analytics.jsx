import React from "react";
import { Container, Row } from "react-bootstrap";
import CircularProgressBar from "../../../components/CircularProgressBar";
import LineProgressBar from "../../../components/LineProgressBar";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MoneyIcon from "@mui/icons-material/Money";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Analytics = ({ transactions }) => {
    if (!transactions) {
        return <div>Loading...</div>;
      }
  const TotalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (item) => item.type === "Income"
  );
  const totalExpenseTransactions = transactions.filter(
    (item) => item.type === "Expense"
  );

  const totalIncomePercent =
    TotalTransactions !== 0
      ? (totalIncomeTransactions.length / TotalTransactions) * 100
      : 0;
  const totalExpensePercent =
    TotalTransactions !== 0
      ? (totalExpenseTransactions.length / TotalTransactions) * 100
      : 0;

  const totalTurnOver = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalTurnOverIncome = transactions
    .filter((item) => item.type === "Income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalTurnOverExpense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const TurnOverIncomePercent =
    totalTurnOver !== 0
      ? (totalTurnOverIncome / totalTurnOver) * 100
      : 0;
  const TurnOverExpensePercent =
    totalTurnOver !== 0
      ? (totalTurnOverExpense / totalTurnOver) * 100
      : 0;

  const categories = [
    "Vendors Commission",
    "Clients Fees",
    "Consultation Fees",
    "Advertising Revenue",
    "Affiliate Marketing",
    "Vendors Cost",
    "Insurance",
    "Maintenance",
    "Taxes",
    "Marketing",
    "Other",
  ];

  const colors = {
    VendorsCommission: "#FF6384",
    ClientsFees: "#36A2EB",
    ConsultationFees: "#FFCE56",
    AdvertisingRevenue: "#4BC0C0",
    AffiliateMarketing: "#9966FF",
    VendorsCost: "#FF9F40",
    Insurance: "#8AC926",
    Maintenance: "#6A4C93",
    Taxes: "#1982C4",
    Marketing: "#1982C4",
    Other: "#F45B69",
  };

  return (
    <Container className="mt-5">
      <Row>
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header bg-black text-white">
              <span style={{ fontWeight: "bold" }}>Total Transactions:</span>{" "}
              {TotalTransactions}
            </div>
            <div className="card-body">
              <h5 className="card-title " style={{ color: "green" }}>
                Income: <ArrowDropUpIcon />
                {totalIncomeTransactions.length}
              </h5>
              <h5 className="card-title" style={{ color: "red" }}>
                Expense: <ArrowDropDownIcon />
                {totalExpenseTransactions.length}
              </h5>

              <div className="d-flex justify-content-center mt-3">
                <CircularProgressBar
                  percentage={totalIncomePercent.toFixed(0)}
                  color="green"
                />
              </div>

              <div className="d-flex justify-content-center mt-4 mb-2">
                <CircularProgressBar
                  percentage={totalExpensePercent.toFixed(0)}
                  color="red"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header bg-black text-white ">
              <span style={{ fontWeight: "bold" }}>Total TurnOver:</span>{" "}
              {totalTurnOver}
            </div>
            <div className="card-body">
              <h5 className="card-title" style={{ color: "green" }}>
                Income: <ArrowDropUpIcon /> {totalTurnOverIncome} <MoneyIcon />
              </h5>
              <h5 className="card-title" style={{ color: "red" }}>
                Expense: <ArrowDropDownIcon />
                {totalTurnOverExpense} <MoneyIcon />
              </h5>
              <div className="d-flex justify-content-center mt-3">
                <CircularProgressBar
                  percentage={TurnOverIncomePercent.toFixed(0)}
                  color="green"
                />
              </div>

              <div className="d-flex justify-content-center mt-4 mb-4">
                <CircularProgressBar
                  percentage={TurnOverExpensePercent.toFixed(0)}
                  color="red"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header bg-black text-white">
              <span style={{ fontWeight: "bold" }}>Categorywise Income</span>{" "}
            </div>
            <div className="card-body">
              {categories.map((category, index) => {
                const income = transactions
                  .filter(
                    (transaction) =>
                      transaction.type === "Income" &&
                      transaction.category === category
                  )
                  .reduce((acc, transaction) => acc + transaction.amount, 0);

                const incomePercent =
                  totalTurnOver !== 0
                    ? (income / totalTurnOver) * 100
                    : 0;

                return (
                  <React.Fragment key={index}>
                    {income > 0 && (
                      <LineProgressBar
                        label={category}
                        percentage={incomePercent.toFixed(0)}
                        lineColor={colors[category]}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header bg-black text-white">
              <span style={{ fontWeight: "bold" }}>Categorywise Expense</span>{" "}
            </div>
            <div className="card-body">
              {categories.map((category, index) => {
                const expenses = transactions
                  .filter(
                    (transaction) =>
                      transaction.type === "Expense" &&
                      transaction.category === category
                  )
                  .reduce((acc, transaction) => acc + transaction.amount, 0);

                const expensePercent =
                  totalTurnOver !== 0
                    ? (expenses / totalTurnOver) * 100
                    : 0;

                return (
                  <React.Fragment key={index}>
                    {expenses > 0 && (
                      <LineProgressBar
                        label={category}
                        percentage={expensePercent.toFixed(0)}
                        lineColor={colors[category]}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Analytics;

import React, { useEffect, useState } from "react";
import IncomeItems from "../incomes/IncomeItems";
import ExpenseForm from "./ExpenseForm";
import "./expenses.css";
import axios from "axios";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const addExpense = async (expense) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/addExpense",
        expense
      );
      getExpenses();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getExpenses");
      setExpenses(response.data);
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/deleteExpense/${id}`
      );
      getExpenses();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const calculateTotalExpenses = () => {
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense = totalExpense + expense.amount;
    });

    return totalExpense;
  };

  useEffect(() => {
    getExpenses();
  }, []);
  return (
    <div className="ExpenseStyled">
      <div className="innerStyle">
        <h1>Expenses</h1>
        <h2 className="total-expense">
          Total Expense: <span>LKR {calculateTotalExpenses()}</span>
        </h2>
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="expense-content">
            <div className="form-container">
              <ExpenseForm />
            </div>
            <div className="expenses">
              {expenses.map((expense) => {
                const {
                  _id,
                  title,
                  amount,
                  date,
                  category,
                  description,
                  type,
                } = expense;
                console.log(expense);
                return (
                  <IncomeItems
                    key={_id}
                    id={_id}
                    title={title}
                    description={description}
                    amount={amount}
                    date={date}
                    type={type}
                    category={category}
                    indicatorColor="red"
                    deleteItem={deleteExpense}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expenses;

import React, { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import "./incomesexpenses.css";
import axios from "axios";
import IncomeForm from "./IncomeForm";

const IncomesExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
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

  const addIncome = async (income) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/addIncome",
        income
      );
      getIncomes();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getIncomes");
      setIncomes(response.data);
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteIncome = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/deleteIncome/${id}`
      );
      getIncomes();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const calculateTotalIncome = () => {
    let total = 0;
    incomes.forEach((income) => {
      total += income.amount;
    });
    return total;
  };

  useEffect(() => {
    getExpenses();
    getIncomes();
  }, []);

  return (
    <div className="flex-container">
      <div className="innerStyleIncome">
        <h1>Incomes</h1>
        <h2 className="total-income">
          Total Income: <span>LKR {calculateTotalIncome()}</span>
        </h2>
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="income-content">
            <div className="form-container">
              <IncomeForm />
            </div>
          </div>
        )}
      </div>
      <div className="innerStyleExpense">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomesExpenses;

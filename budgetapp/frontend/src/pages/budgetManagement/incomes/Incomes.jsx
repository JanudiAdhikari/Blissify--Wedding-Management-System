import React, { useState, useEffect } from "react";
import axios from "axios";
import "./incomes.css";
import IncomeForm from "./IncomeForm";
import IncomeItems from "./IncomeItems";

const Incomes = () => {
  const [incomes, setIncomes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
    getIncomes();
  }, []);

  return (
    <div className="incomeStyle">
      <div className="innerStyle">
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
    </div>
  );
};

export default Incomes;

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../../components/Button/Button"
import axios from "axios";
import toast from "react-hot-toast";
import "./incomeform.css";
import { plus } from "../../../assets/budgetImages/budgetIcons";

const IncomeForm = () => {
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const [error, setError] = useState(null);

  const handleInput = name => e => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/addIncome", inputState);
      setInputState({
        title: "",
        amount: "",
        date: "",
        category: "",
        description: "",
      });
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}

      <div className="input-control">
        <input
          type="text"
          value={inputState.title}
          name="title"
          placeholder="Salary Title"
          onChange={handleInput("title")}
        />
      </div>

      <div className="input-control">
        <input
          value={inputState.amount}
          type="text"
          name="amount"
          placeholder="Salary Amount"
          onChange={handleInput("amount")}
        />
      </div>

      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Enter A Date"
          selected={inputState.date}
          dateFormat="dd/MM/yyyy"
          onChange={date => setInputState({ ...inputState, date })}
        />
      </div>

      <div className="selects input-control">
        <select
          required
          value={inputState.category}
          name="category"
          id="category"
          onChange={handleInput("category")}
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investments</option>
          <option value="stocks">Stocks</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bank">Bank Transfer</option>
          <option value="youtube">Youtube</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="input-control">
        <textarea
          name="description"
          value={inputState.description}
          placeholder="Add A Reference"
          id="description"
          cols="30"
          rows="4"
          onChange={handleInput("description")}
        ></textarea>
      </div>

      <div className="income-submit-btn">
        <Button
          name="Add Income"
          icon={plus}
          bPad=".8rem 1.6rem"
          bRad="30px"
          bg="#4d1c9c"
          color="#fff"
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
};

export default IncomeForm;

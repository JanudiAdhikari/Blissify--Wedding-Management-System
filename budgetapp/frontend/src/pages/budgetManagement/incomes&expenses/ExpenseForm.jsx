import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../../components/Button/Button";
import { plus } from "../../../assets/budgetImages/budgetIcons";
import "./expenseform.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";

const ExpenseForm = () => {
  const [error, setError] = useState(null);
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/addExpense", inputState);
      setInputState({
        title: "",
        amount: "",
        date: "",
        category: "",
        description: "",
      });
      // Show success toast message
      toast.success("Expense added successfully!");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="ExpenseFormStyled" onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <TextField
          type="text"
          value={inputState.title}
          name="title"
          id="title"
          label="Expense Title"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <TextField
          value={inputState.amount}
          type="text"
          name="amount"
          id="amount"
          label="Expense Amount"
          onChange={handleInput("amount")}
        />
      </div>
      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Enter A Date"
          selected={inputState.date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
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
            Select Expense Category
          </option>
          <option value="Vendors Cost">Vendors' Cost</option>
          <option value="Insurance">Insurance</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Taxes">Taxes</option>
          <option value="Marketing">Marketing</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <TextField
          name="description"
          value={inputState.description}
          label="Add A Reference"
          id="description"
          multiline
          rows={4}
          fullWidth
          onChange={handleInput("description")}
        />
      </div>
      <div className="submit-btn">
        <Button
          name={"Add Expense"}
          icon={plus}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"#4d1c9c"}
          color={"#fff"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ExpenseForm;

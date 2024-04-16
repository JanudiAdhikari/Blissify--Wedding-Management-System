import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { budgetDashboard, budgetBudget, budgetExpense, budgetIncome, budgetPackage, budgetAnaly, budgetLogout } from "../../../assets/budgetImages/budgetIcons";

const SideBar = () => {
  const menuItems = [
    {
      text: "Dashboard",
      icon: budgetDashboard,
      link: "/",
    },
    {
      text: "Budgets",
      icon: budgetBudget,
      link: "/displayBudgets",
    },
    {
      text: "Packages",
      icon: budgetPackage,
      link: "/",
    },
    {
      text: "Expenses",
      icon: budgetExpense,
      link: "/displayExpenses",
    },
    {
      text: "Incomes",
      icon: budgetIncome,
      link: "/displayIncomes",
    },
    {
      text: "Analytics",
      icon: budgetAnaly,
      link: "/",
    }
  ];

  const footerItems = [
    {
      text: "Logout",
      icon: budgetLogout,
      link: "/",
    },
  ];

  return (
    <div className="side-nav-container">
      <div className="nav-upper">
        <div className="nav-heading">
          <div className="nav-brand">
            <img src="./BudgetIcons/Logo.svg" alt="Logo" />
            <h2>Blissify</h2>
          </div>
        </div>
        <div className="nav-menu">
          {menuItems.map(({ text, icon, link }) => (
            <Link key={text} to={link} className="menu-item">
              <p className="menu-item-icon">{icon}</p>
              <p>{text}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="nav-menu">
        {footerItems.map(({ text, icon, link }) => (
          <Link key={text} to={link} className="menu-item">
            <p className="menu-item-icon">{icon}</p>
            <p>{text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import FMLayout from "./layouts/FMLayout";
import AddBudget from './pages/budgetManagement/addBudget/AddBudget';
import { GetBudget } from './pages/budgetManagement/getBudget/GetBudget';
import UpdateBudget from './pages/budgetManagement/updateBudget/UpdateBudget';
import DisplayBudgets from './pages/budgetManagement/displayBudgets/DisplayBudgets';
import BudgetDashboard from './pages/budgetManagement/budgetDashboard/BudgetDashboard';
import Incomes from './pages/budgetManagement/incomes/Incomes';
import Expenses from './pages/budgetManagement/expenses/Expenses';

function App() {
  return (
      <div className="App">
        <BrowserRouter>

        
          <FMLayout>
            <Routes>
              <Route path="/" element={<BudgetDashboard />} />
              <Route path="/displayBudgets" element={<DisplayBudgets />} />
              <Route path="/getBudget" element={<GetBudget />} />
              <Route path="/addBudget" element={<AddBudget />} />
              <Route path="/updateBudget/:id" element={<UpdateBudget />} />
              <Route path="/displayIncomes" element={<Incomes />} />
              <Route path="/displayExpenses" element={<Expenses />} />
            </Routes>
          </FMLayout>
          
        </BrowserRouter>
      </div>
  );
}

export default App;
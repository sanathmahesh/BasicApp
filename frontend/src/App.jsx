import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import ExpensesPage from './pages/ExpensesPage';
import AddExpensePage from './pages/AddExpensePage';
import EditExpensePage from './pages/EditExpensePage';
import BudgetSettingsPage from './pages/BudgetSettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="expenses/add" element={<AddExpensePage />} />
          <Route path="expenses/edit/:id" element={<EditExpensePage />} />
          <Route path="budgets" element={<BudgetSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

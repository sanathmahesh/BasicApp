import { useLocation } from 'react-router-dom';

const pageTitles = {
  '/': 'Dashboard',
  '/expenses': 'Expenses',
  '/expenses/add': 'Add Expense',
  '/budgets': 'Budget Settings',
};

export default function Navbar() {
  const location = useLocation();
  const isEditPage = location.pathname.startsWith('/expenses/edit/');
  const title = isEditPage ? 'Edit Expense' : (pageTitles[location.pathname] || 'Expense Tracker');

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </header>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from '../components/expense/ExpenseForm';
import { createExpense } from '../api/expenseApi';
import { ROUTES } from '../constants/routes';

export default function AddExpensePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      await createExpense(data);
      navigate(ROUTES.EXPENSES);
    } catch (err) {
      console.error('Failed to create expense:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => navigate(ROUTES.EXPENSES)}
        className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-flex items-center gap-1"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Expenses
      </button>
      <ExpenseForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}

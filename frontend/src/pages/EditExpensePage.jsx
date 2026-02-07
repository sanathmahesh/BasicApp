import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExpenseForm from '../components/expense/ExpenseForm';
import { getExpenseById, updateExpense } from '../api/expenseApi';
import { ROUTES } from '../constants/routes';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function EditExpensePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [expense, setExpense] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const { data } = await getExpenseById(id);
        setExpense({
          title: data.title,
          description: data.description || '',
          amount: data.amount,
          category: data.category,
          date: data.date,
        });
      } catch (err) {
        console.error('Failed to fetch expense:', err);
        navigate(ROUTES.EXPENSES);
      } finally {
        setIsFetching(false);
      }
    };
    fetchExpense();
  }, [id, navigate]);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      await updateExpense(id, data);
      navigate(ROUTES.EXPENSES);
    } catch (err) {
      console.error('Failed to update expense:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <LoadingSpinner />;

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
      {expense && (
        <ExpenseForm initialValues={expense} onSubmit={handleSubmit} isLoading={isLoading} />
      )}
    </div>
  );
}

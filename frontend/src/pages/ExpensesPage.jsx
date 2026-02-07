import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../hooks/useExpenses';
import ExpenseTable from '../components/expense/ExpenseTable';
import CategoryFilter from '../components/filters/CategoryFilter';
import DateRangeFilter from '../components/filters/DateRangeFilter';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { ROUTES } from '../constants/routes';

export default function ExpensesPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { expenses, loading, deleteExpense } = useExpenses({ category, startDate, endDate });

  const handleDelete = async () => {
    if (deleteTarget) {
      await deleteExpense(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <CategoryFilter selectedCategory={category} onChange={setCategory} />
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onChange={({ startDate: s, endDate: e }) => { setStartDate(s); setEndDate(e); }}
          />
        </div>
        <button
          onClick={() => navigate(ROUTES.ADD_EXPENSE)}
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors shrink-0"
        >
          + Add Expense
        </button>
      </div>

      <ExpenseTable
        expenses={expenses}
        onEdit={(id) => navigate(ROUTES.EDIT_EXPENSE(id))}
        onDelete={(expense) => setDeleteTarget(expense)}
        isLoading={loading}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Expense"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}

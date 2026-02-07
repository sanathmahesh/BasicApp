import { useState } from 'react';
import { useBudgets } from '../hooks/useBudgets';
import BudgetForm from '../components/budget/BudgetForm';
import BudgetTable from '../components/budget/BudgetTable';
import { setBudget } from '../api/budgetApi';
import { getMonthName } from '../utils/formatDate';

const now = new Date();

export default function BudgetSettingsPage() {
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [saving, setSaving] = useState(false);
  const { budgets, loading, refetch, deleteBudget } = useBudgets(month, year);

  const handleSetBudget = async (data) => {
    setSaving(true);
    try {
      await setBudget(data);
      await refetch();
    } catch (err) {
      console.error('Failed to set budget:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBudget(id);
    } catch (err) {
      console.error('Failed to delete budget:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{getMonthName(i + 1)}</option>
          ))}
        </select>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {Array.from({ length: 5 }, (_, i) => {
            const y = now.getFullYear() - 2 + i;
            return <option key={y} value={y}>{y}</option>;
          })}
        </select>
      </div>

      <BudgetForm month={month} year={year} onSubmit={handleSetBudget} isLoading={saving} />
      <BudgetTable budgets={budgets} onDelete={handleDelete} isLoading={loading} />
    </div>
  );
}

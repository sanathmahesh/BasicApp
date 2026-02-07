import { useState } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import SummaryCards from '../components/dashboard/SummaryCards';
import MonthlyChart from '../components/dashboard/MonthlyChart';
import CategoryPieChart from '../components/dashboard/CategoryPieChart';
import BudgetProgressBar from '../components/dashboard/BudgetProgressBar';
import RecentExpenses from '../components/dashboard/RecentExpenses';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { getMonthName } from '../utils/formatDate';

const now = new Date();

export default function DashboardPage() {
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const { dashboard, loading, error } = useDashboard(month, year);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center py-8">{error}</p>;
  if (!dashboard) return null;

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

      <SummaryCards dashboard={dashboard} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyChart data={dashboard.monthlyTrend} />
        <CategoryPieChart data={dashboard.categoryBreakdown} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Budget Status</h3>
          {dashboard.budgetStatus && dashboard.budgetStatus.length > 0 ? (
            dashboard.budgetStatus.map((budget) => (
              <BudgetProgressBar key={budget.id} budget={budget} />
            ))
          ) : (
            <p className="text-gray-400 text-sm text-center py-4">No budgets set</p>
          )}
        </div>
        <RecentExpenses expenses={dashboard.recentExpenses} />
      </div>
    </div>
  );
}

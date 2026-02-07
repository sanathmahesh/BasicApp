import BudgetProgressBar from '../dashboard/BudgetProgressBar';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import { getCategoryConfig } from '../../utils/categoryConfig';
import { formatCurrency } from '../../utils/formatCurrency';

export default function BudgetTable({ budgets, onDelete, isLoading }) {
  if (isLoading) return <LoadingSpinner />;
  if (!budgets.length) return <EmptyState message="No budget limits set for this month" />;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Budget Limits</h3>
      <div className="space-y-4">
        {budgets.map((budget) => (
          <div key={budget.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <BudgetProgressBar budget={budget} />
              </div>
              <button
                onClick={() => onDelete(budget.id)}
                className="text-gray-400 hover:text-red-500 ml-4 shrink-0"
                title="Delete budget"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

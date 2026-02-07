import { getCategoryConfig } from '../../utils/categoryConfig';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

export default function RecentExpenses({ expenses }) {
  if (!expenses || !expenses.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Recent Expenses</h3>
        <p className="text-gray-400 text-sm text-center py-4">No expenses yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Recent Expenses</h3>
      <div className="space-y-3">
        {expenses.map((expense) => {
          const catConfig = getCategoryConfig(expense.category);
          return (
            <div key={expense.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: catConfig.color }}
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">{expense.title}</p>
                  <p className="text-xs text-gray-400">{formatDate(expense.date)}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {formatCurrency(expense.amount)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

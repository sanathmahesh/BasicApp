import { getCategoryConfig } from '../../utils/categoryConfig';
import { formatCurrency } from '../../utils/formatCurrency';

export default function BudgetProgressBar({ budget }) {
  const percentage = Math.min(budget.percentageUsed, 100);
  const catConfig = getCategoryConfig(budget.category);
  const barColor =
    percentage >= 90 ? 'bg-red-500' :
    percentage >= 75 ? 'bg-amber-500' : 'bg-green-500';

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-gray-700">{catConfig.label}</span>
        <span className="text-gray-500">
          {formatCurrency(budget.spent)} / {formatCurrency(budget.limitAmount)}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${barColor} h-2.5 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {budget.percentageUsed >= 90 && (
        <p className="text-red-500 text-xs mt-1">
          {budget.percentageUsed >= 100 ? 'Budget exceeded!' : 'Budget nearly exhausted!'}
        </p>
      )}
    </div>
  );
}

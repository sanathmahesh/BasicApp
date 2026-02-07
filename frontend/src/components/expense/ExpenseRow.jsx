import { getCategoryConfig } from '../../utils/categoryConfig';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

export default function ExpenseRow({ expense, onEdit, onDelete }) {
  const catConfig = getCategoryConfig(expense.category);

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-4 py-3 text-sm text-gray-500">{formatDate(expense.date)}</td>
      <td className="px-4 py-3">
        <p className="text-sm font-medium text-gray-800">{expense.title}</p>
        {expense.description && (
          <p className="text-xs text-gray-400 mt-0.5">{expense.description}</p>
        )}
      </td>
      <td className="px-4 py-3">
        <span
          className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full text-white"
          style={{ backgroundColor: catConfig.color }}
        >
          {catConfig.label}
        </span>
      </td>
      <td className="px-4 py-3 text-sm font-semibold text-gray-800 text-right">
        {formatCurrency(expense.amount)}
      </td>
      <td className="px-4 py-3 text-right">
        <button
          onClick={() => onEdit(expense.id)}
          className="text-gray-400 hover:text-primary mr-2"
          title="Edit"
        >
          <svg className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(expense)}
          className="text-gray-400 hover:text-red-500"
          title="Delete"
        >
          <svg className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </td>
    </tr>
  );
}

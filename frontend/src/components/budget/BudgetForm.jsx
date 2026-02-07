import { useState } from 'react';
import { CATEGORIES } from '../../constants/categories';

export default function BudgetForm({ month, year, onSubmit, isLoading }) {
  const [form, setForm] = useState({ category: '', limitAmount: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.category) newErrors.category = 'Category is required';
    if (!form.limitAmount || parseFloat(form.limitAmount) <= 0) newErrors.limitAmount = 'Amount must be greater than 0';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      category: form.category,
      limitAmount: parseFloat(form.limitAmount),
      month,
      year,
    });
    setForm({ category: '', limitAmount: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Set Budget Limit</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          >
            <option value="">Select</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Limit Amount ($)</label>
          <input
            type="number"
            name="limitAmount"
            value={form.limitAmount}
            onChange={handleChange}
            step="0.01"
            min="0.01"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            placeholder="0.00"
          />
          {errors.limitAmount && <p className="text-red-500 text-xs mt-1">{errors.limitAmount}</p>}
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Set Budget'}
          </button>
        </div>
      </div>
    </form>
  );
}

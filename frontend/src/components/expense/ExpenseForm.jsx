import { useState } from 'react';
import { CATEGORIES } from '../../constants/categories';

const defaultValues = {
  title: '',
  description: '',
  amount: '',
  category: '',
  date: new Date().toISOString().split('T')[0],
};

export default function ExpenseForm({ initialValues, onSubmit, isLoading }) {
  const [form, setForm] = useState(initialValues || defaultValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.amount || parseFloat(form.amount) <= 0) newErrors.amount = 'Amount must be greater than 0';
    if (!form.category) newErrors.category = 'Category is required';
    if (!form.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: form.title.trim(),
      description: form.description.trim() || null,
      amount: parseFloat(form.amount),
      category: form.category,
      date: form.date,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          placeholder="e.g. Grocery shopping"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
          placeholder="Optional details..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            step="0.01"
            min="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            placeholder="0.00"
          />
          {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : (initialValues ? 'Update Expense' : 'Add Expense')}
      </button>
    </form>
  );
}

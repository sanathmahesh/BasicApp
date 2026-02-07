import { useState, useEffect, useCallback } from 'react';
import { getExpenses, deleteExpense as deleteExpenseApi } from '../api/expenseApi';

export function useExpenses(filters = {}) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;
      const { data } = await getExpenses(params);
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  }, [filters.category, filters.startDate, filters.endDate]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const deleteExpense = async (id) => {
    await deleteExpenseApi(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return { expenses, loading, error, refetch: fetchExpenses, deleteExpense };
}

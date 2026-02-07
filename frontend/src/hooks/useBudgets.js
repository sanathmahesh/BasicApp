import { useState, useEffect, useCallback } from 'react';
import { getBudgets, deleteBudget as deleteBudgetApi } from '../api/budgetApi';

export function useBudgets(month, year) {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBudgets = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getBudgets(month, year);
      setBudgets(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch budgets');
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const deleteBudget = async (id) => {
    await deleteBudgetApi(id);
    setBudgets((prev) => prev.filter((b) => b.id !== id));
  };

  return { budgets, loading, error, refetch: fetchBudgets, deleteBudget };
}

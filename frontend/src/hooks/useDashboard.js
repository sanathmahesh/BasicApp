import { useState, useEffect, useCallback } from 'react';
import { getDashboardSummary } from '../api/dashboardApi';

export function useDashboard(month, year) {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getDashboardSummary(month, year);
      setDashboard(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard');
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { dashboard, loading, error, refetch: fetchDashboard };
}

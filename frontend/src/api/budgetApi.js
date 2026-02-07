import axiosClient from './axiosClient';

export const getBudgets = (month, year) =>
  axiosClient.get('/budgets', { params: { month, year } });
export const setBudget = (data) => axiosClient.post('/budgets', data);
export const deleteBudget = (id) => axiosClient.delete(`/budgets/${id}`);

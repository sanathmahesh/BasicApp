import axiosClient from './axiosClient';

export const getDashboardSummary = (month, year) =>
  axiosClient.get('/dashboard', { params: { month, year } });

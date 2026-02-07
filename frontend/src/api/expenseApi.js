import axiosClient from './axiosClient';

export const getExpenses = (params) => axiosClient.get('/expenses', { params });
export const getExpenseById = (id) => axiosClient.get(`/expenses/${id}`);
export const createExpense = (data) => axiosClient.post('/expenses', data);
export const updateExpense = (id, data) => axiosClient.put(`/expenses/${id}`, data);
export const deleteExpense = (id) => axiosClient.delete(`/expenses/${id}`);

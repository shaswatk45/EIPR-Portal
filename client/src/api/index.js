import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});

// ── Auth ──────────────────────────────────────────
export const getMe = () => API.get('/auth/me');

// ── Learning ──────────────────────────────────────
export const getLearningContent = (category) =>
  API.get('/learning', { params: category ? { category } : {} });
export const getLearningById = (id) => API.get(`/learning/${id}`);
export const markContentComplete = (id) => API.post(`/learning/${id}/complete`);
export const createContent = (data) => API.post('/learning', data);
export const updateContent = (id, data) => API.put(`/learning/${id}`, data);
export const deleteContent = (id) => API.delete(`/learning/${id}`);

// ── Quiz ──────────────────────────────────────────
export const getQuizzes = () => API.get('/quiz');
export const getQuizById = (id) => API.get(`/quiz/${id}`);
export const submitQuizAttempt = (id, answers) => API.post(`/quiz/${id}/attempt`, { answers });
export const getMyAttempts = () => API.get('/quiz/attempts/me');
export const createQuiz = (data) => API.post('/quiz', data);
export const updateQuiz = (id, data) => API.put(`/quiz/${id}`, data);
export const deleteQuiz = (id) => API.delete(`/quiz/${id}`);

// ── Projects ─────────────────────────────────────
export const getMyProjects = () => API.get('/projects');
export const submitProject = (data) => API.post('/projects', data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);
export const getAllProjects = () => API.get('/projects/all');

// ── Recommend ─────────────────────────────────────
export const getRecommendation = (category) => API.post('/recommend', { category });
export const getCategories = () => API.get('/recommend/categories');

// ── Dashboard ─────────────────────────────────────
export const getDashboard = () => API.get('/dashboard');

// ── Admin ─────────────────────────────────────────
export const getAdminStats = () => API.get('/admin/stats');
export const getUsers = () => API.get('/admin/users');
export const updateUserRole = (id, role) => API.put(`/admin/users/${id}/role`, { role });
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);

export default API;

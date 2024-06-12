import axios from 'axios';

const API_URL = 'http://localhost:8080';
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to requests and handle token expiration
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.exp * 1000 < Date.now()) {
        // Token has expired, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location = '/';
        return Promise.reject('Token expired');
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized, redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location = '/';
    }
    return Promise.reject(error);
  }
);

// --------------------User reqquests----------------------
export const login = (loginData) => api.post('/api/login', loginData);
export const register = (userData) => api.post('/api/register', userData);
export const deleteUser = (id) => api.delete(`/user/delete/${id}`);
export const getUserById = (id) => api.get(`/user/findById/${id}`);
export const getUserByEmail = (email) => api.get(`/user/findByEmail/${email}`);
export const updateUser = (id, userData) => api.put(`/user/updateUser/${id}`, userData);

// ---------------------Project requests-------------------
export const saveProject = (projectData) => api.post('/projects/saveProject', {projectData});
export const deleteProject = (id) => api.delete(`/projects/deleteProject/${id}`);
export const getProjectById = (id) => api.get(`/projects/getProjectById/${id}`);
export const findAllProjects = (userId) => api.get(`/projects/users/findAllProjects/${userId}`);
export const updateProject = (id, updateProject) => api.put(`/projects/users/updateProject/${id}`, updateProject);

// ---------------------Task requests----------------------
export const saveTask = (taskData) => api.post('/tasks/saveTask', taskData);
export const deleteTask = (id) => api.delete(`/tasks/delete/${id}`);
export const findTaskById = (id) => api.get(`/tasks/findTaskById/${id}`);
export const findAllTasksOfTheProject = (projectId) => api.get(`/tasks/findAllTasksOfProject/${projectId}`);
export const findAllTasksOfUser = (userId) => api.get(`/tasks/findAllTasksOfUser/${userId}`);
export const updateTask = (id, updatedTask) => api.put(`/tasks/updateTask/${id}`, updatedTask);


// Add more API functions as needed

export default api;
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
  created_at: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assigned_to: number | null;
  due_date: string | null;
  created_at: string;
  updated_at: string;
  employee?: Employee;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  completionRate: number;
}

// Employee API calls
export const employeeAPI = {
  getAll: () => api.get<Employee[]>('/employees'),
  getById: (id: number) => api.get<Employee>(`/employees/${id}`),
  create: (data: Omit<Employee, 'id' | 'created_at'>) => 
    api.post<Employee>('/employees', data),
  update: (id: number, data: Partial<Employee>) => 
    api.put<Employee>(`/employees/${id}`, data),
  delete: (id: number) => api.delete(`/employees/${id}`),
};

// Task API calls
export const taskAPI = {
  getAll: (filters?: { status?: string; employeeId?: number }) => 
    api.get<Task[]>('/tasks', { params: filters }),
  getById: (id: number) => api.get<Task>(`/tasks/${id}`),
  create: (data: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'employee'>) => 
    api.post<Task>('/tasks', data),
  update: (id: number, data: Partial<Task>) => 
    api.put<Task>(`/tasks/${id}`, data),
  delete: (id: number) => api.delete(`/tasks/${id}`),
  getByEmployee: (employeeId: number) => 
    api.get<Task[]>(`/tasks/employee/${employeeId}`),
};

// Dashboard API calls
export const dashboardAPI = {
  getStats: () => api.get<DashboardStats>('/dashboard/stats'),
};
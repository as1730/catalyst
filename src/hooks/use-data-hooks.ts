import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Subject, StudySession, Goal, User, Task } from '@shared/types';
export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => api<User>('/api/user/me'),
  });
}
export function useUpdateXp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (xp: number) => api<User>('/api/user/xp', {
      method: 'POST',
      body: JSON.stringify({ xp }),
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
  });
}
export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => api<{ items: Task[] }>('/api/tasks'),
  });
}
export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Task>) => api<Task>('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
}
export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) => api<Task>(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
}
export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api<boolean>(`/api/tasks/${id}`, {
      method: 'DELETE',
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
}
export function useSubjects() {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: () => api<{ items: Subject[] }>('/api/subjects'),
  });
}
export function useCreateSubject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Subject>) => api<Subject>('/api/subjects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subjects'] }),
  });
}
export function useDeleteSubject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api<boolean>(`/api/subjects/${id}`, {
      method: 'DELETE',
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subjects'] }),
  });
}
export function useUpdateSubject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Subject> }) => api<Subject>(`/api/subjects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subjects'] }),
  });
}
export function useSessions() {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: () => api<{ items: StudySession[] }>('/api/sessions'),
  });
}
export function useCreateSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<StudySession>) => api<StudySession>('/api/sessions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sessions'] }),
  });
}
export function useUpdateSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<StudySession> }) => api<StudySession>(`/api/sessions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });
}
export function useDeleteSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api<boolean>(`/api/sessions/${id}`, {
      method: 'DELETE',
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sessions'] }),
  });
}
export function useGoals() {
  return useQuery({
    queryKey: ['goals'],
    queryFn: () => api<{ items: Goal[] }>('/api/goals'),
  });
}
export function useCreateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Goal>) => api<Goal>('/api/goals', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['goals'] }),
  });
}
export function useUpdateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Goal> }) => api<Goal>(`/api/goals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['goals'] }),
  });
}
export function useDeleteGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api<boolean>(`/api/goals/${id}`, {
      method: 'DELETE',
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['goals'] }),
  });
}
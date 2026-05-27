import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Subject, StudySession, Goal } from '@shared/types';
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sessions'] }),
  });
}
export function useGoals() {
  return useQuery({
    queryKey: ['goals'],
    queryFn: () => api<{ items: Goal[] }>('/api/goals'),
  });
}
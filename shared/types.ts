export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface User {
  id: string;
  name: string;
}
export interface Subject {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
}
export interface StudySession {
  id: string;
  subjectId: string;
  title: string;
  startTime: number;
  endTime: number;
  durationMinutes: number;
  notes?: string;
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled';
}
export interface Goal {
  id: string;
  title: string;
  description?: string;
  targetDate: number;
  progress: number;
  status: 'active' | 'completed' | 'archived';
  relatedSubjects: string[];
}
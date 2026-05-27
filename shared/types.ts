export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: number;
}
export interface Subject {
  id: string;
  name: string;
  description?: string;
  emoji: string;
  examDate?: number;
  confidence: number; // 1-5
  createdAt: number;
  level: number;
  xp: number;
}
export interface StudySession {
  id: string;
  subjectId: string;
  taskId?: string;
  title: string;
  startTime: number;
  endTime: number;
  durationMinutes: number;
  notes?: string;
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled';
  type: 'pomodoro' | 'break' | 'custom';
  xpEarned?: number;
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
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  xpReward: number;
  dueDate?: number;
  subjectId?: string;
}
export interface StudyPlanItem {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  order: number;
}
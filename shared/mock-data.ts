import type { Subject, StudySession, Goal, User } from './types';
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alex Catalyst' }
];
export const MOCK_SUBJECTS: Subject[] = [
  { id: 's1', name: 'Advanced Mathematics', description: 'Calculus, Linear Algebra, and Differential Equations', createdAt: Date.now() - 10000000 },
  { id: 's2', name: 'World History', description: 'Analysis of major global events from 1500 to present', createdAt: Date.now() - 8000000 },
  { id: 's3', name: 'Cognitive Psychology', description: 'Study of mental processes like perception and memory', createdAt: Date.now() - 5000000 }
];
export const MOCK_STUDY_SESSIONS: StudySession[] = [
  { 
    id: 'ss1', 
    subjectId: 's1', 
    title: 'Integration Practice', 
    startTime: Date.now() + 3600000, 
    endTime: Date.now() + 7200000, 
    durationMinutes: 60, 
    status: 'planned' 
  },
  { 
    id: 'ss2', 
    subjectId: 's3', 
    title: 'Memory Models Review', 
    startTime: Date.now() - 3600000, 
    endTime: Date.now(), 
    durationMinutes: 60, 
    status: 'completed' 
  }
];
export const MOCK_GOALS: Goal[] = [
  { 
    id: 'g1', 
    title: 'Master Calculus Basics', 
    description: 'Complete all practice sets for derivatives', 
    targetDate: Date.now() + 604800000, 
    progress: 65, 
    status: 'active', 
    relatedSubjects: ['s1'] 
  },
  { 
    id: 'g2', 
    title: 'History Essay Draft', 
    targetDate: Date.now() + 259200000, 
    progress: 20, 
    status: 'active', 
    relatedSubjects: ['s2'] 
  }
];
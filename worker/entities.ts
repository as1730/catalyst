import { IndexedEntity } from "./core-utils";
import type { Subject, StudySession, Goal, User, Task } from "@shared/types";
import { MOCK_SUBJECTS, MOCK_STUDY_SESSIONS, MOCK_GOALS, MOCK_USERS, MOCK_TASKS } from "@shared/mock-data";
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = {
    id: "",
    name: "",
    xp: 0,
    level: 1,
    streak: 0,
    lastActiveDate: 0
  };
  static seedData = MOCK_USERS;
}
export class SubjectEntity extends IndexedEntity<Subject> {
  static readonly entityName = "subject";
  static readonly indexName = "subjects";
  static readonly initialState: Subject = {
    id: "",
    name: "",
    createdAt: 0,
    emoji: "📚",
    confidence: 3,
    level: 1,
    xp: 0
  };
  static seedData = MOCK_SUBJECTS;
}
export class StudySessionEntity extends IndexedEntity<StudySession> {
  static readonly entityName = "session";
  static readonly indexName = "sessions";
  static readonly initialState: StudySession = {
    id: "",
    subjectId: "",
    title: "",
    startTime: 0,
    endTime: 0,
    durationMinutes: 0,
    status: 'planned',
    type: 'pomodoro'
  };
  static seedData = MOCK_STUDY_SESSIONS;
}
export class GoalEntity extends IndexedEntity<Goal> {
  static readonly entityName = "goal";
  static readonly indexName = "goals";
  static readonly initialState: Goal = {
    id: "",
    title: "",
    targetDate: 0,
    progress: 0,
    status: 'active',
    relatedSubjects: []
  };
  static seedData = MOCK_GOALS;
}
export class TaskEntity extends IndexedEntity<Task> {
  static readonly entityName = "task";
  static readonly indexName = "tasks";
  static readonly initialState: Task = {
    id: "",
    title: "",
    completed: false,
    xpReward: 20
  };
  static seedData = MOCK_TASKS;
}
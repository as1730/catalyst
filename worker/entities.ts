import { IndexedEntity } from "./core-utils";
import type { Subject, StudySession, Goal, User } from "@shared/types";
import { MOCK_SUBJECTS, MOCK_STUDY_SESSIONS, MOCK_GOALS, MOCK_USERS } from "@shared/mock-data";
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "" };
  static seedData = MOCK_USERS;
}
export class SubjectEntity extends IndexedEntity<Subject> {
  static readonly entityName = "subject";
  static readonly indexName = "subjects";
  static readonly initialState: Subject = { id: "", name: "", createdAt: 0 };
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
    status: 'planned' 
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
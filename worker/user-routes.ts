import { Hono } from "hono";
import type { Env } from './core-utils';
import { SubjectEntity, StudySessionEntity, GoalEntity, UserEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import type { Subject, StudySession, Goal } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // USER STATS
  app.get('/api/user/me', async (c) => {
    await UserEntity.ensureSeed(c.env);
    const user = new UserEntity(c.env, 'u1'); // Standard demo user
    return ok(c, await user.getState());
  });
  app.post('/api/user/xp', async (c) => {
    const { xp } = await c.req.json<{ xp: number }>();
    const user = new UserEntity(c.env, 'u1');
    const state = await user.mutate(s => {
      const nextXp = (s.xp || 0) + xp;
      const level = Math.floor(nextXp / 1000) + 1;
      return { ...s, xp: nextXp, level };
    });
    return ok(c, state);
  });
  // SUBJECTS
  app.get('/api/subjects', async (c) => {
    await SubjectEntity.ensureSeed(c.env);
    return ok(c, await SubjectEntity.list(c.env));
  });
  app.post('/api/subjects', async (c) => {
    const data = await c.req.json<Partial<Subject>>();
    if (!isStr(data.name)) return bad(c, 'name required');
    const subject: Subject = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description || '',
      emoji: data.emoji || '📚',
      confidence: data.confidence || 3,
      examDate: data.examDate,
      createdAt: Date.now(),
      level: 1,
      xp: 0
    };
    return ok(c, await SubjectEntity.create(c.env, subject));
  });
  app.put('/api/subjects/:id', async (c) => {
    const id = c.req.param('id');
    const data = await c.req.json<Partial<Subject>>();
    const entity = new SubjectEntity(c.env, id);
    if (!(await entity.exists())) return notFound(c);
    const updated = await entity.mutate(s => ({ ...s, ...data }));
    return ok(c, updated);
  });
  app.delete('/api/subjects/:id', async (c) => ok(c, await SubjectEntity.delete(c.env, c.req.param('id'))));
  // SESSIONS
  app.get('/api/sessions', async (c) => {
    await StudySessionEntity.ensureSeed(c.env);
    return ok(c, await StudySessionEntity.list(c.env));
  });
  app.post('/api/sessions', async (c) => {
    const data = await c.req.json<StudySession>();
    if (!isStr(data.title) || !isStr(data.subjectId)) return bad(c, 'title and subjectId required');
    const session = { ...data, id: crypto.randomUUID(), type: data.type || 'pomodoro' };
    return ok(c, await StudySessionEntity.create(c.env, session));
  });
  app.put('/api/sessions/:id', async (c) => {
    const id = c.req.param('id');
    const data = await c.req.json<Partial<StudySession>>();
    const entity = new StudySessionEntity(c.env, id);
    if (!(await entity.exists())) return notFound(c);
    const updated = await entity.mutate(s => ({ ...s, ...data }));
    return ok(c, updated);
  });
  app.delete('/api/sessions/:id', async (c) => ok(c, await StudySessionEntity.delete(c.env, c.req.param('id'))));
  // GOALS
  app.get('/api/goals', async (c) => {
    await GoalEntity.ensureSeed(c.env);
    return ok(c, await GoalEntity.list(c.env));
  });
  app.post('/api/goals', async (c) => {
    const data = await c.req.json<Partial<Goal>>();
    if (!isStr(data.title) || !data.targetDate) return bad(c, 'title and targetDate required');
    const goal: Goal = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description || '',
      targetDate: data.targetDate,
      progress: data.progress ?? 0,
      status: 'active',
      relatedSubjects: data.relatedSubjects || []
    };
    return ok(c, await GoalEntity.create(c.env, goal));
  });
  app.put('/api/goals/:id', async (c) => {
    const id = c.req.param('id');
    const data = await c.req.json<Partial<Goal>>();
    const entity = new GoalEntity(c.env, id);
    if (!(await entity.exists())) return notFound(c);
    const updated = await entity.mutate(s => ({ ...s, ...data }));
    return ok(c, updated);
  });
  app.delete('/api/goals/:id', async (c) => ok(c, await GoalEntity.delete(c.env, c.req.param('id'))));
}
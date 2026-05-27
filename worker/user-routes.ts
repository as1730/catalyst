import { Hono } from "hono";
import type { Env } from './core-utils';
import { SubjectEntity, StudySessionEntity, GoalEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import type { Subject, StudySession, Goal } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
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
      createdAt: Date.now()
    };
    return ok(c, await SubjectEntity.create(c.env, subject));
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
    const session = { ...data, id: crypto.randomUUID() };
    return ok(c, await StudySessionEntity.create(c.env, session));
  });
  // GOALS
  app.get('/api/goals', async (c) => {
    await GoalEntity.ensureSeed(c.env);
    return ok(c, await GoalEntity.list(c.env));
  });
  app.post('/api/goals', async (c) => {
    const data = await c.req.json<Goal>();
    if (!isStr(data.title)) return bad(c, 'title required');
    const goal = { ...data, id: crypto.randomUUID() };
    return ok(c, await GoalEntity.create(c.env, goal));
  });
}
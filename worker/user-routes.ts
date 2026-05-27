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
    const session = { ...data, id: crypto.randomUUID() };
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
  // GOALS
  app.get('/api/goals', async (c) => {
    await GoalEntity.ensureSeed(c.env);
    return ok(c, await GoalEntity.list(c.env));
  });
}
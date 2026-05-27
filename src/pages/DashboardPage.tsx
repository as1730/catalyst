import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Flame, Star, Zap, Clock, Calendar, Sparkles, BrainCircuit } from 'lucide-react';
import { useSubjects, useUser, useTasks, useUpdateTask } from '@/hooks/use-data-hooks';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
export function DashboardPage() {
  const { data: user, isLoading: loadingUser } = useUser();
  const { data: subjects } = useSubjects();
  const { data: tasksData, isLoading: loadingTasks } = useTasks();
  const updateTask = useUpdateTask();
  const tasks = tasksData?.items ?? [];
  const handleToggleTask = async (id: string, currentlyCompleted: boolean, xp: number) => {
    if (currentlyCompleted) return;
    try {
      await updateTask.mutateAsync({ id, data: { completed: true } });
      toast.success(`Task Complete: +${xp} XP`, { 
        icon: <Zap className="h-4 w-4 text-app-warning" />,
        description: "Your level progress has been updated."
      });
    } catch (e) {
      toast.error("Failed to update task progress");
    }
  };
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  const streakColor = (user?.streak ?? 0) > 10 ? 'text-app-warning' : 'text-orange-400';
  return (
    <AppLayout container>
      <div className="space-y-10 animate-fade-in pb-20">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-display leading-tight">{getGreeting()}, {user?.name || 'Alex'}</h1>
            <p className="text-lg text-muted-foreground font-medium">Ready to level up your knowledge today?</p>
          </div>
          <div className="flex items-center gap-6 bg-card border border-border p-4 rounded-2xl shadow-sm">
            <div className="flex flex-col items-center px-4 border-r border-border">
              <Flame className={`h-8 w-8 ${streakColor} animate-pulse`} />
              <span className="text-sm font-bold mt-1">{user?.streak ?? 0} Day Streak</span>
            </div>
            <div className="flex flex-col items-center px-4">
              <Star className="h-8 w-8 text-app-primary" />
              <span className="text-sm font-bold mt-1">Lvl {user?.level ?? 1}</span>
            </div>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-xl bg-card overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-primary to-app-accent" />
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-2">
                Today's Tasks <Zap className="h-5 w-5 text-app-warning fill-app-warning" />
              </CardTitle>
              <span className="text-sm font-medium text-muted-foreground">
                {tasks.filter(t => t.completed).length}/{tasks.length} Done
              </span>
            </CardHeader>
            <CardContent className="space-y-2 px-6 pb-8">
              {loadingTasks ? (
                <div className="space-y-2">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-14 w-full rounded-xl" />)}
                </div>
              ) : tasks.length === 0 ? (
                <p className="text-center py-10 text-muted-foreground italic">No tasks today. Start a new focus session!</p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${task.completed ? 'bg-muted/30 border-transparent opacity-60' : 'bg-background hover:border-primary/50 border-border'}`}
                  >
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => handleToggleTask(task.id, task.completed, task.xpReward)}
                        disabled={task.completed}
                        className="h-5 w-5 rounded-md"
                      />
                      <span className={`font-semibold ${task.completed ? 'line-through' : ''}`}>{task.title}</span>
                    </div>
                    <span className="text-xs font-bold text-app-warning">+{task.xpReward} XP</span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
          <div className="space-y-6">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Card className="bg-primary text-primary-foreground border-none shadow-lg shadow-primary/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles className="h-24 w-24" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    Daily Spark <Sparkles className="h-4 w-4" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium italic leading-snug">
                    "The expert in anything was once a beginner. Your Lvl {user?.level ?? 1} status is proof of your persistence."
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-80">
                    <BrainCircuit className="h-3 w-3" /> Mentor AI
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  Deadlines <Clock className="h-4 w-4 text-app-error" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Calc Exam', days: 2, color: 'bg-app-error' },
                  { name: 'History Essay', days: 5, color: 'bg-app-warning' },
                  { name: 'Bio Quiz', days: 12, color: 'bg-app-primary' },
                ].map((dl, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${dl.color}`} />
                      <span className="text-sm font-bold">{dl.name}</span>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">In {dl.days} days</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Active Subjects</h2>
            <Button variant="link" className="text-primary font-bold">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects?.items?.slice(0, 3).map((sub) => (
              <Card key={sub.id} className="group hover:shadow-lg transition-all border-border/80">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{sub.emoji || '📚'}</span>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      Lvl {sub.level || 1}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{sub.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <Calendar className="h-3.5 w-3.5" /> {sub.examDate ? `Exam on ${new Date(sub.examDate).toLocaleDateString()}` : 'No exam set'}
                  </div>
                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${Math.min(100, ((sub.xp || 0) / 1000) * 100)}%` }} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
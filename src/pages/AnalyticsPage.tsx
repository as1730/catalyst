import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useSessions, useSubjects, useGoals } from '@/hooks/use-data-hooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { format, subDays, isSameDay } from 'date-fns';
import { Clock, BookOpen, Target, TrendingUp } from 'lucide-react';
export function AnalyticsPage() {
  const { data: sessions, isLoading: loadingSessions } = useSessions();
  const { data: subjects, isLoading: loadingSubjects } = useSubjects();
  const { data: goals, isLoading: loadingGoals } = useGoals();
  const isLoading = loadingSessions || loadingSubjects || loadingGoals;
  // Process data for charts
  const sessionsList = sessions?.items ?? [];
  const subjectsList = subjects?.items ?? [];
  const goalsList = goals?.items ?? [];
  // 1. Weekly Activity (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => subDays(new Date(), 6 - i));
  const activityData = last7Days.map(date => {
    const mins = sessionsList
      .filter(s => s.status === 'completed' && isSameDay(new Date(s.startTime), date))
      .reduce((acc, curr) => acc + curr.durationMinutes, 0);
    return {
      day: format(date, 'EEE'),
      minutes: mins
    };
  });
  // 2. Subject Distribution
  const subjectDistribution = subjectsList.map(subj => {
    const totalMins = sessionsList
      .filter(s => s.subjectId === subj.id && s.status === 'completed')
      .reduce((acc, curr) => acc + curr.durationMinutes, 0);
    return { name: subj.name, value: totalMins };
  }).filter(d => d.value > 0);
  // 3. Goal Progress
  const goalProgressData = goalsList
    .filter(g => g.status === 'active')
    .map(g => ({ name: g.title, progress: g.progress }));
  const COLORS = ['#346DF1', '#2ECC71', '#FFA07A', '#9F7AEA', '#F6AD55'];
  return (
    <AppLayout container>
      <div className="space-y-10 animate-fade-in">
        <header>
          <h1 className="text-display mb-2">Performance Analytics</h1>
          <p className="text-body max-w-2xl">
            Visualize your study habits and track your progress towards academic excellence.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-primary/5 border-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">Total Study Time</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {Math.round(sessionsList.filter(s => s.status === 'completed').reduce((acc, s) => acc + s.durationMinutes, 0) / 60)}h
                  </h3>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><Clock className="h-6 w-6" /></div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-app-success/5 border-app-success/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-app-success uppercase tracking-wider">Sessions Done</p>
                  <h3 className="text-2xl font-bold mt-1">{sessionsList.filter(s => s.status === 'completed').length}</h3>
                </div>
                <div className="p-3 bg-app-success/10 rounded-xl text-app-success"><TrendingUp className="h-6 w-6" /></div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-app-accent/5 border-app-accent/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-app-accent uppercase tracking-wider">Active Subjects</p>
                  <h3 className="text-2xl font-bold mt-1">{subjectsList.length}</h3>
                </div>
                <div className="p-3 bg-app-accent/10 rounded-xl text-app-accent"><BookOpen className="h-6 w-6" /></div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-500/5 border-purple-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Goals Met</p>
                  <h3 className="text-2xl font-bold mt-1">{goalsList.filter(g => g.status === 'completed').length}</h3>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-600"><Target className="h-6 w-6" /></div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-soft border-border/60">
            <CardHeader>
              <CardTitle>Study Intensity (Last 7 Days)</CardTitle>
              <CardDescription>Minutes spent in focused study sessions per day.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {isLoading ? <Skeleton className="h-full w-full" /> : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip 
                      cursor={{ fill: 'hsl(var(--muted))' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="minutes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
          <Card className="shadow-soft border-border/60">
            <CardHeader>
              <CardTitle>Focus Distribution</CardTitle>
              <CardDescription>Time allocation across different subjects.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {isLoading ? <Skeleton className="h-full w-full" /> : subjectDistribution.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground italic">No data yet</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={subjectDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {subjectDistribution.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
          <Card className="lg:col-span-2 shadow-soft border-border/60">
            <CardHeader>
              <CardTitle>Active Goal Tracking</CardTitle>
              <CardDescription>Current progress percentage for your top study goals.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
               {isLoading ? <Skeleton className="h-full w-full" /> : goalProgressData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground italic">No active goals being tracked</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={goalProgressData} layout="vertical" margin={{ left: 40, right: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={150} tick={{ fontSize: 12, fontWeight: 600 }} />
                    <Tooltip />
                    <Bar dataKey="progress" fill="hsl(var(--app-accent))" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
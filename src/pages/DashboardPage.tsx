import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { OverviewCards } from '@/components/dashboard/OverviewCards';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { BookOpen, Calendar, Target, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSubjects, useSessions, useGoals, useUpdateSession } from '@/hooks/use-data-hooks';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
export function DashboardPage() {
  const { data: subjects, isLoading: loadingSubjects } = useSubjects();
  const { data: sessions, isLoading: loadingSessions } = useSessions();
  const { data: goals, isLoading: loadingGoals } = useGoals();
  const updateSession = useUpdateSession();
  const navigate = useNavigate();
  const startSession = async (id: string) => {
    await updateSession.mutateAsync({ id, data: { status: 'in-progress' } });
    navigate('/sessions');
  };
  const upcomingSessions = sessions?.items?.filter(s => s.status === 'planned') ?? [];
  return (
    <AppLayout container>
      <div className="space-y-10 animate-fade-in">
        <header>
          <h1 className="text-display mb-2">Welcome back, Alex</h1>
          <p className="text-body max-w-2xl">
            You're making great progress this week. Track your goals and manage your sessions below.
          </p>
        </header>
        <OverviewCards
          stats={[
            { title: 'Subjects', value: subjects?.items?.length.toString() ?? '0', icon: BookOpen, trend: '+1 this week' },
            { title: 'Study Hours', value: '12.5h', icon: Clock, trend: '+2h since last week' },
            { title: 'Sessions', value: sessions?.items?.length.toString() ?? '0', icon: Calendar },
            { title: 'Goals Active', value: goals?.items?.length.toString() ?? '0', icon: Target },
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 shadow-soft overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Scheduled study time for your active subjects</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-2" onClick={() => navigate('/sessions')}>
                View Calendar <ArrowRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {loadingSessions ? (
                  [1, 2].map(i => <div key={i} className="p-6"><Skeleton className="h-12 w-full" /></div>)
                ) : upcomingSessions.length > 0 ? (
                  upcomingSessions.map(session => (
                    <div key={session.id} className="p-6 flex items-center justify-between hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{session.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(session.startTime).toLocaleDateString()} • {session.durationMinutes} mins
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => startSession(session.id)}>Start Session</Button>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-muted-foreground">No upcoming sessions.</div>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Goal Progress</CardTitle>
              <CardDescription>How you're tracking against targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {loadingGoals ? (
                [1, 2].map(i => <Skeleton key={i} className="h-10 w-full" />)
              ) : (
                goals?.items?.map(goal => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{goal.title}</span>
                      <span className="text-muted-foreground">{goal.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-500" style={{ width: `${goal.progress}%` }} />
                    </div>
                  </div>
                ))
              )}
              <Button className="w-full mt-4" variant="secondary" onClick={() => navigate('/goals')}>View All Goals</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
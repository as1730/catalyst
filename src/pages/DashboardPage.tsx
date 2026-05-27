import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { OverviewCards } from '@/components/dashboard/OverviewCards';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { BookOpen, Calendar, Target, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_STUDY_SESSIONS, MOCK_GOALS, MOCK_SUBJECTS } from '@shared/mock-data';
export function DashboardPage() {
  return (
    <AppLayout container>
      <div className="space-y-10 animate-fade-in">
        <header>
          <h1 className="text-display mb-2">Welcome back, Alex</h1>
          <p className="text-body max-w-2xl">
            You're making great progress this week. You have 3 study sessions planned and 2 active goals nearing completion.
          </p>
        </header>
        <OverviewCards 
          stats={[
            { title: 'Subjects', value: MOCK_SUBJECTS.length.toString(), icon: BookOpen, trend: '+1 this week' },
            { title: 'Study Hours', value: '12.5h', icon: Clock, trend: '+2h since last week' },
            { title: 'Sessions', value: MOCK_STUDY_SESSIONS.length.toString(), icon: Calendar },
            { title: 'Goals Active', value: MOCK_GOALS.length.toString(), icon: Target },
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 shadow-soft overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Scheduled study time for your active subjects</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-2">
                View Calendar <ArrowRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {MOCK_STUDY_SESSIONS.filter(s => s.status === 'planned').map(session => (
                  <div key={session.id} className="p-6 flex items-center justify-between hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-app-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-app-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{session.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(session.startTime).toLocaleDateString()} • {session.durationMinutes} mins
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Start Session</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Goal Progress</CardTitle>
              <CardDescription>How you're tracking against targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {MOCK_GOALS.map(goal => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{goal.title}</span>
                    <span className="text-muted-foreground">{goal.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-app-primary transition-all duration-500" 
                      style={{ width: `${goal.progress}%` }} 
                    />
                  </div>
                </div>
              ))}
              <Button className="w-full mt-4" variant="secondary">View All Goals</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSessions, useSubjects } from '@/hooks/use-data-hooks';
import { format, isSameDay } from 'date-fns';
import { Clock, BookOpen, Plus, Calendar as CalendarIcon, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
export function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { data: sessionsData, isLoading: loadingSessions } = useSessions();
  const { data: subjectsData } = useSubjects();
  const sessions = sessionsData?.items ?? [];
  const subjects = subjectsData?.items ?? [];
  const selectedSessions = sessions.filter(s => 
    date && isSameDay(new Date(s.startTime), date)
  ).sort((a, b) => a.startTime - b.startTime);
  const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name ?? "Subject";
  return (
    <AppLayout container>
      <div className="space-y-10 animate-fade-in pb-20">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-display flex items-center gap-3">
              Study Calendar <CalendarIcon className="h-8 w-8 text-primary" />
            </h1>
            <p className="text-body max-w-xl">
              Visualize your learning schedule and manage your sessions.
            </p>
          </div>
          <Button size="lg" className="rounded-2xl gap-2 font-bold shadow-lg shadow-primary/20">
            <Plus className="h-5 w-5" /> Schedule Session
          </Button>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 xl:col-span-8">
            <Card className="border-none shadow-xl bg-card overflow-hidden">
              <CardContent className="p-4 sm:p-8">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border-none w-full"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full",
                    month: "space-y-4 w-full",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex w-full justify-between",
                    head_cell: "text-muted-foreground rounded-md w-10 font-bold text-[0.8rem] uppercase",
                    row: "flex w-full mt-2 justify-between",
                    cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                    day: "h-12 w-12 p-0 font-bold aria-selected:opacity-100 rounded-xl hover:bg-accent transition-colors flex items-center justify-center",
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground shadow-lg shadow-primary/30",
                    day_today: "bg-accent/50 text-accent-foreground border-2 border-primary/20",
                    day_outside: "text-muted-foreground opacity-30",
                    day_disabled: "text-muted-foreground opacity-30",
                    day_hidden: "invisible",
                  }}
                  modifiers={{
                    hasSession: (d) => sessions.some(s => isSameDay(new Date(s.startTime), d))
                  }}
                  modifiersClassNames={{
                    hasSession: "after:absolute after:bottom-1 after:w-1 after:h-1 after:bg-primary after:rounded-full"
                  }}
                />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold">
                {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
              </h3>
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {selectedSessions.length} Events
              </span>
            </div>
            {loadingSessions ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full rounded-2xl" />)}
              </div>
            ) : selectedSessions.length === 0 ? (
              <Card className="border-dashed border-2 bg-muted/10 h-48 flex flex-col items-center justify-center text-center p-6 rounded-3xl">
                <Clock className="h-10 w-10 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground italic font-medium">No sessions planned for this day.</p>
                <Button variant="link" className="mt-2 text-primary font-bold">Plan one now</Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {selectedSessions.map((session) => (
                  <Card key={session.id} className="group hover:border-primary/40 hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-secondary flex flex-col items-center justify-center">
                        <span className="text-xs font-bold uppercase text-muted-foreground">
                          {format(new Date(session.startTime), 'HH:mm')}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold truncate">{session.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 font-medium">
                          <BookOpen className="h-3 w-3" /> {getSubjectName(session.subjectId)}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            <Card className="bg-primary text-primary-foreground border-none shadow-lg shadow-primary/20">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg"><Clock className="h-5 w-5" /></div>
                  <h4 className="font-bold">Weekly Overview</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase opacity-80">
                    <span>Active Study Time</span>
                    <span>12h / 20h goal</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white" style={{ width: '60%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
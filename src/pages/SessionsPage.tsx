import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SessionCalendar } from '@/components/sessions/SessionCalendar';
import { SessionForm } from '@/components/sessions/SessionForm';
import { SessionTimer } from '@/components/sessions/SessionTimer';
import { Button } from '@/components/ui/button';
import { Plus, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useSessions } from '@/hooks/use-data-hooks';
import { Skeleton } from '@/components/ui/skeleton';
export function SessionsPage() {
  const { data, isLoading } = useSessions();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const activeSession = data?.items?.find(s => s.status === 'in-progress');
  return (
    <AppLayout container>
      <div className="space-y-10 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-display">Study Sessions</h1>
            <p className="text-body">Plan and track your focused learning time.</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2 shadow-primary">
                <Plus className="h-5 w-5" /> Schedule Session
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule Study Session</DialogTitle>
              </DialogHeader>
              <SessionForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        {activeSession && (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary animate-pulse" /> Active Session
            </h3>
            <SessionTimer session={activeSession} />
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <SessionCalendar 
              sessions={data?.items ?? []} 
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
          </div>
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-xl font-bold">Upcoming & Recent</h3>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
              </div>
            ) : (
              <div className="space-y-4">
                {data?.items?.filter(s => s.status !== 'in-progress').map(session => (
                  <div key={session.id} className="p-6 bg-card border rounded-xl flex items-center justify-between group hover:border-primary/40 transition-all">
                    <div>
                      <h4 className="font-semibold">{session.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(session.startTime).toLocaleDateString()} at {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        session.status === 'completed' ? 'bg-app-success/10 text-app-success' : 'bg-app-warning/10 text-app-warning'
                      }`}>
                        {session.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
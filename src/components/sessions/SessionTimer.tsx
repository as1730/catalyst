import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useUpdateSession } from '@/hooks/use-data-hooks';
import type { StudySession } from '@shared/types';
import { Play, Pause, Square, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
export function SessionTimer({ session }: { session: StudySession }) {
  const [timeLeft, setTimeLeft] = useState(session.durationMinutes * 60);
  const [isActive, setIsActive] = useState(true);
  const updateSession = useUpdateSession();
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);
  const progress = ((session.durationMinutes * 60 - timeLeft) / (session.durationMinutes * 60)) * 100;
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  const handleComplete = async () => {
    try {
      await updateSession.mutateAsync({ id: session.id, data: { status: 'completed' } });
      toast.success("Session completed! Great job.");
    } catch (e) {
      toast.error("Failed to update session");
    }
  };
  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="relative h-32 w-32 flex items-center justify-center">
        <svg className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="64" cy="64" r="58" className="stroke-muted fill-none" strokeWidth="8" />
          <circle 
            cx="64" cy="64" r="58" 
            className="stroke-primary fill-none transition-all duration-1000" 
            strokeWidth="8" 
            strokeDasharray={364.4}
            strokeDashoffset={364.4 - (364.4 * progress) / 100}
            strokeLinecap="round"
          />
        </svg>
        <span className="text-2xl font-mono font-bold">{formatTime(timeLeft)}</span>
      </div>
      <div className="flex-1 space-y-4 w-full text-center md:text-left">
        <div>
          <h2 className="text-xl font-bold">{session.title}</h2>
          <p className="text-muted-foreground text-sm">Focusing on your goals...</p>
        </div>
        <div className="flex items-center justify-center md:justify-start gap-3">
          <Button variant="outline" size="icon" onClick={() => setIsActive(!isActive)}>
            {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="default" className="gap-2" onClick={handleComplete}>
            <CheckCircle2 className="h-4 w-4" /> Complete
          </Button>
          <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => updateSession.mutate({ id: session.id, data: { status: 'cancelled' } })}>
            <Square className="h-4 w-4 mr-2" /> Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, CheckCircle2, Zap, Coffee } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSubjects } from '@/hooks/use-data-hooks';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
const PRESETS = [15, 25, 45, 60];
export function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [subjectId, setSubjectId] = useState<string>('');
  const { data: subjects } = useSubjects();
  const handleComplete = useCallback(() => {
    setIsActive(false);
    if (mode === 'focus') {
      toast.success("Session Complete!", {
        description: "You've earned +20 XP for this focus session.",
        icon: <Zap className="h-5 w-5 text-app-warning fill-app-warning" />
      });
    } else {
      toast.info("Break's over! Ready to focus again?");
    }
  }, [mode]);
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, handleComplete]);
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };
  const progress = ((initialTime - timeLeft) / initialTime) * 100;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const setPreset = (mins: number) => {
    setIsActive(false);
    setTimeLeft(mins * 60);
    setInitialTime(mins * 60);
    setMode('focus');
  };
  const toggleBreak = () => {
    setIsActive(false);
    setMode(mode === 'focus' ? 'break' : 'focus');
    const time = mode === 'focus' ? 5 * 60 : 25 * 60;
    setTimeLeft(time);
    setInitialTime(time);
  };
  return (
    <Card className="max-w-xl mx-auto border-none shadow-2xl bg-card overflow-hidden">
      <CardHeader className="text-center pb-0">
        <CardTitle className="text-3xl font-display flex items-center justify-center gap-3">
          {mode === 'focus' ? 'Focus Session' : 'Short Break'}
          {mode === 'break' && <Coffee className="h-6 w-6 text-app-primary" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center py-10 space-y-8">
        {/* Circular Progress */}
        <div className="relative h-64 w-64 flex items-center justify-center">
          <svg className="absolute inset-0 h-full w-full -rotate-90">
            <circle 
              cx="128" cy="128" r={radius} 
              className="stroke-muted fill-none" 
              strokeWidth="10" 
            />
            <motion.circle
              cx="128" cy="128" r={radius}
              className={mode === 'focus' ? "stroke-primary fill-none" : "stroke-app-success fill-none"}
              strokeWidth="10"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "linear" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="flex flex-col items-center">
            <span className="text-6xl font-mono font-bold tracking-tighter">{formatTime(timeLeft)}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-2">
              {mode}
            </span>
          </div>
        </div>
        {/* Subject Selection */}
        {mode === 'focus' && (
          <div className="w-full max-w-xs">
            <Select value={subjectId} onValueChange={setSubjectId}>
              <SelectTrigger className="bg-secondary/50 border-border">
                <SelectValue placeholder="Link to a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects?.items?.map(s => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {/* Controls */}
        <div className="flex items-center gap-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-12 w-12 rounded-full"
            onClick={() => {
              setIsActive(false);
              setTimeLeft(initialTime);
            }}
          >
            <RotateCcw className="h-6 w-6" />
          </Button>
          <Button 
            variant="default" 
            size="lg" 
            className={`h-20 w-20 rounded-full shadow-xl ${mode === 'focus' ? 'bg-primary shadow-primary/30' : 'bg-app-success shadow-app-success/30'}`}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? <Pause className="h-10 w-10 fill-current" /> : <Play className="h-10 w-10 fill-current ml-1" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-12 w-12 rounded-full"
            onClick={toggleBreak}
          >
            <Coffee className="h-6 w-6" />
          </Button>
        </div>
        {/* Presets */}
        <div className="flex flex-wrap justify-center gap-3">
          {PRESETS.map(p => (
            <Button 
              key={p} 
              variant="outline" 
              size="sm" 
              className={timeLeft === p * 60 ? "border-primary text-primary bg-primary/5" : ""}
              onClick={() => setPreset(p)}
            >
              {p}m
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
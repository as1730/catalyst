import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import type { StudySession } from '@shared/types';
import { isSameDay } from 'date-fns';
interface SessionCalendarProps {
  sessions: StudySession[];
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
}
export function SessionCalendar({ sessions, selected, onSelect }: SessionCalendarProps) {
  const sessionDates = sessions.map(s => new Date(s.startTime));
  return (
    <Card className="overflow-hidden border-border/60">
      <CardContent className="p-4">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          className="rounded-md border-none"
          modifiers={{
            hasSession: (date) => sessionDates.some(d => isSameDay(d, date))
          }}
          modifiersClassNames={{
            hasSession: "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full font-bold text-primary"
          }}
        />
      </CardContent>
    </Card>
  );
}
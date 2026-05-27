import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSubjects, useCreateSession } from '@/hooks/use-data-hooks';
import { toast } from 'sonner';
const formSchema = z.object({
  title: z.string().min(2, "Title is required"),
  subjectId: z.string().min(1, "Subject is required"),
  startTime: z.string().min(1, "Start time is required"),
  durationMinutes: z.coerce.number().min(5, "Minimum 5 minutes"),
});
type SessionFormValues = z.infer<typeof formSchema>;
export function SessionForm({ onSuccess }: { onSuccess: () => void }) {
  const { data: subjectsData } = useSubjects();
  const createSession = useCreateSession();
  const form = useForm<SessionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", subjectId: "", startTime: "", durationMinutes: 60 },
  });
  const onSubmit: SubmitHandler<SessionFormValues> = async (values) => {
    try {
      const startTime = new Date(values.startTime).getTime();
      await createSession.mutateAsync({
        ...values,
        startTime,
        endTime: startTime + values.durationMinutes * 60000,
        status: 'planned'
      });
      toast.success("Session scheduled!");
      onSuccess();
    } catch (err) {
      toast.error("Failed to schedule session");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Title</FormLabel>
              <FormControl><Input placeholder="e.g. Chapter 4 Review" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subjectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subjectsData?.items?.map(s => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl><Input type="datetime-local" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="durationMinutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (min)</FormLabel>
                <FormControl><Input type="number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={createSession.isPending}>
          {createSession.isPending ? "Scheduling..." : "Schedule Session"}
        </Button>
      </form>
    </Form>
  );
}
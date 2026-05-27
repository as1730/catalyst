import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useSubjects, useCreateGoal } from '@/hooks/use-data-hooks';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
const formSchema = z.object({
  title: z.string().min(2, "Goal title must be at least 2 characters."),
  description: z.string().optional(),
  targetDate: z.string().min(1, "Target date is required."),
  relatedSubjects: z.array(z.string()).optional(),
});
type GoalFormValues = z.infer<typeof formSchema>;
export function GoalForm({ onSuccess }: { onSuccess: () => void }) {
  const { data: subjectsData } = useSubjects();
  const createGoal = useCreateGoal();
  const form = useForm<GoalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      targetDate: "",
      relatedSubjects: [],
    },
  });
  async function onSubmit(values: GoalFormValues) {
    try {
      await createGoal.mutateAsync({
        ...values,
        targetDate: new Date(values.targetDate).getTime(),
        progress: 0,
        status: 'active',
      });
      toast.success("Goal created successfully!");
      onSuccess();
    } catch (err) {
      toast.error("Failed to create goal");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Master Linear Algebra" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relatedSubjects"
          render={() => (
            <FormItem>
              <div className="mb-2">
                <FormLabel>Related Subjects</FormLabel>
                <FormDescription>Link this goal to specific areas of study.</FormDescription>
              </div>
              <ScrollArea className="h-32 border rounded-md p-4">
                <div className="space-y-2">
                  {subjectsData?.items?.map((subject) => (
                    <FormField
                      key={subject.id}
                      control={form.control}
                      name="relatedSubjects"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(subject.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), subject.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== subject.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {subject.name}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
              </ScrollArea>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes & Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="How do you plan to achieve this?" className="resize-none min-h-[80px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onSuccess}>Cancel</Button>
          <Button type="submit" className="px-8" disabled={createGoal.isPending}>
            {createGoal.isPending ? "Creating..." : "Set Goal"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
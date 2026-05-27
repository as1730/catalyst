import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useCreateSubject } from '@/hooks/use-data-hooks';
const formSchema = z.object({
  name: z.string().min(2, { message: "Subject name must be at least 2 characters." }),
  description: z.string().optional(),
  emoji: z.string().min(1, "Emoji required"),
  confidence: z.number().min(1).max(5),
  examDate: z.string().optional()
});
type SubjectFormValues = z.infer<typeof formSchema>;
interface SubjectFormProps {
  onSuccess?: () => void;
}
export function SubjectForm({ onSuccess }: SubjectFormProps) {
  const createSubject = useCreateSubject();
  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      emoji: "📚",
      confidence: 3,
      examDate: ""
    },
  });
  const onSubmit: SubmitHandler<SubjectFormValues> = async (values) => {
    try {
      const { examDate, ...rest } = values;
      await createSubject.mutateAsync({
        ...rest,
        examDate: examDate ? new Date(examDate).getTime() : undefined
      });
      toast.success("Subject added successfully!", {
        description: `${values.name} is now in your Knowledge Vault.`
      });
      if (onSuccess) onSuccess();
    } catch (e) {
      toast.error("Failed to create subject");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
        <div className="grid grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="emoji"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Icon</FormLabel>
                <FormControl><Input placeholder="📚" {...field} className="text-center text-xl" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Subject Name</FormLabel>
                <FormControl><Input placeholder="e.g. Molecular Biology" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="What is this course about?" className="resize-none h-20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="confidence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confidence (1-5)</FormLabel>
                <Select 
                  onValueChange={(val) => field.onChange(Number(val))} 
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="3" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map(v => (
                      <SelectItem key={v} value={String(v)}>Level {v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="examDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exam Date</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onSuccess}>Cancel</Button>
          <Button type="submit" className="px-8" disabled={createSubject.isPending}>
            {createSubject.isPending ? "Creating..." : "Save Subject"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
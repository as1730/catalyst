import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SubjectList } from '@/components/subjects/SubjectList';
import { SubjectForm } from '@/components/subjects/SubjectForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useSubjects } from '@/hooks/use-data-hooks';
export function SubjectsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isLoading } = useSubjects();
  return (
    <AppLayout container>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-display">Your Subjects</h1>
            <p className="text-body">Manage your courses, topics, and specialized areas of study.</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2 shadow-primary hover:scale-105 transition-transform">
                <Plus className="h-5 w-5" /> Add New Subject
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Subject</DialogTitle>
                <DialogDescription>
                  Enter the details of the new subject you want to track.
                </DialogDescription>
              </DialogHeader>
              <SubjectForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        <SubjectList subjects={data?.items ?? []} isLoading={isLoading} />
      </div>
    </AppLayout>
  );
}
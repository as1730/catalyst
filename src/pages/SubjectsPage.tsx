import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SubjectList } from '@/components/subjects/SubjectList';
import { SubjectForm } from '@/components/subjects/SubjectForm';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useSubjects } from '@/hooks/use-data-hooks';
export function SubjectsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isLoading } = useSubjects();
  const [search, setSearch] = useState('');
  const filteredSubjects = data?.items?.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  ) ?? [];
  return (
    <AppLayout container>
      <div className="space-y-10 animate-fade-in pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-display flex items-center gap-4">
              Knowledge Vault <BookOpen className="h-8 w-8 text-primary" />
            </h1>
            <p className="text-lg text-muted-foreground font-medium max-w-xl">
              Organize your courses and track your mastery levels.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-2xl gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                <Plus className="h-6 w-6" /> Create Subject
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-[2.5rem]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">New Area of Mastery</DialogTitle>
                <DialogDescription>
                  Enter the details of the subject you're conquering next.
                </DialogDescription>
              </DialogHeader>
              <SubjectForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search your vault..." 
            className="pl-12 h-14 bg-card border-border rounded-2xl shadow-sm focus-visible:ring-primary/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <SubjectList subjects={filteredSubjects} isLoading={isLoading} />
      </div>
    </AppLayout>
  );
}
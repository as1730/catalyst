import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import type { Subject } from '@shared/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useDeleteSubject } from '@/hooks/use-data-hooks';
import { toast } from 'sonner';
interface SubjectListProps {
  subjects: Subject[];
  isLoading: boolean;
}
export function SubjectList({ subjects, isLoading }: SubjectListProps) {
  const deleteSubject = useDeleteSubject();
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this subject?")) {
      try {
        await deleteSubject.mutateAsync(id);
        toast.success("Subject deleted");
      } catch (e) {
        toast.error("Failed to delete subject");
      }
    }
  };
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-48 w-full rounded-xl" />)}
      </div>
    );
  }
  if (subjects.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-3xl bg-muted/20">
        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-bold mb-2">No subjects found</h3>
        <p className="text-muted-foreground mb-6">Start your journey by adding your first area of study.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subjects.map((subject) => (
        <Card key={subject.id} className="group hover:shadow-soft transition-all duration-300 flex flex-col border-border/80">
          <CardHeader className="relative">
            <div className="absolute top-4 right-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2">
                    <Edit2 className="h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDelete(subject.id)}>
                    <Trash2 className="h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
              <BookOpen className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <CardTitle className="line-clamp-1">{subject.name}</CardTitle>
            <CardDescription className="line-clamp-2 min-h-[40px]">
              {subject.description || "No description provided."}
            </CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto pt-0">
            <div className="flex items-center justify-between w-full text-xs text-muted-foreground border-t border-border/40 pt-4">
              <span>Added {new Date(subject.createdAt).toLocaleDateString()}</span>
              <Button variant="link" size="sm" className="h-auto p-0 text-primary">View Details</Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
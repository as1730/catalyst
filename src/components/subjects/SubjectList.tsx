import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { MOCK_SUBJECTS } from '@shared/mock-data';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
export function SubjectList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_SUBJECTS.map((subject) => (
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
                  <DropdownMenuItem className="gap-2 text-destructive">
                    <Trash2 className="h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-app-primary/10 transition-colors">
              <BookOpen className="h-6 w-6 text-muted-foreground group-hover:text-app-primary transition-colors" />
            </div>
            <CardTitle className="line-clamp-1">{subject.name}</CardTitle>
            <CardDescription className="line-clamp-2 min-h-[40px]">
              {subject.description || "No description provided."}
            </CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto pt-0">
            <div className="flex items-center justify-between w-full text-xs text-muted-foreground border-t border-border/40 pt-4">
              <span>Added {new Date(subject.createdAt).toLocaleDateString()}</span>
              <Button variant="link" size="sm" className="h-auto p-0 text-app-primary">View Notes</Button>
            </div>
          </CardFooter>
        </Card>
      ))}
      <button className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-border hover:border-app-primary/50 hover:bg-muted/50 transition-all group">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <BookOpen className="h-6 w-6 text-muted-foreground" />
        </div>
        <span className="text-sm font-medium text-muted-foreground">Add Another Subject</span>
      </button>
    </div>
  );
}
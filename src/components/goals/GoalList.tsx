import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Calendar, MoreVertical, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import type { Goal } from '@shared/types';
import { useDeleteGoal, useUpdateGoal, useSubjects } from '@/hooks/use-data-hooks';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
interface GoalListProps {
  goals: Goal[];
  isLoading: boolean;
}
export function GoalList({ goals, isLoading }: GoalListProps) {
  const deleteGoal = useDeleteGoal();
  const updateGoal = useUpdateGoal();
  const { data: subjectsData } = useSubjects();
  const getSubjectName = (id: string) => subjectsData?.items?.find(s => s.id === id)?.name ?? "Subject";
  const handleUpdateProgress = async (goal: Goal, delta: number) => {
    const nextProgress = Math.min(100, Math.max(0, goal.progress + delta));
    const status = nextProgress === 100 ? 'completed' : 'active';
    await updateGoal.mutateAsync({ id: goal.id, data: { progress: nextProgress, status } });
  };
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map(i => <Skeleton key={i} className="h-48 w-full rounded-2xl" />)}
      </div>
    );
  }
  if (goals.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-3xl bg-muted/20">
        <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-bold mb-2">No goals in this category</h3>
        <p className="text-muted-foreground">Keep pushing boundaries. Add a new study goal today.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {goals.map((goal, idx) => (
        <motion.div
          key={goal.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
        >
          <Card className="group border-border/60 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold">{goal.title}</CardTitle>
                <div className="flex flex-wrap gap-2 pt-1">
                  {goal.relatedSubjects.map(sid => (
                    <Badge key={sid} variant="secondary" className="bg-primary/5 text-primary border-none text-[10px] py-0 px-2 h-5 uppercase">
                      {getSubjectName(sid)}
                    </Badge>
                  ))}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2" onClick={() => handleUpdateProgress(goal, 10)}>
                    Increase Progress (10%)
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2" onClick={() => handleUpdateProgress(goal, -10)}>
                    Decrease Progress (10%)
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 text-destructive" onClick={() => deleteGoal.mutate(goal.id)}>
                    <Trash2 className="h-4 w-4" /> Delete Goal
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                {goal.description || "No description provided."}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-3 w-3" /> Target: {new Date(goal.targetDate).toLocaleDateString()}
                  </span>
                  <span className={goal.progress === 100 ? "text-app-success font-bold" : "text-primary"}>
                    {goal.progress}%
                  </span>
                </div>
                <Progress value={goal.progress} className="h-2 bg-secondary" />
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              {goal.progress === 100 ? (
                <div className="w-full flex items-center justify-center gap-2 py-2 bg-app-success/10 text-app-success rounded-lg font-bold text-xs">
                  <CheckCircle2 className="h-4 w-4" /> COMPLETED
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full h-8 text-xs font-semibold gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary"
                  onClick={() => handleUpdateProgress(goal, 5)}
                >
                  Quick Boost (+5%)
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
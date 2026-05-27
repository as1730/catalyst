import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GoalList } from '@/components/goals/GoalList';
import { GoalForm } from '@/components/goals/GoalForm';
import { Button } from '@/components/ui/button';
import { Plus, Target, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useGoals } from '@/hooks/use-data-hooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
export function GoalsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isLoading } = useGoals();
  const goals = data?.items ?? [];
  const activeGoals = goals.filter(g => g.status === 'active');
  const completedGoals = goals.filter(g => g.status === 'completed');
  return (
    <AppLayout container>
      <div className="space-y-10 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-display flex items-center gap-3">
              Study Goals <Target className="h-8 w-8 text-primary" />
            </h1>
            <p className="text-body max-w-xl">
              Set clear academic targets and track your progress towards mastery.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2 shadow-primary hover:scale-105 transition-transform">
                <Plus className="h-5 w-5" /> Create New Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Set Your Goal</DialogTitle>
                <DialogDescription>
                  Define what you want to achieve and set a target date.
                </DialogDescription>
              </DialogHeader>
              <GoalForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        <Tabs defaultValue="active" className="w-full">
          <div className="flex items-center justify-between border-b pb-1">
            <TabsList className="bg-transparent h-12 p-0 gap-6">
              <TabsTrigger 
                value="active" 
                className="relative rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 font-semibold text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground bg-transparent"
              >
                Active Goals ({activeGoals.length})
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                className="relative rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 font-semibold text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground bg-transparent"
              >
                Completed ({completedGoals.length})
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="active" className="mt-8">
            <GoalList goals={activeGoals} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="completed" className="mt-8">
            <GoalList goals={completedGoals} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
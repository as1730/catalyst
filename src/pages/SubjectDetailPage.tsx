import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BrainCircuit, Play, FileText, Sparkles, ChevronLeft, Lightbulb, ListChecks } from 'lucide-react';
import { useSubjects } from '@/hooks/use-data-hooks';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
export function SubjectDetailPage() {
  const { id } = useParams();
  const { data: subjects, isLoading } = useSubjects();
  const [isGenerating, setIsGenerating] = useState(false);
  const subject = subjects?.items?.find(s => s.id === id);
  const generateStudyPlan = async () => {
    setIsGenerating(true);
    toast.info("Mentor AI: Analyzing materials...");
    setTimeout(() => {
      toast.info("Mentor AI: Synthesizing roadmap...");
      setTimeout(() => {
        setIsGenerating(false);
        toast.success("AI Study Plan Generated!", {
          description: "Your personalized roadmap is now ready in the Plan tab.",
          icon: <Sparkles className="h-5 w-5 text-app-warning" />
        });
      }, 1500);
    }, 1500);
  };
  if (isLoading) return <AppLayout container><Skeleton className="h-96 w-full rounded-3xl" /></AppLayout>;
  if (!subject) return <AppLayout container><div className="text-center py-20">Subject not found</div></AppLayout>;
  return (
    <AppLayout container>
      <div className="space-y-8 animate-fade-in pb-20">
        <Link to="/subjects" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft className="h-4 w-4" /> Back to Vault
        </Link>
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-4xl shadow-inner border border-primary/5">
              {subject.emoji || '📚'}
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">{subject.name}</h1>
              <p className="text-muted-foreground mt-1 max-w-lg">
                {subject.description || "Master this subject with AI-powered insights and focused study blocks."}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              size="lg"
              className="rounded-2xl gap-2 font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              onClick={generateStudyPlan}
              disabled={isGenerating}
            >
              <Sparkles className={`h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? "Processing..." : "Generate AI Plan"}
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl gap-2 font-bold border-2 hover:bg-secondary">
              <BrainCircuit className="h-5 w-5" /> Quick Quiz
            </Button>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="materials" className="w-full">
              <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 gap-8">
                <TabsTrigger value="materials" className="rounded-none border-b-2 border-transparent px-0 py-4 font-bold data-[state=active]:border-primary bg-transparent">Materials</TabsTrigger>
                <TabsTrigger value="plan" className="rounded-none border-b-2 border-transparent px-0 py-4 font-bold data-[state=active]:border-primary bg-transparent">Study Plan</TabsTrigger>
                <TabsTrigger value="notes" className="rounded-none border-b-2 border-transparent px-0 py-4 font-bold data-[state=active]:border-primary bg-transparent">Knowledge Base</TabsTrigger>
              </TabsList>
              <TabsContent value="materials" className="pt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="border-dashed border-2 hover:bg-accent/50 transition-colors cursor-pointer group">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                      <FileText className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
                      <div>
                        <p className="font-bold">Drop PDFs here</p>
                        <p className="text-xs text-muted-foreground">AI will index your study notes</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-dashed border-2 hover:bg-accent/50 transition-colors cursor-pointer group">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                      <Play className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
                      <div>
                        <p className="font-bold">YouTube Lectures</p>
                        <p className="text-xs text-muted-foreground">Summarize key points automatically</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="plan" className="pt-6">
                <Card className="bg-muted/30">
                  <CardContent className="p-8 text-center space-y-4">
                    <ListChecks className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                    <p className="text-muted-foreground italic">Click "Generate AI Plan" to create your structured roadmap.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-6">
            <Card className="bg-app-primary/5 border-app-primary/10 shadow-none">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-app-warning fill-app-warning" /> AI Insight
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">
                  Based on your recent sessions, you tend to struggle with <strong>Complex Notations</strong>. Try a focused 25-minute Pomodoro session on this specific topic tonight.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">Mastery Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Confidence Level</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <div key={star} className={`h-2 w-5 rounded-full ${star <= (subject.confidence || 3) ? 'bg-primary' : 'bg-muted'}`} />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase text-muted-foreground">
                    <span>XP Progression</span>
                    <span>{subject.xp || 0} / 2,500</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${Math.min(100, ((subject.xp || 0) / 2500) * 100)}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
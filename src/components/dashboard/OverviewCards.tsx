import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
interface Stat {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
}
interface OverviewCardsProps {
  stats: Stat[];
}
export function OverviewCards({ stats }: OverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <Card key={i} className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-border/60">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-xl bg-app-primary/10 group-hover:bg-app-primary group-hover:text-primary-foreground transition-colors">
                <stat.icon className="h-6 w-6" />
              </div>
              {stat.trend && (
                <span className="text-xs font-medium text-app-success bg-app-success/10 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1 tracking-tight">{stat.value}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
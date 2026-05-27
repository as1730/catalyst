import React from "react";
import { LayoutDashboard, BookOpen, Clock, Target, BarChart3, BrainCircuit, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
const navigation = [
  { name: 'Home', href: '/', icon: LayoutDashboard },
  { name: 'Subjects', href: '/subjects', icon: BookOpen },
  { name: 'Focus', href: '/sessions', icon: Clock },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Stats', href: '/analytics', icon: BarChart3 },
];
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  return (
    <TooltipProvider delayDuration={0}>
      <aside className="fixed inset-y-0 left-0 w-20 bg-card border-r border-border flex flex-col items-center py-6 z-50">
        <div className="mb-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <BrainCircuit className="size-7" />
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-4 w-full px-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "relative flex h-14 w-full items-center justify-center rounded-xl transition-all duration-200 group",
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-md" 
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <item.icon className={cn("size-6", isActive ? "scale-110" : "group-hover:scale-110 transition-transform")} />
                    {isActive && (
                      <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full -ml-2" />
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                  {item.name}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
        <div className="mt-auto pt-6 border-t border-border w-full flex justify-center">
           <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground">
             v1.2
           </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
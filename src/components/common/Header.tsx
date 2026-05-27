import React from "react";
import { Bell, Trophy, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@/hooks/use-data-hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AppSidebar } from "@/components/app-sidebar";
export function Header() {
  const { data: user, isLoading } = useUser();
  const nextLevelXp = 1000;
  const currentLevelXp = (user?.xp ?? 0) % nextLevelXp;
  const xpPercentage = (currentLevelXp / nextLevelXp) * 100;
  return (
    <header className="fixed top-0 right-0 left-0 md:left-20 h-16 bg-background/60 backdrop-blur-xl border-b border-border z-40 px-4 sm:px-8">
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-24">
              <AppSidebar isMobile />
            </SheetContent>
          </Sheet>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-accent/50 rounded-full border border-border">
            <Trophy className="h-4 w-4 text-app-warning" />
            <span className="text-xs font-bold uppercase tracking-wider">Level {user?.level ?? 1}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          <ThemeToggle className="relative top-0 right-0" />
          <Button variant="ghost" size="icon" className="relative text-muted-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-app-error rounded-full border-2 border-background" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-auto p-1 pr-3 rounded-full bg-secondary/30 hover:bg-secondary/50 border border-border flex items-center gap-3 transition-all">
                <Avatar className="h-8 w-8 border border-border shadow-sm">
                  <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} alt="User" />
                  <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase() || 'AC'}</AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col items-start gap-1">
                  <span className="text-xs font-bold leading-none">{user?.name || 'Alex Catalyst'}</span>
                  <div className="w-24 h-1.5 bg-background rounded-full overflow-hidden border border-border/20">
                    <div
                      className="h-full bg-primary transition-all duration-1000"
                      style={{ width: `${xpPercentage}%` }}
                    />
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 mt-2" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2 py-1">
                  <p className="text-sm font-bold">{user?.name || 'Alex Catalyst'}</p>
                  <p className="text-xs text-muted-foreground">Level {user?.level ?? 1} Scholar</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                      <span>Progress</span>
                      <span>{currentLevelXp} / {nextLevelXp} XP</span>
                    </div>
                    <Progress value={xpPercentage} className="h-2" />
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Daily Streak: {user?.streak ?? 0} Days 🔥</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive font-medium">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
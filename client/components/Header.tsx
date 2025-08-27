import { Button } from "@/components/ui/button";
import { Vote, BarChart3, Plus, User } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
              <Vote className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">VoteHub</h1>
              <p className="text-xs text-muted-foreground -mt-0.5">Democracy in action</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Active Polls
            </a>
            <a href="/results" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Results
            </a>
            <a href="/create" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Create Poll
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">New Poll</span>
              <span className="sm:hidden">New</span>
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export interface Poll {
  id: string;
  title: string;
  description: string;
  category: string;
  totalVotes: number;
  timeRemaining: string;
  status: "active" | "closed" | "upcoming";
  options: {
    id: string;
    text: string;
    votes: number;
    percentage: number;
  }[];
}

interface PollCardProps {
  poll: Poll;
  onVote: (pollId: string) => void;
}

export default function PollCard({ poll, onVote }: PollCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                {poll.category}
              </Badge>
              <Badge className={`text-xs ${getStatusColor(poll.status)}`}>
                {poll.status.charAt(0).toUpperCase() + poll.status.slice(1)}
              </Badge>
            </div>
            <CardTitle className="text-lg leading-tight text-foreground">
              {poll.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {poll.description}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Poll Options Preview */}
        <div className="space-y-2">
          {poll.options.slice(0, 2).map((option) => (
            <div key={option.id} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-foreground">{option.text}</span>
                <span className="text-muted-foreground">{option.percentage}%</span>
              </div>
              <Progress value={option.percentage} className="h-2" />
            </div>
          ))}
          {poll.options.length > 2 && (
            <p className="text-xs text-muted-foreground">
              +{poll.options.length - 2} more options
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{poll.totalVotes.toLocaleString()} votes</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{poll.timeRemaining}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-primary">
            <TrendingUp className="h-4 w-4" />
            <span>Trending</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {poll.status === "active" ? (
            <Button 
              onClick={() => onVote(poll.id)} 
              className="w-full"
              size="sm"
            >
              Cast Your Vote
            </Button>
          ) : poll.status === "closed" ? (
            <Button variant="outline" className="w-full" size="sm">
              View Results
            </Button>
          ) : (
            <Button variant="outline" className="w-full" size="sm" disabled>
              Coming Soon
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

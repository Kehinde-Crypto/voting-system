import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Users, Calendar, Share2, Flag, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock poll data (would come from API in real app)
const mockPollData = {
  "1": {
    id: "1",
    title: "Should we implement a 4-day work week?",
    description: "A proposal to reduce the standard work week from 5 days to 4 days while maintaining full-time salary benefits. This initiative aims to improve work-life balance, reduce burnout, and potentially increase productivity. Several companies worldwide have already tested this model with positive results.",
    category: "Workplace",
    totalVotes: 15847,
    timeRemaining: "3 days left",
    endDate: "2024-01-15",
    status: "active",
    createdBy: "HR Department",
    createdDate: "2024-01-01",
    options: [
      { 
        id: "1a", 
        text: "Yes, implement 4-day work week", 
        description: "Reduce work week to 4 days with same pay and benefits",
        votes: 9508, 
        percentage: 60 
      },
      { 
        id: "1b", 
        text: "No, keep current 5-day schedule", 
        description: "Maintain the traditional 5-day work week structure",
        votes: 4754, 
        percentage: 30 
      },
      { 
        id: "1c", 
        text: "Trial period first", 
        description: "Test 4-day week for 6 months before permanent decision",
        votes: 1585, 
        percentage: 10 
      }
    ]
  }
};

export default function Poll() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const poll = id ? mockPollData[id as keyof typeof mockPollData] : null;

  useEffect(() => {
    // Check if user has already voted (would check localStorage or API)
    const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]");
    setHasVoted(votedPolls.includes(id));
  }, [id]);

  if (!poll) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Poll Not Found</h1>
          <p className="text-muted-foreground mb-8">The poll you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleVote = async () => {
    if (!selectedOption) {
      toast({
        title: "Please select an option",
        description: "You must choose an option before voting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store vote in localStorage (would be API call in real app)
    const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]");
    votedPolls.push(id);
    localStorage.setItem("votedPolls", JSON.stringify(votedPolls));
    
    setHasVoted(true);
    setIsSubmitting(false);
    
    toast({
      title: "Vote submitted successfully!",
      description: "Thank you for participating in this poll.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Poll link has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Polls
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Poll Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Poll Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{poll.category}</Badge>
                      <Badge className={poll.status === "active" ? "bg-green-100 text-green-800" : ""}>
                        {poll.status.charAt(0).toUpperCase() + poll.status.slice(1)}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl lg:text-3xl leading-tight">
                      {poll.title}
                    </CardTitle>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {poll.description}
                </p>
              </CardHeader>
            </Card>

            {/* Voting Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {hasVoted ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Your Vote (Results)</span>
                    </>
                  ) : (
                    <span>Cast Your Vote</span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {hasVoted ? (
                  // Show results if user has voted
                  <div className="space-y-4">
                    {poll.options.map((option) => (
                      <div key={option.id} className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-foreground">{option.text}</p>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="font-bold text-lg">{option.percentage}%</p>
                            <p className="text-sm text-muted-foreground">{option.votes.toLocaleString()} votes</p>
                          </div>
                        </div>
                        <Progress value={option.percentage} className="h-3" />
                      </div>
                    ))}
                  </div>
                ) : (
                  // Show voting form if user hasn't voted
                  <div className="space-y-6">
                    <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                      {poll.options.map((option) => (
                        <div key={option.id} className="space-y-2">
                          <div className="flex items-start space-x-3 p-4 rounded-lg border hover:border-primary/50 transition-colors">
                            <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                            <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                              <p className="font-medium text-foreground">{option.text}</p>
                              <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                            </Label>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                    
                    <Button 
                      onClick={handleVote} 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting || !selectedOption}
                    >
                      {isSubmitting ? "Submitting Vote..." : "Submit Vote"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Poll Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Poll Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Total Votes</span>
                  </div>
                  <span className="font-semibold">{poll.totalVotes.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Time Remaining</span>
                  </div>
                  <span className="font-semibold text-primary">{poll.timeRemaining}</span>
                </div>
              </CardContent>
            </Card>

            {/* Poll Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Poll Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Created by:</span>
                  <p className="font-medium">{poll.createdBy}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Created on:</span>
                  <p className="font-medium">{poll.createdDate}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Ends on:</span>
                  <p className="font-medium">{poll.endDate}</p>
                </div>
              </CardContent>
            </Card>

            {/* Share Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Share This Poll</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Help spread awareness by sharing this poll with others.
                </p>
                <Button variant="outline" className="w-full" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

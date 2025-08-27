import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import PollCard, { Poll } from "@/components/PollCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Zap, Users, Award, Globe } from "lucide-react";

// Mock data for demonstration
const mockPolls: Poll[] = [
  {
    id: "1",
    title: "Should we implement a 4-day work week?",
    description: "A proposal to reduce the standard work week from 5 days to 4 days while maintaining full-time salary benefits.",
    category: "Workplace",
    totalVotes: 15847,
    timeRemaining: "3 days left",
    status: "active",
    options: [
      { id: "1a", text: "Yes, implement 4-day work week", votes: 9508, percentage: 60 },
      { id: "1b", text: "No, keep current 5-day schedule", votes: 4754, percentage: 30 },
      { id: "1c", text: "Trial period first", votes: 1585, percentage: 10 }
    ]
  },
  {
    id: "2",
    title: "Best renewable energy investment for 2024",
    description: "Which renewable energy source should receive the highest government investment priority this year?",
    category: "Environment",
    totalVotes: 12340,
    timeRemaining: "1 week left",
    status: "active",
    options: [
      { id: "2a", text: "Solar power infrastructure", votes: 6170, percentage: 50 },
      { id: "2b", text: "Wind energy projects", votes: 3702, percentage: 30 },
      { id: "2c", text: "Hydroelectric systems", votes: 1851, percentage: 15 },
      { id: "2d", text: "Geothermal energy", votes: 617, percentage: 5 }
    ]
  },
  {
    id: "3",
    title: "University admission reform proposal",
    description: "Should universities prioritize standardized test scores or holistic application reviews in admissions?",
    category: "Education",
    totalVotes: 8932,
    timeRemaining: "5 days left",
    status: "active",
    options: [
      { id: "3a", text: "Holistic review process", votes: 5359, percentage: 60 },
      { id: "3b", text: "Standardized test focus", votes: 2680, percentage: 30 },
      { id: "3c", text: "Hybrid approach", votes: 893, percentage: 10 }
    ]
  },
  {
    id: "4",
    title: "City budget allocation priority",
    description: "What should be the top priority for next year's city budget increase?",
    category: "Local Government",
    totalVotes: 23456,
    timeRemaining: "2 weeks left",
    status: "active",
    options: [
      { id: "4a", text: "Public transportation", votes: 9382, percentage: 40 },
      { id: "4b", text: "Housing development", votes: 7037, percentage: 30 },
      { id: "4c", text: "Parks and recreation", votes: 4691, percentage: 20 },
      { id: "4d", text: "Technology infrastructure", votes: 2346, percentage: 10 }
    ]
  },
  {
    id: "5",
    title: "Remote work policy for government employees",
    description: "What should be the standard remote work policy for government employees post-pandemic?",
    category: "Government",
    totalVotes: 6789,
    timeRemaining: "Closed",
    status: "closed",
    options: [
      { id: "5a", text: "Fully remote option", votes: 2716, percentage: 40 },
      { id: "5b", text: "Hybrid (2-3 days remote)", votes: 3394, percentage: 50 },
      { id: "5c", text: "Full-time office return", votes: 679, percentage: 10 }
    ]
  },
  {
    id: "6",
    title: "Student loan forgiveness program",
    description: "What approach should be taken for student loan debt relief?",
    category: "Education",
    totalVotes: 0,
    timeRemaining: "Starts in 2 days",
    status: "upcoming",
    options: [
      { id: "6a", text: "Full forgiveness up to $50k", votes: 0, percentage: 0 },
      { id: "6b", text: "Income-based forgiveness", votes: 0, percentage: 0 },
      { id: "6c", text: "Interest rate reduction only", votes: 0, percentage: 0 },
      { id: "6d", text: "No forgiveness program", votes: 0, percentage: 0 }
    ]
  }
];

const categories = ["All", "Workplace", "Environment", "Education", "Local Government", "Government"];

export default function Index() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredPolls, setFilteredPolls] = useState(mockPolls);

  const handleVote = (pollId: string) => {
    navigate(`/poll/${pollId}`);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterPolls(term, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterPolls(searchTerm, category);
  };

  const filterPolls = (search: string, category: string) => {
    let filtered = mockPolls;
    
    if (category !== "All") {
      filtered = filtered.filter(poll => poll.category === category);
    }
    
    if (search) {
      filtered = filtered.filter(poll => 
        poll.title.toLowerCase().includes(search.toLowerCase()) ||
        poll.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFilteredPolls(filtered);
  };

  const totalVotes = mockPolls.reduce((sum, poll) => sum + poll.totalVotes, 0);
  const activePolls = mockPolls.filter(poll => poll.status === "active").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Your Voice,
              <span className="block text-primary-foreground/90">Your Choice</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed px-4">
              Join thousands of citizens making decisions that shape our future. Every vote counts, every voice matters.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Users className="h-6 w-6" />
                  <span className="text-2xl font-bold">{totalVotes.toLocaleString()}</span>
                </div>
                <p className="text-sm opacity-90">Total Votes Cast</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Zap className="h-6 w-6" />
                  <span className="text-2xl font-bold">{activePolls}</span>
                </div>
                <p className="text-sm opacity-90">Active Polls</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Globe className="h-6 w-6" />
                  <span className="text-2xl font-bold">24/7</span>
                </div>
                <p className="text-sm opacity-90">Democracy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search polls..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          
          {/* Filter Button */}
          <Button variant="outline" size="lg" className="md:w-auto w-full">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className="cursor-pointer px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Polls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolls.map((poll) => (
            <PollCard
              key={poll.id}
              poll={poll}
              onVote={handleVote}
            />
          ))}
        </div>

        {filteredPolls.length === 0 && (
          <div className="text-center py-12">
            <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No polls found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or category filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

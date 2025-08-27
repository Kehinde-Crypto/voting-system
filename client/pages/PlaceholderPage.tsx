import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, MessageCircle, ArrowLeft } from "lucide-react";

interface PlaceholderPageProps {
  title?: string;
  description?: string;
}

export default function PlaceholderPage({ 
  title = "Coming Soon", 
  description = "This feature is currently under development." 
}: PlaceholderPageProps) {
  const location = useLocation();
  const pageName = location.pathname.split('/')[1] || 'page';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md mx-auto">
          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Construction className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl capitalize">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                {description}
              </p>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  <span>Continue prompting to add content to this {pageName} page</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Button onClick={() => window.history.back()}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
                <Button variant="outline" onClick={() => window.location.href = "/"}>
                  Return to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

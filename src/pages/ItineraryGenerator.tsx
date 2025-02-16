import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Share2, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { generateItinerary } from "@/services/groqService";

const ItineraryGenerator = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    destination: "",
    duration: 7,
    budget: 1000,
    interests: "culture",
    date: new Date(),
  });

  React.useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to access the AI Travel Planner");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const generatedItinerary = await generateItinerary({
        destination: formData.destination,
        duration: formData.duration,
        budget: formData.budget,
        interests: formData.interests,
      });
      
      setItinerary(generatedItinerary);
      toast.success("Itinerary generated successfully!");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to generate itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    toast.success("Itinerary shared successfully!");
  };

  const handleSave = () => {
    toast.success("Itinerary saved to your profile!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">AI Travel Planner</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Plan Your Trip</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      placeholder="Enter city or country"
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Trip Duration (days)</Label>
                    <Slider
                      value={[formData.duration]}
                      onValueChange={(value) => setFormData({...formData, duration: value[0]})}
                      min={1}
                      max={30}
                    />
                    <span className="text-sm text-muted-foreground">{formData.duration} days</span>
                  </div>

                  <div className="space-y-2">
                    <Label>Budget (USD)</Label>
                    <Slider
                      value={[formData.budget]}
                      onValueChange={(value) => setFormData({...formData, budget: value[0]})}
                      min={100}
                      max={10000}
                      step={100}
                    />
                    <span className="text-sm text-muted-foreground">${formData.budget}</span>
                  </div>

                  <div className="space-y-2">
                    <Label>Main Interest</Label>
                    <Select
                      value={formData.interests}
                      onValueChange={(value) => setFormData({...formData, interests: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="culture">Culture & History</SelectItem>
                        <SelectItem value="nature">Nature & Adventure</SelectItem>
                        <SelectItem value="food">Food & Cuisine</SelectItem>
                        <SelectItem value="relaxation">Relaxation & Wellness</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Itinerary...
                      </>
                    ) : (
                      "Generate Itinerary"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {itinerary && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Custom Itinerary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm">
                      {itinerary}
                    </pre>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <Button onClick={handleSave} variant="outline" className="flex-1">
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button onClick={handleShare} variant="outline" className="flex-1">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryGenerator;

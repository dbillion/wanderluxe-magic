
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
import { Loader2, Share2, Save } from "lucide-react";
import { toast } from "sonner";
import { generateItinerary } from "@/services/groqService";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <div className="pt-32 container mx-auto px-4 relative">
        <Floating className="pointer-events-none">
          <FloatingElement depth={0.1} className="absolute -top-20 -left-20">
            <div className="w-40 h-40 bg-purple-200/20 rounded-full blur-3xl" />
          </FloatingElement>
          <FloatingElement depth={0.2} className="absolute top-40 -right-20">
            <div className="w-60 h-60 bg-blue-200/20 rounded-full blur-3xl" />
          </FloatingElement>
        </Floating>

        <div className="max-w-4xl mx-auto relative">
          <motion.h1 
            className="text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            AI Travel Planner
          </motion.h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="backdrop-blur-sm bg-white/80 shadow-xl">
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
                        className="bg-white/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Trip Duration (days)</Label>
                      <Slider
                        value={[formData.duration]}
                        onValueChange={(value) => setFormData({...formData, duration: value[0]})}
                        min={1}
                        max={30}
                        className="py-4"
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
                        className="py-4"
                      />
                      <span className="text-sm text-muted-foreground">${formData.budget}</span>
                    </div>

                    <div className="space-y-2">
                      <Label>Main Interest</Label>
                      <Select
                        value={formData.interests}
                        onValueChange={(value) => setFormData({...formData, interests: value})}
                      >
                        <SelectTrigger className="bg-white/50">
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
            </motion.div>

            {itinerary && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="backdrop-blur-sm bg-white/80 shadow-xl">
                  <CardHeader>
                    <CardTitle>Your Custom Itinerary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <div className="max-h-[500px] overflow-y-auto pr-4 space-y-4">
                        {itinerary.split('\n').map((line, index) => (
                          <p key={index} className="text-sm">{line}</p>
                        ))}
                      </div>
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
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryGenerator;

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/contexts/AuthContext";
import { generateItinerary } from "@/services/groqService";
import { Loader2, Save, Share2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Import types
import type { DayItinerary, ItineraryResponse } from '@/services/groqService';

const ItineraryGenerator = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [itineraryData, setItineraryData] = useState<ItineraryResponse | null>(null);
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

      setItineraryData(generatedItinerary);
      toast.success("Itinerary generated successfully!");
    } catch (error) {
      console.error("Error:", error);
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
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle>AI Travel Planner</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Label>Destination</Label>
            <Input
              value={formData.destination}
              onChange={(e) =>
                setFormData({ ...formData, destination: e.target.value })
              }
            />

            <Label>Trip Duration (days)</Label>
            <Slider
              value={[formData.duration]}
              onChange={(value) =>
                setFormData({ ...formData, duration: value[0] })
              }
              min={1}
              max={30}
            />
            <p>{formData.duration} days</p>

            <Label>Budget (USD)</Label>
            <Slider
              value={[formData.budget]}
              onChange={(value) =>
                setFormData({ ...formData, budget: value[0] })
              }
              min={100}
              max={10000}
              step={100}
            />
            <p>${formData.budget}</p>

            <Label>Main Interest</Label>
            <Select
              value={formData.interests}
              onValueChange={(value) =>
                setFormData({ ...formData, interests: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an interest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="culture">Culture & History</SelectItem>
                <SelectItem value="nature">Nature & Adventure</SelectItem>
                <SelectItem value="food">Food & Cuisine</SelectItem>
                <SelectItem value="relaxation">Relaxation & Wellness</SelectItem>
              </SelectContent>
            </Select>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Itinerary...
                </>
              ) : (
                "Generate Itinerary"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Itinerary Display */}
      {itineraryData && (
        <Card>
          <CardHeader>
            <CardTitle>Your Custom Itinerary</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Budget Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Total Budget: ${formData.budget}</p>
                <p>Total Cost: ${itineraryData.budgetBreakdown.totalCost}</p>
                <p>Remaining: ${itineraryData.budgetBreakdown.remaining}</p>
              </CardContent>
            </Card>

            {/* Daily Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Itinerary</CardTitle>
              </CardHeader>
              <CardContent>
                {itineraryData.dailyItinerary.map((day: DayItinerary) => (
                  <div key={day.day}>
                    <h3>Day {day.day}</h3>
                    {day.activities.map((activity, idx) => (
                      <p key={idx}>
                        {activity.time}: {activity.description}
                        {activity.cost && <span> Cost: ${activity.cost}</span>}
                      </p>
                    ))}
                    <p>
                      Daily Budget:
                      <br />
                      Accommodation: ${day.budget.accommodation}
                      <br />
                      Food: ${day.budget.food}
                      <br />
                      Transportation: ${day.budget.transportation}
                      <br />
                      Activities: ${day.budget.activities}
                      <br />
                      Total: ${day.budget.total}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Hotel Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Hotel Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                {itineraryData.hotelRecommendations.map((hotel) => (
                  <div key={hotel.name}>
                    <p>{hotel.name}</p>
                    <p>${hotel.pricePerNight}/night</p>
                    <p>Location: {hotel.location}</p>
                    <p>Rating: {hotel.rating}/5</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Must-See Attractions */}
            <Card>
              <CardHeader>
                <CardTitle>Must-See Attractions</CardTitle>
              </CardHeader>
              <CardContent>
                {itineraryData.mustSeeAttractions.map((attraction) => (
                  <div key={attraction.name}>
                    <p>{attraction.name}</p>
                    <p>Duration: {attraction.suggestedDuration}</p>
                    <p>Cost: ${attraction.estimatedCost}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Actions */}
            <div>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Save
              </Button>
              <Button onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ItineraryGenerator;
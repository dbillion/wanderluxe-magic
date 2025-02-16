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

// Add type imports
import type { Activity, Attraction, DayItinerary, Hotel, ItineraryResponse } from '@/services/groqService';

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
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">AI Travel Planner</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form Section */}
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
                      onChange={(e) =>
                        setFormData({ ...formData, destination: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Trip Duration (days)</Label>
                    <Slider
                      value={[formData.duration]}
                      onValueChange={(value) =>
                        setFormData({ ...formData, duration: value[0] })
                      }
                      min={1}
                      max={30}
                    />
                    <span className="text-sm text-muted-foreground">
                      {formData.duration} days
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Label>Budget (USD)</Label>
                    <Slider
                      value={[formData.budget]}
                      onValueChange={(value) =>
                        setFormData({ ...formData, budget: value[0] })
                      }
                      min={100}
                      max={10000}
                      step={100}
                    />
                    <span className="text-sm text-muted-foreground">
                      ${formData.budget}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Label>Main Interest</Label>
                    <Select
                      value={formData.interests}
                      onValueChange={(value) =>
                        setFormData({ ...formData, interests: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="culture">Culture & History</SelectItem>
                        <SelectItem value="nature">Nature & Adventure</SelectItem>
                        <SelectItem value="food">Food & Cuisine</SelectItem>
                        <SelectItem value="relaxation">
                          Relaxation & Wellness
                        </SelectItem>
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

            {/* Itinerary Display */}
            {itineraryData && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Custom Itinerary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Budget Overview */}
                  <div className="mb-8 p-4 bg-muted rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Total Budget:</span> ${formData.budget}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Total Cost:</span> ${itineraryData.budgetBreakdown.totalCost}
                        </p>
                        <p className="text-sm text-green-600">
                          <span className="font-medium">Remaining:</span> ${itineraryData.budgetBreakdown.remaining}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Daily Itinerary */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Daily Itinerary</h2>
                    {itineraryData.dailyItinerary.map((day: DayItinerary) => (
                      <div key={day.day} className="mb-6 p-4 border rounded-md shadow-sm hover:shadow-lg transition duration-300">
                        <h3 className="text-lg font-medium mb-2">Day {day.day}</h3>
                        <div className="space-y-4">
                          {day.activities.map((activity: Activity, idx: number) => (
                            <div key={idx} className="flex flex-col space-y-1">
                              <span className="font-medium capitalize">{activity.time}:</span>
                              <p className="text-gray-600">{activity.description}</p>
                              {activity.cost && (
                                <p className="text-sm text-gray-500">Cost: ${activity.cost}</p>
                              )}
                            </div>
                          ))}
                          <div className="mt-4 pt-4 border-t">
                            <p className="text-sm font-medium">Daily Budget:</p>
                            <ul className="text-sm text-gray-600 mt-1">
                              <li>Accommodation: ${day.budget.accommodation}</li>
                              <li>Food: ${day.budget.food}</li>
                              <li>Transportation: ${day.budget.transportation}</li>
                              <li>Activities: ${day.budget.activities}</li>
                              <li className="font-medium">Total: ${day.budget.total}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Hotel Recommendations */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Hotel Recommendations</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {itineraryData.hotelRecommendations.map((hotel: Hotel) => (
                        <div key={hotel.name} className="p-4 border rounded-md">
                          <h3 className="font-medium">{hotel.name}</h3>
                          <p className="text-sm text-gray-500 mt-2">
                            ${hotel.pricePerNight}/night
                          </p>
                          <p className="text-sm text-gray-500">Location: {hotel.location}</p>
                          <p className="text-sm text-gray-500">Rating: {hotel.rating}/5</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Must-See Attractions */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Must-See Attractions</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {itineraryData.mustSeeAttractions.map((attraction: Attraction) => (
                        <div key={attraction.name} className="p-4 border rounded-md">
                          <h3 className="font-medium">{attraction.name}</h3>
                          <p className="text-sm text-gray-600">Duration: {attraction.suggestedDuration}</p>
                          <p className="text-sm text-gray-500">Cost: ${attraction.estimatedCost}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
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
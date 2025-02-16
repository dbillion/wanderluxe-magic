import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { generateItinerary } from "@/services/groqService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Import types
import type { ItineraryResponse } from '@/services/groqService';

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
                {itineraryData.dailyItinerary.map((day) => (
                  <div key={day.day}>
                    <h3>Day {day.day}: {day.location}</h3>
                    {day.activities.map((activity, idx) => (
                      <p key={idx}>
                        {activity.time}: {activity.description}
                        {activity.cost > 0 && <span> Cost: ${activity.cost}</span>}
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
                Save
              </Button>
              <Button onClick={handleShare}>
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ItineraryGenerator;
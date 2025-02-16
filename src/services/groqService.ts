import { Groq } from 'groq-sdk';

// Define types for clarity
interface TripParams {
  destination: string;
  duration: number;
  budget: number;
  interests: string;
}

interface Activity {
  time: string;
  description: string;
  cost?: number;
}

interface DayItinerary {
  day: number;
  activities: Activity[];
  budget: {
    accommodation: number;
    food: number;
    transportation: number;
    activities: number;
    total: number;
  };
}

interface Hotel {
  name: string;
  pricePerNight: number;
  location: string;
  rating: number;
}

interface Attraction {
  name: string;
  estimatedCost: number;
  suggestedDuration: string;
}

interface ItineraryResponse {
  dailyItinerary: DayItinerary[];
  hotelRecommendations: Hotel[];
  mustSeeAttractions: Attraction[];
  budgetBreakdown: {
    totalCost: number;
    remaining: number;
  };
}

// Helper function to clean and parse the generated JSON
const cleanJSON = (text: string): string => {
  const cleanup = text
    .replace(/<.*?>/g, '') // Remove HTML-like tags
    .replace(/^[^{]*/, '') // Remove everything before the first `{`
    .replace(/```(?:json)?\s*([\s\S]*?)\s*```/, '$1') // Extract JSON content
    .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3') // Add quotes around keys
    .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
    .replace(/"?\$(\d+(?:\.\d+)?)"?/g, '$1'); // Normalize currency

  try {
    return JSON.stringify(JSON.parse(cleanup));
  } catch {
    return JSON.stringify({
      dailyItinerary: [],
      hotelRecommendations: [],
      mustSeeAttractions: [],
      budgetBreakdown: { totalCost: 0, remaining: 0 },
    });
  }
};

// Function to generate itinerary
export const generateItinerary = async (params: TripParams): Promise<ItineraryResponse> => {
  const groq = new Groq({
    apiKey: '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', // Replace with your actual API key
    dangerouslyAllowBrowser: true,
  });

  try {
    const { choices: [message] } = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Return ONLY valid JSON for a travel itinerary without markdown or extra text.',
        },
        {
          role: 'user',
          content: `Create a ${params.duration}-day ${params.destination} itinerary for $${params.budget} focusing on ${params.interests}.`,
        },
      ],
      model: 'deepseek-r1-distill-llama-70b',
      temperature: 0.7,
      stream: false,
    });

    const parsed = JSON.parse(cleanJSON(message?.content || ''));

    // Calculate daily budget
    const dailyBudget = params.budget / params.duration;

    // Generate daily itinerary
    const dailyItinerary = Array.from({ length: params.duration }, (_, i) => {
      const dayData = parsed.itinerary?.days?.[i] || {};
      const activities = dayData.events?.map((event: any) => ({
        time: event.time || 'all-day',
        description: event.activity || `Day ${i + 1} activities to be planned`,
        cost: event.cost || 0,
      })) || [];

      const totalActivityCost = activities.reduce((sum, activity) => sum + (activity.cost || 0), 0);

      return {
        day: i + 1,
        activities,
        budget: {
          accommodation: dayData.accommodation?.cost || dailyBudget * 0.4,
          food: dailyBudget * 0.2,
          transportation: dailyBudget * 0.15,
          activities: totalActivityCost || dailyBudget * 0.15,
          total: dailyBudget,
        },
      };
    });

    // Generate hotel recommendations
    const hotelRecommendations = (parsed.hotelRecommendations || []).slice(0, 3).map((h: any) => ({
      name: h.name || 'Standard Hotel',
      pricePerNight: Number(h.pricePerNight) || dailyBudget * 0.4,
      location: h.location || params.destination,
      rating: Math.min(Number(h.rating) || 3, 5),
    }));

    // Generate must-see attractions
    const mustSeeAttractions = (parsed.mustSeeAttractions || []).slice(0, 5).map((a: any) => ({
      name: a.name || 'Local Attraction',
      estimatedCost: Number(a.estimatedCost) || dailyBudget * 0.1,
      suggestedDuration: a.suggestedDuration || '1-2 hours',
    }));

    // Calculate budget breakdown
    const totalCost = dailyItinerary.reduce(
      (sum, day) => sum + day.budget.accommodation + day.budget.food + day.budget.transportation + day.budget.activities,
      0
    );
    const remaining = params.budget - totalCost;

    return {
      dailyItinerary,
      hotelRecommendations,
      mustSeeAttractions,
      budgetBreakdown: {
        totalCost,
        remaining,
      },
    };
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw new Error('Failed to generate travel plan');
  }
};
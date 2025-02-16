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

// Add this helper function at the top with other interfaces
const getDefaultActivity = (dayNum: number): Activity => ({
  time: 'all-day',
  description: `Day ${dayNum} activities to be planned`,
  cost: 0
});

// Helper function to clean and parse the generated JSON
const cleanJSON = (text) => {
  const cleanup = text
    .replace(/<.*?>/g, '') // Remove HTML-like tags
    .replace(/^[^{]*/, '') // Remove everything before the first `{`
    .replace(/```(?:json)?\s*([\s\S]*?)\s*```/, '$1') // Extract JSON content
    .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3') // Add quotes around keys
    .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
    .replace(/"?\$(\d+(?:\.\d+)?)"?/g, '$1'); // Normalize currency

  try {
    return JSON.parse(cleanup);
  } catch (error) {
    console.error('Invalid JSON:', error);
    return {};
  }
};

// Replace the existing generateItinerary function
export const generateItinerary = async (params: TripParams): Promise<ItineraryResponse> => {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || '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',
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
    
    // Map the API response to your interface
    return {
      dailyItinerary: parsed.itinerary?.days?.map((day: any) => ({
        day: day.day,
        activities: day.events?.map((event: any) => ({
          time: event.time,
          description: event.activity,
          cost: event.cost
        })) || [getDefaultActivity(day.day)],
        budget: {
          accommodation: day.accommodation?.cost || 0,
          food: day.events?.filter((e: any) => e.time.includes('meal')).reduce((sum: number, e: any) => sum + e.cost, 0) || 0,
          transportation: day.events?.filter((e: any) => e.activity.includes('transport')).reduce((sum: number, e: any) => sum + e.cost, 0) || 0,
          activities: day.events?.filter((e: any) => !e.activity.includes('transport') && !e.time.includes('meal')).reduce((sum: number, e: any) => sum + e.cost, 0) || 0,
          total: (day.accommodation?.cost || 0) + (day.events?.reduce((sum: number, e: any) => sum + (e.cost || 0), 0) || 0)
        }
      })) || [],
      hotelRecommendations: parsed.hotelRecommendations?.map((h: any) => ({
        name: h.name || 'Standard Hotel',
        pricePerNight: h.pricePerNight || params.budget * 0.4,
        location: h.location || params.destination,
        rating: Math.min(h.rating || 3, 5)
      })) || [],
      mustSeeAttractions: parsed.mustSeeAttractions?.map((a: any) => ({
        name: a.name || 'Local Attraction',
        estimatedCost: a.estimatedCost || params.budget * 0.1,
        suggestedDuration: a.suggestedDuration || '1-2 hours'
      })) || [],
      budgetBreakdown: {
        totalCost: parsed.itinerary?.total_cost || params.budget * 0.9,
        remaining: params.budget - (parsed.itinerary?.total_cost || params.budget * 0.9)
      }
    };
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw new Error('Failed to generate travel plan');
  }
};
import { Groq } from 'groq-sdk';

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

const getDefaultActivity = (day: number): Activity => ({
  time: 'all-day',
  description: `Day ${day} activities to be planned`,
  cost: 0
});

const cleanJSON = (text: string): string => {
  const cleanup = text
    .replace(/<think>.*?<\/think>/gs, '')
    .replace(/^[^{]*/, '')
    .replace(/```(?:json)?\s*([\s\S]*?)\s*```/, '$1')
    .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3')
    .replace(/,(\s*[}\]])/g, '$1')
    .replace(/"?\$(\d+(?:\.\d+)?)"?/g, '$1');

  try {
    return JSON.stringify(JSON.parse(cleanup));
  } catch {
    return JSON.stringify({
      dailyItinerary: [],
      hotelRecommendations: [],
      mustSeeAttractions: [],
      budgetBreakdown: { totalCost: 0, remaining: 0 }
    });
  }
};

export const generateItinerary = async (params: TripParams): Promise<ItineraryResponse> => {
  const groq = new Groq({
    apiKey: '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',
    dangerouslyAllowBrowser: true
  });

  try {
    const { choices: [message] } = await groq.chat.completions.create({
      messages: [
        { 
          role: 'system', 
          content: 'Return ONLY valid JSON for a travel itinerary without markdown or extra text.' 
        },
        { 
          role: 'user', 
          content: `Create a ${params.duration}-day ${params.destination} itinerary for $${params.budget} focusing on ${params.interests}.` 
        }
      ],
      model: 'deepseek-r1-distill-llama-70b',
      temperature: 0.7,
      stream: false
    });

    const parsed = JSON.parse(cleanJSON(message?.content || ''));
    const dailyBudget = params.budget / params.duration;

    return {
      dailyItinerary: Array.from({ length: params.duration }, (_, i) => ({
        day: i + 1,
        activities: parsed.dailyItinerary?.[i]?.activities || [getDefaultActivity(i + 1)],
        budget: {
          accommodation: parsed.dailyItinerary?.[i]?.budget?.accommodation || dailyBudget * 0.4,
          food: parsed.dailyItinerary?.[i]?.budget?.food || dailyBudget * 0.2,
          transportation: parsed.dailyItinerary?.[i]?.budget?.transportation || dailyBudget * 0.15,
          activities: parsed.dailyItinerary?.[i]?.budget?.activities || dailyBudget * 0.15,
          total: dailyBudget
        }
      })),
      hotelRecommendations: (parsed.hotelRecommendations || []).slice(0, 3).map((h: any) => ({
        name: h?.name || 'Standard Hotel',
        pricePerNight: Number(h?.pricePerNight) || dailyBudget * 0.4,
        location: h?.location || params.destination,
        rating: Math.min(Number(h?.rating) || 3, 5)
      })),
      mustSeeAttractions: (parsed.mustSeeAttractions || []).slice(0, 5).map((a: any) => ({
        name: a?.name || 'Local Attraction',
        estimatedCost: Number(a?.estimatedCost) || dailyBudget * 0.1,
        suggestedDuration: a?.suggestedDuration || '1-2 hours'
      })),
      budgetBreakdown: {
        totalCost: parsed.budgetBreakdown?.totalCost || params.budget * 0.9,
        remaining: parsed.budgetBreakdown?.remaining || params.budget * 0.1
      }
    };
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw new Error('Failed to generate travel plan');
  }
};

import { Groq } from 'groq-sdk';

// Budget allocation constants
const BUDGET_ALLOCATIONS = {
  ACCOMMODATION: 0.35,
  FOOD: 0.25,
  TRANSPORTATION: 0.20,
  ACTIVITIES: 0.15,
  SAVINGS: 0.05
} as const;

interface TripParams {
  destination: string;
  duration: number;
  budget: number;
  interests: string;
}

interface BudgetBreakdown {
  accommodation: number;
  food: number;
  transportation: number;
  activities: number;
  savings: number;
  total: number;
  daily: number;
}

const calculateBudgetBreakdown = (totalBudget: number, duration: number): BudgetBreakdown => {
  const total = totalBudget;
  const daily = total / duration;

  return {
    accommodation: total * BUDGET_ALLOCATIONS.ACCOMMODATION,
    food: total * BUDGET_ALLOCATIONS.FOOD,
    transportation: total * BUDGET_ALLOCATIONS.TRANSPORTATION,
    activities: total * BUDGET_ALLOCATIONS.ACTIVITIES,
    savings: total * BUDGET_ALLOCATIONS.SAVINGS,
    total: total,
    daily: daily
  };
};

export const generateItinerary = async (params: TripParams): Promise<string> => {
  const groq = new Groq({
    apiKey: "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",
    dangerouslyAllowBrowser: true
  });

  const budgetBreakdown = calculateBudgetBreakdown(params.budget, params.duration);
  
  const prompt = `As an AI travel planner, create a detailed ${params.duration}-day itinerary for a trip to ${params.destination} with the following budget breakdown:
    - Daily Budget: $${budgetBreakdown.daily.toFixed(2)}
    - Accommodation: $${budgetBreakdown.accommodation.toFixed(2)} total
    - Food & Dining: $${budgetBreakdown.food.toFixed(2)} total
    - Transportation: $${budgetBreakdown.transportation.toFixed(2)} total
    - Activities: $${budgetBreakdown.activities.toFixed(2)} total
    - Emergency Savings: $${budgetBreakdown.savings.toFixed(2)}
    
  The traveler is interested in ${params.interests}. Include daily activities, recommended places to visit, and estimated timing. Format the response in a clear, day-by-day structure with budget considerations for each activity.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an experienced travel planner who creates detailed, personalized travel itineraries with budget-conscious recommendations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "deepseek-r1-distill-llama-70b",
      temperature: 0.6,
      max_tokens: 4096,
      top_p: 0.95,
      stream: false
    });

    return completion.choices[0]?.message?.content || 'Could not generate itinerary';
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw new Error('Failed to generate itinerary');
  }
};

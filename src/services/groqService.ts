
import { Groq } from 'groq-sdk';

interface TripParams {
  destination: string;
  duration: number;
  budget: number;
  interests: string;
}

export const generateItinerary = async (params: TripParams): Promise<string> => {
  const groq = new Groq({
    apiKey: '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',
    dangerouslyAllowBrowser: true  // Add this option to allow browser usage
  });

  const prompt = `As an AI travel planner, create a detailed ${params.duration}-day itinerary for a trip to ${params.destination} with a budget of $${params.budget}. The traveler is interested in ${params.interests}. Include daily activities, recommended places to visit, and estimated timing. Format the response in a clear, day-by-day structure.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an experienced travel planner who creates detailed, personalized travel itineraries."
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
}

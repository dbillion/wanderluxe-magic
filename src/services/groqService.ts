import { Groq } from 'groq-sdk';

interface TripParams {
  destination: string;
  duration: number;
  budget: number;
  interests: string;
}

export const generateItinerary = async (params: TripParams): Promise<object> => {
  const groq = new Groq({
    apiKey: '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',
    dangerouslyAllowBrowser: true,
  });

  const prompt = `As an AI travel planner, create a detailed ${params.duration}-day itinerary for a trip to ${params.destination} with a budget of $${params.budget}. The traveler is interested in ${params.interests}.
  
Return the result as a JSON object with the following fields:
1. "dailyItinerary": An array of objects, each representing a day.
2. "hotelRecommendations": An array of hotel recommendations.
3. "mustSeeAttractions": An array of must-see attractions.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are an experienced travel planner who creates detailed, personalized travel itineraries.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'deepseek-r1-distill-llama-70b',
      temperature: 0.6,
      max_tokens: 4096,
      top_p: 0.95,
      stream: false,
    });

    let rawOutput = completion.choices[0]?.message?.content || 'Could not generate itinerary';
    console.log("Raw Output:", rawOutput);

    // Remove any <think> ... </think> blocks
    let cleanedOutput = rawOutput.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

    // If the JSON is wrapped in markdown code fences, extract the JSON portion.
    const codeBlockRegex = /```json\s*([\s\S]*?)\s*```/;
    const codeBlockMatch = cleanedOutput.match(codeBlockRegex);
    if (codeBlockMatch && codeBlockMatch[1]) {
      cleanedOutput = codeBlockMatch[1].trim();
    }

    return JSON.parse(cleanedOutput);
  } catch (error: any) {
    console.error('Error generating itinerary:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    throw new Error('Failed to generate itinerary');
  }
};
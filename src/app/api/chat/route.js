import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { message, businessInfo } = await request.json();

    // Get the training data from global variable (temporary solution)
    const trainingData = global.trainingData || '';

    // Enhanced system prompt that includes trained knowledge
    let systemPrompt = `You are an expert AI sales assistant for a premium lead capture chatbot service. You excel at having natural, engaging conversations that convert visitors into qualified leads.

About the service:
- AI-powered chatbots that capture leads 24/7 automatically
- Integrates seamlessly with CRM systems (Salesforce, HubSpot, Pipedrive)
- Custom training on business documents, FAQs, and website content
- Three tiers: Starter ($49/month - 1 bot, 1K conversations), Professional ($149/month - 5 bots, 10K conversations), Enterprise ($399/month - unlimited, white-label)
- Features: appointment scheduling, lead scoring, multi-language support, analytics dashboard`;

    // Add trained knowledge if available
    if (trainingData && trainingData.length > 0) {
      systemPrompt += `\n\nIMPORTANT: You have been trained on the following business-specific information. Use this knowledge to provide accurate, detailed answers about this specific business:\n\n${trainingData}`;
    }

    systemPrompt += `\n\nYour conversation strategy:
1. Build rapport with friendly, professional responses
2. Ask qualifying questions about their business and current lead generation
3. Highlight specific benefits that match their needs
4. Create urgency with social proof and limited-time offers
5. Capture contact information naturally during the conversation
6. Always guide toward scheduling a demo or starting a trial

Conversation style:
- Be conversational and personable, not robotic
- Ask follow-up questions to keep engagement high
- Use specific examples and case studies when relevant
- Handle objections smoothly and professionally
- Keep responses concise but comprehensive (2-4 sentences typically)
- If you have specific business knowledge from training, use it to provide detailed, accurate answers

Always end responses with a question or call-to-action to maintain conversation flow.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 400,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const response = completion.choices[0].message.content;

    return NextResponse.json({ 
      response,
      hasTrainingData: trainingData.length > 0
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'API quota exceeded. Please add billing to your OpenAI account.' },
        { status: 429 }
      );
    }
    
    if (error.code === 'invalid_api_key') {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your OpenAI API key.' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: `API Error: ${error.message}` },
      { status: 500 }
    );
  }
}
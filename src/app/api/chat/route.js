import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export async function POST(request) {
  console.log('API route called');
  console.log('Environment check - API key exists:', !!process.env.OPENAI_API_KEY);
  console.log('API key starts with sk-:', process.env.OPENAI_API_KEY?.startsWith('sk-'));

  try {
    const { message, businessInfo } = await request.json();
    console.log('Received message:', message);

    if (!process.env.OPENAI_API_KEY) {
      console.error('No OpenAI API key found');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    console.log('OpenAI client created, making API call...');

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful AI assistant for a chatbot service." },
        { role: "user", content: message }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    console.log('OpenAI API call successful');
    const response = completion.choices[0].message.content;

    return NextResponse.json({ response });
  } catch (error) {
    console.error('=== FULL ERROR DETAILS ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error status:', error.status);
    console.error('Full error:', error);
    console.error('=== END ERROR DETAILS ===');
    
    return NextResponse.json(
      { error: `API Error: ${error.message}` },
      { status: 500 }
    );
  }
}

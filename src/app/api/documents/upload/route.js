import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const websiteUrl = formData.get('websiteUrl');
    const textContent = formData.get('textContent');

    let extractedText = '';
    let title = '';
    let type = '';

    if (file) {
      title = file.name;
      if (file.type === 'text/plain') {
        extractedText = await file.text();
        type = 'text';
      } else {
        return NextResponse.json(
          { error: 'Only text files are supported for now' },
          { status: 400 }
        );
      }
    } else if (textContent) {
      extractedText = textContent;
      title = 'Custom Text Content';
      type = 'text';
    } else {
      return NextResponse.json(
        { error: 'No content provided' },
        { status: 400 }
      );
    }

    if (!extractedText || extractedText.length < 10) {
      return NextResponse.json(
        { error: 'Content too short. Please provide more substantial content.' },
        { status: 400 }
      );
    }

    // Clean the text
    const cleanedText = extractedText
      .replace(/\s+/g, ' ')
      .trim();

    // For now, we'll just simulate storing it (in a real app, you'd save to database)
    console.log('Training data received:', {
      title,
      type,
      wordCount: cleanedText.split(' ').length,
      preview: cleanedText.substring(0, 200)
    });

    // Store in global variable for this session (temporary solution)
    global.trainingData = cleanedText;

    return NextResponse.json({
      success: true,
      message: `Successfully processed "${title}"`,
      wordCount: cleanedText.split(' ').length,
      preview: cleanedText.substring(0, 300) + '...',
      type: type
    });

  } catch (error) {
    console.error('Document upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process document. Please try again.' },
      { status: 500 }
    );
  }
}
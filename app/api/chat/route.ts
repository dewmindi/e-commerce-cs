import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json(); // Expecting messages array: [{ role: 'user', content: '...' }]
    const userMessage = messages[messages.length - 1].content;
    
    // Format history for context. Note: Gemini API handles history differently in chat sessions,
    // but for simple completion with context, we can append previous QA pairs to prompt or use startChat.
    // For simplicity with large context, we'll just append the latest question, or maybe last few.
    
    const history = messages.slice(0, -1).map((m: any) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');


    const apiKey = process.env.NEXT_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Updated to use the latest available flash model based on listModels result
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Read the website content
    const filePath = path.join(process.cwd(), "chatbot-data", "website-copy.txt");
    let websiteContext = "";
    try {
      websiteContext = fs.readFileSync(filePath, "utf-8");
    } catch (error) {
      console.error("Error reading website context:", error);
      // Fallback or error if context is strictly required
    }

    const prompt = `
You are a helpful AI assistant for this website. 
Here is the content of the website:

<website_content>
${websiteContext.slice(0, 500000)} 
</website_content>
(Note: Content truncated if too long, though Gemini 1.5 context window is large)

Answer the user's question based on the website content provided above. 
If the answer is not in the content, politely say you don't have that information.
Keep your answers concise and relevant to the user's question.

User Question: ${userMessage}
`; 
// Actually using the full history in prompt
    const fullPrompt = `
You are a helpful AI assistant for this website. 
Here is the content of the website:

<website_content>
${websiteContext.slice(0, 500000)} 
</website_content>

Answer the user's question based on the website content provided above. 
    
Guidelines for your response:
1. Be concise and get straight to the point.
2. Use short paragraphs (max 2-3 sentences).
3. Use bullet points or numbered lists where appropriate to break up text.
4. Use bold text for key terms or important emphasis.
5. If the answer involves steps, use a numbered list.
6. If the user greets you, greet them back briefly.
7. If the answer is not in the content, politely say you don't have that information.

Conversation History:
${history}

User Question: ${userMessage}
`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

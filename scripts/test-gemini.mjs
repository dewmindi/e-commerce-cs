import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// Load env vars manually
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/NEXT_GEMINI_API_KEY=(.*)/);
const apiKey = match ? match[1].trim().replace(/['"]/g, '') : null;

if (!apiKey) {
    console.error("No API key found in .env.local");
    process.exit(1);
}

// process.env.NEXT_GEMINI_API_KEY = apiKey;

async function run() {
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    try {
        console.log("Fetching models...");
        const response = await fetch(listUrl);
        const data = await response.json();
        
        if (data.error) {
            console.error("API Error:", JSON.stringify(data.error, null, 2));
            return;
        }

        const models = data.models || [];
        console.log("Available models:", models.map(m => m.name));

        // Find a gemini model that supports generateContent
        const textModels = models.filter(m => 
            m.supportedGenerationMethods.includes("generateContent") && 
            m.name.includes("gemini")
        );
        
        if (textModels.length > 0) {
            // Prefer gemini-1.5-flash if available
            let selectedModel = textModels.find(m => m.name.includes('gemini-1.5-flash'))?.name || textModels[0].name;
            selectedModel = selectedModel.replace('models/', '');
            
            console.log(`\nSelected model for test: ${selectedModel}`);
            
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: selectedModel });
            
            const result = await model.generateContent("Hello there");
            const responseTxt = await result.response.text();
            console.log("Response:", responseTxt);
        } else {
            console.log("No suitable Gemini text generation models found.");
        }

    } catch (e) {
        console.error("Script error:", e);
    }
}

run();

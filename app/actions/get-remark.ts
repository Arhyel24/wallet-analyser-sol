import { GoogleGenerativeAI } from "@google/generative-ai";
const apikey = process.env.NEXT_PUBLIC_GEMINIKEY!;

export default async function getremark(msg: string, difficulty: string) {
  const generativeAI = new GoogleGenerativeAI(apikey);
  try {
    const model = generativeAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    let prompt = "";

    switch (difficulty) {
      case "noobie":
        prompt = `Take a look at the wallet's balance and recent activities, and explain everything in simple terms that even a beginner would understand. Use friendly language, fun emojis, and make the user feel encouraged. Add easy-to-follow tips to help them grow their holdings and improve their wallet's performance. Here's the wallet info: ${msg}. Summarize it in one cheerful and easy-to-read sentence, Return a  500 character long sentence.`;

        break;
      case "pro":
        prompt = `Analyze the wallet's balance, transactions, and holdings with a professional lens. Keep the tone knowledgeable yet approachable. Highlight key strengths, pinpoint areas of improvement, and suggest intermediate-level strategies for optimizing gains. Feel free to add a bit of personality with emojis and light humor to keep it engaging. Here's the wallet info: ${msg}. Summarize your analysis in one sharp and insightful sentence,  Return a  500 character long sentence.`;
        break;
      case "savage":
        prompt = `Dive deep into the wallet's balance, activities, and holdings, and provide a brutally honest review with a bold, savage tone. Don't hold back—tease the user if necessary, but make sure to back it up with actionable advice on how they can step up their game and maximize their wallet's potential. Use witty humor, sharp observations, and a few choice emojis to keep it spicy. Here's the wallet info: ${msg}. Deliver your verdict in one savage yet constructive sentence, Return a  500 character long sentence.`;

        break;
    }

    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    // console.log(text);

    return text;
  } catch (error) {
    console.error(error);
    return "Failed to generate a response";
  }
}

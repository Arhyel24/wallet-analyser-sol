import { GoogleGenerativeAI } from "@google/generative-ai";
const apikey = process.env.NEXT_PUBLIC_GEMINIKEY!;

export default async function getremark(msg: string) {
  const generativeAI = new GoogleGenerativeAI(apikey);
  try {
    const model = generativeAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `Review the wallet's balance and recent activities. Give a 220 characters long review of the balance, make sure it sounds interesting and fun, you can add emojis. Here's the wallet balance: ${msg}. Return a single sentence text.`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    // console.log(text);

    return text;
  } catch (error) {
    console.error(error);
    return "Failed to generate a response";
  }
}

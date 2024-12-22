import { GoogleGenerativeAI } from "@google/generative-ai";
const apikey = process.env.NEXT_PUBLIC_GEMINIKEY!;

export default async function getremark(msg: string) {
  const generativeAI = new GoogleGenerativeAI(apikey);
  try {
    const model = generativeAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `Review the wallet's balance and recent activities. Give the user an indept review of the wallet balance and holdings, make sure it sounds professional and dont use complex english or terms, you can add emojis, aslo add a little bit of fun and teasing to it, also suggest ways to improve and make more from it in details. Here's the wallet details: ${msg}. Return a single sentence text.`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    // console.log(text);

    return text;
  } catch (error) {
    console.error(error);
    return "Failed to generate a response";
  }
}

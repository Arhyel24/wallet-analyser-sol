import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function getremark(msg: string) {
  const apikey = process.env.GEMINI_KEY as string;
  //   console.log("API Key: ", apikey);

  const generativeAI = new GoogleGenerativeAI(apikey);
  try {
    const model = generativeAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `Review the wallet's balance and recent activities. Give a 120 characters long review of the balance, make sure it sounds interesting and fun, you can add emojis. Here's the wallet balance: ${msg}. Return a single sentence text.`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    console.log(text);

    return text;
  } catch (error) {
    return "Failed to generate a response";
  }
}

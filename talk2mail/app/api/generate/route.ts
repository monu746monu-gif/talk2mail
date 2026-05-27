import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(`
      You are an expert cold email writer.

      Convert the user's request into a professional,
      short, human-sounding cold email.

      Rules:
      - Keep under 120 words
      - Strong CTA
      - Avoid robotic tone
      - Personalized style
      - Professional but friendly

      User Request:
      ${prompt}
    `);

    const response = result.response.text();

    return NextResponse.json({
      success: true,
      email: response,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
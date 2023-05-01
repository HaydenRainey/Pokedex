// pages/api/chatgpt.js
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next'
import { GPTMessage } from "@/types/chatGPT";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  // Extract the message from the request body
  const { content, role } = req.body as ChatCompletionRequestMessage;

  if (!content) {
    return res.status(400).json({ message: 'Bad Request: "message" field is required' });
  }


  try {
    // Send the message to ChatGPT using the OpenAI API
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: role, content: content}],
      });

    // Extract and return the ChatGPT response
    const chatgptResponse = response.data.choices[0].message;
    res.status(200).json(chatgptResponse);
  } catch (error) {
    // Handle errors and return an error response
    console.error('Error communicating with ChatGPT:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// pages/api/chatgpt.js
import {
	ChatCompletionRequestMessage,
	Configuration,
	OpenAIApi,
	CreateCompletionRequest,
	CreateCompletionRequestPrompt,
} from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';
import { GPTMessage } from '@/types/chatGPT';

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	// Check if the request method is POST
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method Not Allowed' });
	}
	// Extract the message from the request body
	const prompt = req.body as CreateCompletionRequestPrompt;
	console.log(prompt);

	if (!prompt) {
		return res
			.status(400)
			.json({ message: 'Bad Request: "message" field is required' });
	}

	try {
		// Send the message to ChatGPT using the OpenAI API
		const response = await openai.createCompletion({
			model: 'code-davinci-002',
			prompt: prompt,
			temperature: 0,
			max_tokens: 60,
			top_p: 1,
			frequency_penalty: 0.5,
			presence_penalty: 0,
			stop: ['You:'],
		});

		// Extract and return the ChatGPT response
		const chatgptResponse = response.data.choices[0].text;
		res.status(200).json({ response: chatgptResponse });
	} catch (error) {
		// Handle errors and return an error response
		console.error('Error communicating with ChatGPT:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
}

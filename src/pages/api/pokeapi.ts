import { url } from 'inspector';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	// Check if the request method is GET
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method Not Allowed' });
	}

	const { searchParams } = new URL(req.url);
	const pokeEndpont: string = process.env['POKE_API_ENDPOINT'] as string;

	console.debug(searchParams);

	if (false) {
		return res
			.status(400)
			.json({ message: 'Bad Request: "message" field is required' });
	}

	const options: RequestInit = {
		method: req.method,
	};

	try {
		return res.status(200);
		//let response = fetch(pokeEndpont,options);
	} catch (error) {
		// Handle errors and return an error response
		console.error('Error communicating with API:', error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
}

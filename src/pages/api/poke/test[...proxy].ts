// import httpProxy from "http-proxy";
// import type { NextApiRequest, NextApiResponse } from 'next/types';

// // ./pages/api/poke[...proxy].ts
// export const config = {
// 	api: {
// 	  // Enable `externalResolver` option in Next.js
// 	  externalResolver: true,
// 	  bodyParser: false,
// 	},
//   };
  
//   export default (
// 	req: NextApiRequest,
// 	res: NextApiResponse,
// ) =>
// 	new Promise((resolve:any, reject:any) => {
// 	  const proxy: httpProxy = httpProxy.createProxy();
// 	  proxy.once("proxyRes", () => {
// 		console.log('Request:');
// 		console.log(req);
// 		resolve();
// 	  }).once("error", reject).web(req, res, {
// 		changeOrigin: true,
// 		target: process.env.POKE_API_URI,
// 	  });
// 	});
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**'
      }
      //new URL('https://via.placeholder.com/300x200.png?text=Sample+Image')
    ]
  }
}

module.exports = nextConfig

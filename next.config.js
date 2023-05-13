/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**'
      }
      //new URL('https://via.placeholder.com/300x200.png?text=Sample+Image')
    ]
  },
  async rewrites(){
    return [
      {
        source: '/api/poke/:path*',
        destination: `https://pokeapi.co/api/v2/:path*`
      }
    ]
  }
}

module.exports = nextConfig

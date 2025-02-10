/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack5: true,
    images: {
        domains: ['localhost'],
    },
    async headers() {
        return [
        {
            source: '/(.*)',
            headers: securityHeaders,
        },
        ];
    },
    async redirects() {
        return [
        {
            source: '/posts',
            destination: '/',
            permanent: true,
        },
        ];
    },
    async rewrites() {
        return [
        {
            source: '/posts',
            destination: '/',
        },
        ];
    },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.imagin.studio']
    },
    // Add this for scrolling to work
    experimental: {
       appDir: true,
     },
}

module.exports = nextConfig

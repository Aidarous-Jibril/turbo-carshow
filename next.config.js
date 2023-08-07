/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.imagin.studio']
    },
    // Add this for scrolling to work
    experimental: {
       appDir: true,
     },
     // Add this code block for usel prof image to work in Navbar.ts 
     images:{
        domains:[
            "cdn.imagin.studio",
            "avatars.githubusercontent.com",
            "images.pexels.com" ,
            "res.cloudinary.com",
            "lh3.googleusercontent.com"
        ]
    }
}

module.exports = nextConfig

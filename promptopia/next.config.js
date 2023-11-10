/** @type {import('next').NextConfig} */
const nextConfig = {

    //You need this to be able to show your google profile pic, code that usses this is "session?.user.image" on lines 46, 72 in Nav.jsx
    images: {
        domains: ['lh3.googleusercontent.com'],
      },
}

module.exports = nextConfig

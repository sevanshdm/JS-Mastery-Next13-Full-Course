// you set up your providers such as Google authentication in this file.

import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({ //options object
    providers: [
        GoogleProvider({ // to get the clientId, clientSecret credentials, go to console.cloud.google.com
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    async session({ session }) {

    },
    async signIn({ profile }) {
        try { // serverless route, which means this is a lambda function that only opens up when it gets called. So everytime it's called
              // it needs to spin up the server and make a connection to the database.
            
            
        } catch (error) {
            
        }
    }
})

// this isn't normal, usually you do everything as either a GET or a POST. But for Next this is how you do it. 
export { handler as GET, handler as POST }
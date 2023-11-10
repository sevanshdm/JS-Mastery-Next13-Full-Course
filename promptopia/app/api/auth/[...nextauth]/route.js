// you set up your providers such as Google authentication in this file.

import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({ //options object
    providers: [
        GoogleProvider({ // to get the clientId, clientSecret credentials, go to console.cloud.google.com
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        
            // this updates and makes sure it knows which user is currently online.
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.id = sessionUser._id.toString()

            return session

        },
        async signIn({ profile }) {
            try { // serverless route, which means this is a lambda function that only opens up when it gets called. So everytime it's called
                // it needs to spin up the server and make a connection to the database.
                
                await connectToDB()
                
                //Check if a user already exists
                const userExists = await User.findOne({
                    email: profile.email
                })
                
                //if not, create a new user and save it to the database.
                if(!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(), //this replaces any spaces with no spaces
                        image: profile.picture
                    })
                }

                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    },
})

// this isn't normal, usually you do everything as either a GET or a POST. But for Next this is how you do it. 
export { handler as GET, handler as POST }
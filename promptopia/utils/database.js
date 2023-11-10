import mongoose from "mongoose";

let isConnected = false // allows you to track the connection status.

export const connectToDB = async () => {
    mongoose.set('strictQuery', true) // this sets the mongoose options, if you don't do this, you get warnings in the console.

    if(isConnected) {
        console.log('MongoDB is already connected')
        return //return from out of the function to stop it from running.
    }

    try {                                              //options object
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "Share_Prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true
        
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    } 
}
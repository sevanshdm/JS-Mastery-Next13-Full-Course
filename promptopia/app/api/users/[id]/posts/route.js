// only fetch posts from a specific creator

import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

                                    //params.id refers to the dynamic [id] folder
        const prompts = await Prompt.find({creator: params.id}).populate('creator') // find all posts and find the creator as well.

        return new Response(JSON.stringify(prompts), {
            status: 200
        })

    } catch (error) {
        return new Response("Failed to fetch all prompts", {
            status: 500
        })
    }
}

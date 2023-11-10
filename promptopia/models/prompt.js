import mongoose, { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId, // is a doc in the db, more specifically the user type.
        ref: 'User', // going to be a one-to-many relationship, one user will be able to create many prompts.
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.']
    }
})
                // get the prompt that already exists or create a new model called prompt if it doesn't.
const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt
import express from "express";

import {generateResponse, extractMemory} from "../utils/llm.js"
import { updateMemory } from "../utils/memory.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {

        const userMessage = req?.body?.message
        console.log("Message recieved: ", userMessage);

        if(!userMessage) throw new Error("No message provided")

        const response = await generateResponse(userMessage)
        const facts = await extractMemory(userMessage)
        updateMemory("user1", facts)

        res.status(200).json({response})

    } catch(err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
})

export default router
import axios from "axios";

import { getMemory } from "./memory.js";

const LOCAL_URL = "http://127.0.0.1:11434/api/chat"
const GEN_LOCAL_URL = "http://127.0.0.1:11434/api/generate"

export const generateResponse = async function (userMessage) {
    try {

        const memory = getMemory("user1");

        const messages = [
            {
                role: 'system',
                content: `You are a helpful assistant. User info: ${JSON.stringify(memory)}`
            },
            { role: "user", content: userMessage }
        ];

        const params = {
            method: "post",
            url: LOCAL_URL,
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                model: 'mistral',
                messages,
                stream: false
            }
        }

        const { data: llmRes } = await axios(params)

        return llmRes?.message?.content ? llmRes.message.content : "No response from LLM"

    } catch (error) {
        console.log(
            `Error generated: ${error.message}`
        );
    }
}

export async function extractMemory(message) {
    try {
        const prompt = `Extract facts like name, job, company from this sentence as JSON:\n"${message}"`;

        const params = {
            url: GEN_LOCAL_URL,
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                model: 'mistral',
                prompt,
                stream: false
            }
        }

        const { data: llmResponse } = await axios(params);
        let details = {}

        if (llmResponse?.response) {
            const pRes = JSON.parse(llmResponse.response);
            console.log(pRes)
            Object.keys(pRes).forEach((key) => {
                if(pRes[key]) {
                    details[key?.toLowerCase()] = pRes[key]
                }
            })
        }
        
        return details
    } catch (err) {
        return {};
    }
}

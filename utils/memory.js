import fs from "fs"

const path = "./memory.json";

function loadMemory() {
    if (!fs.existsSync(path)) return {};
    const raw = fs.readFileSync(path);
    const pRaw = JSON.parse(raw);

    console.log("Loaded memory:", pRaw);
    return pRaw;
}

function saveMemory(data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

export function updateMemory(userId, facts) {
    const memory = loadMemory();
    memory[userId] = { ...(memory[userId] || {}), ...facts };
    saveMemory(memory);
}

export function getMemory(userId) {
    const memory = loadMemory();
    return memory[userId] || {};
}


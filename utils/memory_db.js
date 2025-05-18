import supabase from "./supabaseClient"

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

export async function updateMemory(userId, facts) {
    const memory = loadMemory();
    memory[userId] = { ...(memory[userId] || {}), ...facts };
    saveMemory(memory);
}

export async function getMemory(userId) {

    const { data, error } = await supabase
        .from('user_memory')
        .select('key, value')
        .eq('user_id', userId);

    if (error) {
        console.error('Get memory error:', error);
        return {};
    }

    const memory = {};
    data.forEach(item => memory[item.key] = item.value);
    return memory;
}


export function save(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Failed to save to localStorage: ${error}`);
    }
}

export function load(key) {
    try {
        const value = localStorage.getItem(key);
        console.log(`Loaded ${key} from localStorage:`, value);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error(`Failed to load from localStorage: ${error}`);
        return null;
    }
}

export function remove(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Failed to remove from localStorage: ${error}`);
    }
}
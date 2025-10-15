export default function objectHasValue<K extends Record<string, any>>(
    obj: K,
): boolean {
    for (const key in obj) {
        const v = obj[key];
        if (Array.isArray(v) ? v.length > 0 : Boolean(v)) {
            return true;
        }
    }
    return false;
}

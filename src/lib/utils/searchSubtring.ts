// Overload 1: plain string array
export function searchSubstring(arr: string[], query: string): string[];

// Overload 2: array of arbitrary items with selector
export function searchSubstring<T>(
    arr: T[],
    query: string,
    selector: (item: T) => string,
): T[];

export default function searchSubstring<T>(
    arr: (string | T)[],
    query: string,
    selector?: (item: T) => string,
): (string | T)[] {
    const q = query.trim().toLowerCase();

    if (selector) {
        // selector returns string
        return (arr as T[]).filter((item) =>
            selector(item).toLowerCase().includes(q),
        );
    }

    return (arr as string[]).filter((str) => str.toLowerCase().includes(q));
}

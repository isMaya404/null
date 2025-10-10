export default function hasObjKey<K extends object>(obj: K): boolean {
    let hasAny = false;
    for (const _key in obj) {
        // if this loop runs at all it means there's
        // atleast one key, so we set it to true
        hasAny = true;
        break;
    }
    return hasAny;
}

// I could have used (if (!Object.keys(next).length) return;) to check
// if the object is empty, the weird for loop's just for learning purposes.
// Tho the above code is faster and prob saved couple hundred nanoseconds 🗿.

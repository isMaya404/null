export default function notNull<T>(val: T): val is NonNullable<T> {
    return val != null;
}

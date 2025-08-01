import { decode } from "html-entities";

export default function removeBrTags(html: string): string {
    const decoded = decode(html);

    return decoded
        .replace(/<br\s*\/?>/gi, "<br>")
        .replace(/(?:<br>\s*){2,}/gi, "<br>")
        .replace(/\n/g, "");
}

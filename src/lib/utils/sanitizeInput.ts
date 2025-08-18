const sanitizeInput = (value: string): string => {
    // Remove leading/trailing spaces
    let sanitized = value.trim();

    // Remove control characters or non-printable Unicode:
    // [] → matches any one character inside the brackets.
    // \x00-\x1F → matches all ASCII control characters from 0x00 to 0x1F (decimal 0–31).
    // \x7F → matches the delete character (DEL, decimal 127).
    sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, "");

    // Limit length
    if (sanitized.length > 100) sanitized = sanitized.slice(0, 100);

    return sanitized;
};

export default sanitizeInput;

/**
 * Check if a string is not too long
 * @param str
 * @param maxLength
 */
export const isNotTooLong = (str: string, maxLength: number): boolean => {
    return str.length <= maxLength;
}

/**
 * Check if a string is not empty
 * @param str
 */
export const isNotEmpty = (str: string): boolean => {
    return str.length > 0;
}

/**
 * Check if a string has no special characters that are defined in the regex
 * @param str
 */
export const hasNoSpecialChars = (str: string): boolean => {
    return /^[a-zA-ZÉÈ0-9@:.\-'/éèç\s]*$/.test(str);
}

/**
 * Check if a string has not only spaces
 * @param str
 */
export const hasNotOnlySpaces = (str: string): boolean => {
    return str.trim().length > 0;
}

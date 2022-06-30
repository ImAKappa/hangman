/**
 * Helper function
 * @param character
 * @param string
 */
export function allIndicesOf(character: string, string: string):number[] {
    var indices: number[] = [];
    for (let i = 0; i < string.length; i++) {
        if (string[i] === character) indices.push(i);
    }
    return indices;
}

/**
 * Helper function
 * @param index
 * @param string
 * @param replacement
 */
export function replaceAt(index: number, string: string, replacement: string):string {
    return string.substring(0, index) + replacement + string.substring(index + replacement.length);
}
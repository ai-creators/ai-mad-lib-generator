/**
 * Set a key-value pair in localStorage export enum SavesConstants {
    SAVED_ADLIB_IDS = "SAVED_ADLIB_IDS"
} can you update that component  * @param key - The key to store
 * @param value - The value to store
 */
export function setItem(key: string, value: string): void {
  localStorage.setItem(key, value);
}

/**
 * Get a value by key from localStorage
 * @param key - The key to retrieve
 * @returns The value or null if not found
 */
export function getItem(key: string): string | null {
  return localStorage.getItem(key);
}

/**
 * Remove an item from localStorage
 * @param key - The key to remove
 */
export function removeItem(key: string): void {
  localStorage.removeItem(key);
}

/**
 * Clear all items in localStorage
 */
export function clearStorage(): void {
  localStorage.clear();
} 
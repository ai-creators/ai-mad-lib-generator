/**
 * Set a key-value pair in localStorage
 */
export function setItem(key: string, value: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
}

/**
 * Get a value by key from localStorage
 */
export function getItem(key: string): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}

/**
 * Remove an item from localStorage
 */
export function removeItem(key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
}

/**
 * Clear all items in localStorage
 */
export function clearStorage(): void {
  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
}
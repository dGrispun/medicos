import { useState, useEffect } from "react";

export function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load initial value from localStorage on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
        setIsInitialized(true);
      }
    } catch (error) {
      console.error(`Error loading localStorage key "${key}":`, error);
      setIsInitialized(true);
    }
  }, [key]);

  // Save to localStorage whenever value changes (after initialization)
  useEffect(() => {
    if (isInitialized) {
      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(storedValue));
        }
      } catch (error) {
        console.error(`Error saving localStorage key "${key}":`, error);
      }
    }
  }, [key, storedValue, isInitialized]);

  // Return a wrapped version of useState's setter function
  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.error(`Error setting value for key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

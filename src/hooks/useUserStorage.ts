"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function useUserStorage<T>(key: string, initialValue: T) {
  const { user } = useAuth();
  const storageKey = user ? `user_${user.id}_${key}` : `guest_${key}`;

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(storageKey);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(error);
    }
  }, [storageKey, storedValue]);

  const remove = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(storageKey);
        setStoredValue(initialValue);
      }
    } catch (error) {
      console.error(error);
    }
  }, [storageKey, initialValue]);

  return [storedValue, setStoredValue, remove] as const;
}

import React, { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useAsyncStorage(key, defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const mounted = useRef(true);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null && mounted.current) {
          setValue(JSON.parse(storedValue));
        }
      } catch (e) {
        console.error('Error loading from AsyncStorage:', e);
      }
    };
    loadValue();

    return () => {
      mounted.current = false; // Component unmounting
    };
  }, [key]);

  const setValueAsync = async (newValue) => {
    if (!mounted.current) return; // Avoid setting state on unmounted component
    try {
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (e) {
      console.error('Error storing in AsyncStorage:', e);
    }
  };

  return [value, setValueAsync];
}

export default useAsyncStorage; 

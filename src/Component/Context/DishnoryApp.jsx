

import React, { createContext, useContext, useState, useEffect } from 'react';

const DictionaryContext = createContext();

const fontClasses = {
  sans: 'font-sans',
  mono: 'font-mono',
  serif: 'font-serif',
  'sans-medium': 'font-sans font-medium',
  'sans-semi-bold': 'font-sans font-semibold',
  'sans-bold': 'font-sans font-bold',
  'sans-extra-bold': 'font-sans font-extrabold',
  'sans-black': 'font-sans font-black',
};

export const DictionaryProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Retrieve isDark from localStorage if available, otherwise default to false
    return JSON.parse(localStorage.getItem('isDark')) || false;
  });
  const [fontStyle, setFontStyle] = useState(() => {
    // Retrieve fontStyle from localStorage if available, otherwise default to 'sans'
    return localStorage.getItem('fontStyle') || 'sans';
  });

  // Update localStorage whenever isDark or fontStyle changes
  useEffect(() => {
    localStorage.setItem('isDark', JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('fontStyle', fontStyle);
  }, [fontStyle]);

  const toggleDarkMode = () => setIsDark(prevIsDark => !prevIsDark);
  const changeFontStyle = (style) => setFontStyle(style);

  return (
    <DictionaryContext.Provider value={{ isDark, toggleDarkMode, fontStyle, changeFontStyle, fontClasses }}>
      {children}
    </DictionaryContext.Provider>
  );
};

export const useDictionary = () => useContext(DictionaryContext);


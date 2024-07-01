
import React, { createContext, useState, useContext } from 'react';

// Create the context
const DictionaryContext = createContext();

// Create a provider component
export const DictionaryProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);

    const toggleDarkMode = () => {
        setIsDark((prevIsDark) => !prevIsDark);
        document.body.className = prevIsDark ? 'bg-white' : 'bg-gray-900';
    };

    return (
        <DictionaryContext.Provider value={{ isDark, toggleDarkMode }}>
            {children}
        </DictionaryContext.Provider>
    );
};

// Custom hook to use the DictionaryContext
export const useDictionary = () => {
    return useContext(DictionaryContext);
};

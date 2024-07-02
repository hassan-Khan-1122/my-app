




// import React, { createContext, useState, useContext } from 'react';

// // Create the context
// const DictionaryContext = createContext();

// // Create a provider component
// export const DictionaryProvider = ({ children }) => {
//     const [isDark, setIsDark] = useState(false);
//     const [fontStyle, setFontStyle] = useState('sans'); // Default font style


//     const toggleDarkMode = () => {
//         setIsDark((prevIsDark) => !prevIsDark);
//     };

//          const changeFontStyle = (style) => {
//              setFontStyle(style);
//             };

//     return (
//         <DictionaryContext.Provider value={{ isDark, toggleDarkMode , fontStyle, changeFontStyle }}>
//             {children}
//         </DictionaryContext.Provider>
//     );
// };

// // Custom hook to use the DictionaryContext
// export const useDictionary = () => {
//     return useContext(DictionaryContext);
// };
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const DictionaryContext = createContext();

// Create a provider component
export const DictionaryProvider = ({ children }) => {
    // Initialize state for dark mode
    const [isDark, setIsDark] = useState(() => {
        // Retrieve dark mode preference from local storage (default to false)
        const storedDarkMode = localStorage.getItem('darkMode');
        return storedDarkMode ? JSON.parse(storedDarkMode) : false;
    });

    // Initialize state for font style
    const [fontStyle, setFontStyle] = useState('sans'); // Default font style

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setIsDark((prevIsDark) => {
            const newIsDark = !prevIsDark;
            // Store the updated dark mode preference in local storage
            localStorage.setItem('darkMode', JSON.stringify(newIsDark));
            return newIsDark;
        });
    };

    // Function to change font style
    const changeFontStyle = (style) => {
        setFontStyle(style);
    };

    return (
        <DictionaryContext.Provider value={{ isDark, toggleDarkMode, fontStyle, changeFontStyle }}>
            {children}
        </DictionaryContext.Provider>
    );
};

// Custom hook to use the DictionaryContext
export const useDictionary = () => {
    return useContext(DictionaryContext);
};

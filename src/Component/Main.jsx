




import React from 'react';
import { FaSun, FaMoon, FaBookOpen } from 'react-icons/fa';
import { useDictionary } from './Context/DishnoryApp';

export default function Main() {
    const { isDark, toggleDarkMode, fontStyle, changeFontStyle } = useDictionary();

    const handleFontChange = (event) => {
        changeFontStyle(event.target.value);
    };

    return (
        <div className={`flex flex-col md:flex-row justify-between px-4 md:px-8 lg:px-72 p-3 shadow ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <div className='flex justify-between items-center w-full md:w-auto'>
                <div className='text-xl md:text-3xl flex gap-2 md:gap-4 items-center'>
                    <FaBookOpen />
                    <p className='font-bold '>Dictionary</p>
                </div>
                <button onClick={toggleDarkMode} className='flex md:hidden p-2 text-3xl'>
                    <FaSun className={`text-yellow-500 ${isDark ? 'block' : 'hidden'}`} />
                    <FaMoon className={`text-gray-500 ${isDark ? 'hidden' : 'block'}`} />
                </button>
            </div>
            <div className='flex items-center justify-between mt-4 md:mt-0 md:ml-44 w-full md:w-auto'>
                <select 
                    value={fontStyle}
                    onChange={handleFontChange}
                    className={`bg-${isDark ? 'gray-800 text-white' : 'white text-black'} border rounded px-2 py-1 cursor-pointer w-full md:w-auto`}
                >
                    <option value="sans">Sans</option>
                    <option value="mono">Mono</option>
                    <option value="serif">Serif</option>
                </select>
                <button onClick={toggleDarkMode} className='hidden md:flex p-2 text-3xl'>
                    <FaSun className={`text-yellow-500 ${isDark ? 'block' : 'hidden'}`} />
                    <FaMoon className={`text-gray-500 ${isDark ? 'hidden' : 'block'}`} />
                </button>
            </div>
        </div>
    );
}











import React from 'react';
import { FaSun, FaMoon, FaBookOpen } from 'react-icons/fa';
import { useDictionary } from './Context/DishnoryApp';

export default function Main() {
    const { isDark, toggleDarkMode } = useDictionary();

    return (
        

        <div className={`flex justify-between  px-4 md:px-8 lg:px-72  p-3 shadow ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
    <div className='text-xl md:text-3xl flex gap-2 md:gap-4 items-center'>
        <FaBookOpen />
        <p className='font-bold'>Dictionary</p>
    </div>
    <div>
        <button onClick={toggleDarkMode} className='flex p-2 mt-1 text-3xl'>
            <FaSun className={`text-yellow-500 ${isDark ? 'block' : 'hidden'}`} />
            <FaMoon className={`text-gray-500 ${isDark ? 'hidden' : 'block'}`} />
        </button>
    </div>
</div>


    );
}







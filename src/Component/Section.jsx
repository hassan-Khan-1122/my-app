

import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { useDictionary } from "./Context/DishnoryApp";
import { CiSearch } from "react-icons/ci";

function Section() {
  const [apishow, setApiShow] = useState([]);
  const [word, setWord] = useState("");
  const [audioPlaying, setAudioPlaying] = useState(null);
  const { isDark, toggleDarkMode } = useDictionary();

  // CSS classes for light and dark modes
  const containerClass = isDark
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-800";
  const buttonClass = isDark
    ? "bg-black text-white"
    : "bg-gray-800 text-white";
  const labelClass = isDark
    ? "border-gray-700"
    : "border-gray-300";
  const entryContainerClass = isDark
    ? "bg-gray-200 text-gray-800"
    : "bg-white text-gray-800";
  const audioButtonClass = isDark
    ? "bg-black text-white"
    : "bg-gray-800 text-white";

  // fetching API data
  const fetchApiData = async (word) => {
    try {
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      console.log(res.data);
      setApiShow(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    setWord(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (word.trim() !== "") {
      fetchApiData(word);
    }
  };

  const handleAudioPlayPause = (audioUrl, index) => {
    const audio = new Audio(audioUrl);
    if (audioPlaying === index) {
      audio.pause();
      setAudioPlaying(null);
    } else {
      audio.play();
      setAudioPlaying(index);
      audio.onended = () => setAudioPlaying(null);
    }
  };

  return (
    <>
    <div className={`min-h-[100vh] ${containerClass}`}>
      <div className={`flex justify-center ${containerClass}`}>
        <div className="w-full max-w-2xl mt-32 px-4">
          <label
            className={`relative flex items-center justify-between border py-2 px-4 rounded-2xl shadow-2xl focus-within:${labelClass}  ${isDark? "bg-black" : 'bg-white'}`}
            htmlFor="search-bar"
          >
            <input
              id="search-bar"
              placeholder="your keyword here"
              className={`flex-1 px-4 py-2 rounded-md outline-none ${isDark? "bg-black" : 'bg-white'} sm:px-2`}
              onChange={handleInputChange}
            />
            {/* <button
              className={`ml-4 px-6 py-3 ${buttonClass} rounded-xl transition-all disabled:opacity-70 sm:px-4 sm:py-2  ${!isDark? "bg-black" : 'bg-white text-black'}`}
              onClick={handleSearch}
            >
              <span className="text-sm font-semibold">Search</span>
            </button> */}
            <CiSearch  className="text-3xl cursor-pointer" onClick={handleSearch}/>
          </label>
        </div>
      </div>

      {/* Display fetched data */}
      <div className={`pt-10 flex justify-center ${containerClass}`}>
        {apishow.length > 0 ? (
          <div className="flex flex-col gap-4">
            {apishow.map((entry, index) => (
              <div key={index} className={`p-4 rounded shadow-lg ${isDark ? "bg-gray-200 text-gray-800" : "bg-white text-gray-800"}`}>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-5xl md:text-5xl font-bold">
                    {entry.word}
                  </h2>
                  {entry.phonetics.length > 0 && entry.phonetics[0].audio && (
                    <button
                      className={`px-3 py-1 rounded ${isDark ? "bg-black text-white" : "bg-gray-800 text-white"}`}
                      onClick={() =>
                        handleAudioPlayPause(entry.phonetics[0].audio, index)
                      }
                    >
                      <FontAwesomeIcon
                        icon={audioPlaying === index ? faPause : faPlay}
                        className="text-lg"
                      />
                    </button>
                  )}
                </div>
                <div>
                  {entry.meanings.map((meaning, mIndex) => (
                    <div key={mIndex}>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold">
                          {meaning.partOfSpeech}
                        </h3>
                      </div>
                      {meaning.definitions.map((definition, dIndex) => (
                        <p key={dIndex} className="text-sm md:text-base">
                          {definition.definition}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-14 text-3xl font-bold">
            No data available. Try searching for a word!
          </p>
        )}
      </div>
      </div>
    </>
  );
}

export default Section;
























// import React, { useState } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
// import { useDictionary } from "./Context/DishnoryApp";

// function Section() {
//   const [apishow, setApi] = useState([]);
//   const [word, setWord] = useState("");
//   const [audioPlaying, setAudioPlaying] = useState(null);
//   const { isDark, toggleDarkMode } = useDictionary();

//   // CSS classes for light and dark modes
//   const containerClass = isDark
//     ? "bg-gray-800 text-white"
//     : "bg-white text-gray-800";
//   const buttonClass = isDark
//     ? "bg-black text-white"
//     : "bg-gray-800 text-white";
//   const labelClass = isDark
//     ? "border-gray-700"
//     : "border-gray-300";
//   const entryContainerClass = isDark
//     ? "bg-gray-200 text-gray-800"
//     : "bg-white text-gray-800";
//   const audioButtonClass = isDark
//     ? "bg-black text-white"
//     : "bg-gray-800 text-white";

//   // fetching API data
//   const fetchApiData = async (word) => {
//     try {
//       const res = await axios.get(
//         `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
//       );
//       console.log(res.data);
//       setApi(res.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setWord(e.target.value);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (word.trim() !== "") {
//       fetchApiData(word);
//     }
//   };

//   const handleAudioPlayPause = (audioUrl, index) => {
//     const audio = new Audio(audioUrl);
//     if (audioPlaying === index) {
//       audio.pause();
//       setAudioPlaying(null);
//     } else {
//       audio.play();
//       setAudioPlaying(index);
//       audio.onended = () => setAudioPlaying(null);
//     }
//   };

//   return (
//     <>
//       <div className={`flex justify-center ${containerClass}`}>
//         <div className="w-full max-w-2xl mt-32 px-4">
//           <label
//             className={`relative flex items-center justify-between border py-2 px-4 rounded-2xl shadow-2xl focus-within:${labelClass}  ${isDark? "bg-black" : 'bg-white'}`}
//             htmlFor="search-bar"
//           >
//             <input
//               id="search-bar"
//               placeholder="your keyword here"
//               className={`flex-1 px-4 py-2 rounded-md outline-none ${isDark? "bg-black" : 'bg-white'} sm:px-2`}
//               onChange={handleInputChange}
//             />
//             <button
//               className={`ml-4 px-6 py-3 ${buttonClass} rounded-xl transition-all disabled:opacity-70 sm:px-4 sm:py-2  ${!isDark? "bg-black" : 'bg-white text-black'}`}
//               onClick={handleSearch}
//             >
//               <span className="text-sm font-semibold">Search</span>
//             </button>
//           </label>
//         </div>
//       </div>

//       {/* Display fetched data */}
//       <div className="mt-10 flex justify-center">
//         {apishow.length > 0 ? (
//           <div className="flex flex-col gap-4">
//             {apishow.map((entry, index) => (
//               <div key={index} className={`p-4 rounded shadow-lg ${entryContainerClass}`}>
//                 <div className="flex justify-between items-center mb-2">
//                   <h2 className="text-2xl md:text-xl font-bold">
//                     {entry.word}
//                   </h2>
//                   {entry.phonetics.length > 0 && entry.phonetics[0].audio && (
//                     <button
//                       className={`px-3 py-1 rounded ${audioButtonClass}`}
//                       onClick={() =>
//                         handleAudioPlayPause(entry.phonetics[0].audio, index)
//                       }
//                     >
//                       <FontAwesomeIcon
//                         icon={audioPlaying === index ? faPause : faPlay}
//                         className="text-lg"
//                       />
//                     </button>
//                   )}
//                 </div>
//                 <div>
//                   {entry.meanings.map((meaning, mIndex) => (
//                     <div key={mIndex}>
//                       <div>
//                         <h3 className="text-lg md:text-xl font-semibold">
//                           {meaning.partOfSpeech}
//                         </h3>
//                       </div>
//                       {meaning.definitions.map((definition, dIndex) => (
//                         <p key={dIndex} className="text-sm md:text-base">
//                           {definition.definition}
//                         </p>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center mt-14 text-3xl font-bold">
//             No data available. Try searching for a word!
//           </p>
//         )}
//       </div>
//     </>
//   );
// }

// export default Section;

























// import React, { useState } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
// import { useDictionary } from "./Context/DishnoryApp";

// function Section() {
//   const [apishow, setApi] = useState([]);
//   const [word, setWord] = useState("");
//   const [audioPlaying, setAudioPlaying] = useState(null);
//   const { isDark, toggleDarkMode } = useDictionary();

//   // fetching API data
//   const fetchApiData = async (word) => {
//     try {
//       const res = await axios.get(
//         `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
//       );
//       console.log(res.data);
//       setApi(res.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setWord(e.target.value);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (word.trim() !== "") {
//       fetchApiData(word);
//     }
//   };

//   const handleAudioPlayPause = (audioUrl, index) => {
//     const audio = new Audio(audioUrl);
//     if (audioPlaying === index) {
//       audio.pause();
//       setAudioPlaying(null);
//     } else {
//       audio.play();
//       setAudioPlaying(index);
//       audio.onended = () => setAudioPlaying(null);
//     }
//   };

//   return (
//     <>
//         <div className="flex justify-center ">
//           <div className="w-full max-w-2xl mt-32 px-4">
//             <label
//               className="relative bg-white flex items-center justify-between border py-2 px-4 rounded-2xl shadow-2xl focus-within:border-gray-300"
//               htmlFor="search-bar"
//             >
//               <input
//                 id="search-bar"
//                 placeholder="your keyword here"
//                 className="flex-1 px-4 py-2 rounded-md outline-none bg-white sm:px-2"
//                 onChange={handleInputChange}
//               />
//               <button
//                 className="ml-4 px-6 py-3 bg-black text-white rounded-xl transition-all disabled:opacity-70 sm:px-4 sm:py-2"
//                 onClick={handleSearch}
//               >
//                 <span className="text-sm font-semibold">Search</span>
//               </button>
//             </label>
//           </div>
//         </div>

//         {/* Display fetched data */}
//         <div className="mt-10 flex justify-center">
//           {apishow.length > 0 ? (
//             <div className="flex flex-col gap-4 ">
//               {apishow.map((entry, index) => (
//                 <div key={index} className=" p-4 rounded shadow-lg">
//                   <div className="flex justify-between items-center mb-2">
//                     <h2 className="text-2xl md:text-xl font-bold">
//                       {entry.word}
//                     </h2>
//                     {entry.phonetics.length > 0 && entry.phonetics[0].audio && (
//                       <button
//                         className="bg-black text-white px-3 py-1 rounded"
//                         onClick={() =>
//                           handleAudioPlayPause(entry.phonetics[0].audio, index)
//                         }
//                       >
//                         <FontAwesomeIcon
//                           icon={audioPlaying === index ? faPause : faPlay}
//                           className="text-lg"
//                         />
//                       </button>
//                     )}
//                   </div>
//                   <div>
//                     {entry.meanings.map((meaning, mIndex) => (
//                       <div key={mIndex}>
//                         <div>
//                           <h3 className="text-lg md:text-xl font-semibold">
//                             {meaning.partOfSpeech}
//                           </h3>
//                         </div>
//                         {meaning.definitions.map((definition, dIndex) => (
//                           <p key={dIndex} className="text-sm md:text-base">
//                             {definition.definition}
//                           </p>
//                         ))}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center mt-14 text-3xl font-bold">
//               No data available. Try searching for a word!
//             </p>
//           )}
//         </div>
//     </>
//   );
// }

// export default Section;

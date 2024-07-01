// // // import React, { useState, useEffect } from 'react';

// // // function App() {
// // //   const [data, setData] = useState(null);

// // //   const fetchApiData = async () => {
// // //     try {
// // //       const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/hello');
// // //       if (!response.ok) {
// // //         throw new Error('Network response was not ok');
// // //       }
// // //       const data = await response.json();
// // //       setData(data);
// // //       console.log(data);
// // //     } catch (error) {
// // //       console.error('Error fetching data:', error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchApiData();
// // //   }, []); 

// // //   return (
// // //     <>
// // //       {data && (
// // //         <div>
// // //           <h2>{data[0]?.word}</h2>
// // //           <p>{data[0]?.meanings[0]?.definitions[0]?.definition}</p>
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // }

// // // export default App;

// // import React, { useState } from 'react';

// // function App() {
// //   const [word, setWord] = useState('');
// //   const [data, setData] = useState(null);
// //   const [error, setError] = useState(null);

// //   const fetchApiData = async () => {
// //     try {
// //       const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
// //       if (!response.ok) {
// //         throw new Error('Network response was not ok');
// //       }
// //       const data = await response.json();
// //       setData(data);
// //       setError(null);
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
// //       setError('Failed to fetch definition. Please try again.');
// //       setData(null);
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     setWord(e.target.value);
// //   };

// //   const handleSearch = () => {
// //     if (word.trim()) {
// //       fetchApiData();
// //     } else {
// //       setError('Please enter a word to search.');
// //       setData(null);
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="container">
// //         <input
// //           type="text"
// //           value={word}
// //           onChange={handleInputChange}
// //           placeholder="Enter a word"
// //           className="border p-2"
// //         />
// //         <button onClick={handleSearch} className="bg-blue-500 text-white p-2 ml-2">
// //           Search
// //         </button>
// //       </div>

// //       {error && <p className="text-red-500 mt-2">{error}</p>}

// //       {data && (
// //         <div className="mt-4">
// //           <h2 className="text-xl font-bold">{data[0]?.word}</h2>
// //           <p>{data[0]?.meanings[0]?.definitions[0]?.definition}</p>
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// // export default App;
// import React, { useState } from 'react';

// function App() {
//   const [word, setWord] = useState('');
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchApiData = async () => {
//     try {
//       const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setData(data);
//       setError(null);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError('Failed to fetch definition. Please try again.');
//       setData(null);
//     }
//   };

//   const handleInputChange = (e) => {
//     setWord(e.target.value);
//   };

//   const handleSearch = () => {
//     if (word.trim()) {
//       fetchApiData();
//     } else {
//       setError('Please enter a word to search.');
//       setData(null);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-center items-center mb-4">
//         <input
//           type="text"
//           value={word}
//           onChange={handleInputChange}
//           placeholder="Enter a word"
//           className="border p-2 w-64"
//         />
//         <button onClick={handleSearch} className="bg-blue-500 text-white p-2 ml-2">
//           Search
//         </button>
//       </div>

//       {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

//       {data && (
//         <div className="mt-4 text-center">
//           <h2 className="text-xl font-bold">{data[0]?.word}</h2>
//           <p>{data[0]?.meanings[0]?.definitions[0]?.definition}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';

function App() {
  const [word, setWord] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchApiData = async () => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch definition. Please try again.');
      setData(null);
    }
  };

  const handleInputChange = (e) => {
    setWord(e.target.value);
  };

  const handleSearch = () => {
    if (word.trim()) {
      fetchApiData();
    } else {
      setError('Please enter a word to search.');
      setData(null);
    }
  };

  const handlePlayAudio = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center mb-4">
        <input
          type="text"
          value={word}
          onChange={handleInputChange}
          placeholder="Enter a word"
          className="border p-2 w-64"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 ml-2">
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

      {data && (
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold">{data[0]?.word}</h2>
          <p>{data[0]?.meanings[0]?.definitions[0]?.definition}</p>
          <button
            onClick={() => handlePlayAudio(data[0]?.word)}
            className="bg-green-500 text-white p-2 mt-2"
          >
            Play Audio
          </button>
        </div>
      )}
    </div>
  );
}

export default App;






<div>
{apishow && apishow.map((entry, index) => (
  <div key={index}>
    <h3>{entry.word}</h3>
    {entry.meanings.map((meaning, i) => (
      <div key={i}>
        <p>{meaning.partOfSpeech}</p>
        {meaning.definitions.map((def, j) => (
          <p key={j}>{def.definition}</p>
        ))}
      </div>
    ))}
  </div>
))}
</div>




 {/* Display fetched data */}
 <div className="mt-10 flex justify-center">
 <div className="w-full max-w-2xl">
   {apishow.length > 0 ? (
     <div className="bg-white p-6 rounded-lg shadow-lg">
       {apishow.map((entry, index) => (
         <div key={index} className="mb-4">
           <h2 className="text-2xl font-bold mb-2">{entry.word}</h2>
           <p className="text-gray-700">{entry.meanings[0].definitions[0].definition}</p>
         </div>
       ))}
     </div>
   ) : (
     <p className="text-gray-500">No data to display</p>
   )}
 </div>
</div>



{/* this is a search bar */}
        {/* <div className="mt-36">
          <form
            onSubmit={handleSearch}
            className="w-full md:w-[780px] relative bg-white min-w-sm flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
          >
            <input
              id="search-bar"
              placeholder="your keyword here"
              className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
              value={word}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70"
            >
              <div className="relative">
                <div className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                  <svg
                    className="opacity-0 animate-spin w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
                <div className="flex items-center transition-all opacity-1 valid:">
                  <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                    Search
                  </span>
                </div>
              </div>
            </button>
          </form>
        </div> */}



         {/* Display fetched data */}
      {/* <div className="mt-10 flex justify-center">
        {apishow.length > 0 ? (
          <div className="flex flex-col gap-4 w-full max-w-2xl">
            {apishow.map((entry, index) => (
              <div key={index} className="p-4 rounded shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl md:text-5xl font-bold">
                    {entry.word}
                  </h2>
                  {entry.phonetics.length > 0 && entry.phonetics[0].audio && (
                    <button
                      className="bg-black text-white px-3 py-1 rounded"
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
      </div> */}
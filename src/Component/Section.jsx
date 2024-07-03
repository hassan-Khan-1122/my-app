


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
  const [inputError, setInputError] = useState(false);
  const [notfound, setNotFound] = useState(false);
  const [searchError, setSearchError] = useState("");
  const { isDark, fontStyle, fontClasses } = useDictionary();

  const containerClass = isDark
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-800";
  const buttonClass = isDark ? "bg-black text-white" : "bg-gray-800 text-white";
  const labelClass = isDark ? "border-gray-700" : "border-gray-300";

  const fetchApiData = async (word) => {
    try {
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (res.data.length === 0) {
        setNotFound(true);
      } else {
        setApiShow(res.data);
      }
    } catch (error) {
      const searchError = await error.response.data.message;
      if (error) {
        setNotFound(true);
        setSearchError(searchError);
      }
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    setWord(e.target.value);

    if (inputError && e.target.value.trim()) {
      setInputError(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setNotFound(false);
    if (word.trim() === "") {
      setInputError(true);
      return;
    }
    fetchApiData(word);
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
    <div className={`min-h-[100vh] ${containerClass} ${fontClasses[fontStyle]}`}>
      <div className={`flex justify-center ${containerClass}`}>
        <div className="w-full max-w-2xl mt-20 px-4">
          <label
            className={`relative flex items-center justify-between border py-2 px-4 rounded-2xl shadow-2xl ${
              isDark ? "bg-black" : "bg-white"
            } ${inputError ? "border-red-500" : labelClass}`}
            htmlFor="search-bar"
          >
            <input
              id="search-bar"
              placeholder="Enter your keyword here"
              className={`flex-1 px-4 py-2 rounded-md outline-none ${
                isDark ? "bg-black" : "bg-white"
              } ${fontClasses[fontStyle]}`}
              value={word}
              onChange={handleInputChange}
            />
            <CiSearch
              className="text-3xl cursor-pointer text-[#e72ae7] "
              onClick={handleSearch}
            />
          </label>

          {inputError && (
            <p className="text-red-500 mt-2">
              Please enter a keyword to search.
            </p>
          )}
        </div>
      </div>

      <div className={`pt-10 flex justify-center ${containerClass} ${fontClasses[fontStyle]}`}>
        {notfound ? (
          <p className="text-red-500 mt-14 text-2xl font-bold">
            {searchError}
          </p>
        ) : apishow.length > 0 ? (
          <div className="flex flex-col gap-4">
            {apishow.map((entry, index) => (
              <div
                key={index}
                className={`p-4 rounded shadow-lg ${
                  isDark
                    ? " text-white"
                    : " text-gray-800"
                } ${fontClasses[fontStyle]}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-5xl md:text-5xl font-bold">
                    {entry.word}
                  </h2>
                  {entry.phonetics.length > 0 && entry.phonetics[0].audio && (
                    <button
                      className={`px-3 py-1 rounded ${buttonClass}`}
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
                  <h2 className="text-3xl font-semibold">Definitions</h2>
                  {entry.meanings.map((meaning, index) => (
                    <div key={index} className="mt-2">
                      <p className="text-lg font-bold">
                        {meaning.partOfSpeech}
                      </p>
                      <ul className="list-disc list-inside">
                        {meaning.definitions.map((definition, index) => (
                          <li key={index} className="text-base">
                            {definition.definition}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-14 text-3xl font-bold">
            Try searching for a word!
          </p>
        )}
      </div>
    </div>
  );
}

export default Section;


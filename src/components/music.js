import Papa from 'papaparse';
import { Navigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Angry from '../music/Angry.csv';
import Disgusted from '../music/Disgusted.csv';
import Fearful from '../music/Fearful.csv';
import Happy from '../music/Happy.csv';
import Sad from '../music/Sad.csv';
import Surprised from '../music/Surprised.csv';
import Neutral from '../music/Neutral.csv';
import ReactPlayer from 'react-player'
import './music.css';
import { FaLocationDot } from "react-icons/fa6";
import music from '../assets/musical-note.png'
import { useAuth } from '../context';

function MusicPage(props) {
    const location = useLocation();
    const data = location.state;
    const [csvData, setCsvData] = useState([]);
    const [header, setHeader] = useState(null);
    const [languageColumnIndex, setLanguageColumnIndex] = useState(-1);
    const [musicIndex, setMusicIndex] = useState(0);
    const [languageFilter, setLanguageFilter] = useState(data.place);
    const [emotionFilter, setEmotionFilter] = useState(data.emt || 'Neutral');
    const { userLoggedIn } = useAuth()


    const emotionCsvMap = {
        Angry,
        Happy,
        Surprised,
        Disgusted,
        Fearful,
        Sad,
        Neutral,
    };

    const papaConfig = {
        complete: (results, file) => {
            setHeader(results.data[0]);
            const languageIndex = results.data[0].indexOf('Language');
            setLanguageColumnIndex(languageIndex);
            const dataWithoutHeader = results.data.slice(1);
            setCsvData(dataWithoutHeader);
        },
        download: true,
        error: (error, file) => {
            console.log('Error while parsing:', error, file);
        },
    };

    useEffect(() => {
        const selectedCsv = emotionCsvMap[emotionFilter];
        Papa.parse(selectedCsv, papaConfig);
    }, [emotionFilter]);

    const handleLanguageSelect = (selectedLanguage) => {
        setLanguageFilter(selectedLanguage);
    };

    const handleEmotionSelect = (selectedEmotion) => {
        setEmotionFilter(selectedEmotion);
    };

    const handlePrevSong = () => {
        setMusicIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNextSong = () => {
        setMusicIndex((prevIndex) => Math.min(prevIndex + 1, 4));
    };
    const [selectedValue, setSelectedValue] = useState('');

    const handleDropdownChange = (event) => {
        setEmotionFilter(event.target.value);
    };

    const handleLanDropdownChange = (event) => {
        setLanguageFilter(event.target.value);
    };


    return (
        <>
            {!userLoggedIn && (<Navigate to={'/login'} replace={true} />)}

            <nav className='filters'>

                <select id="dropdown" value={emotionFilter} onChange={handleDropdownChange}>
                    <option value="Happy">Happy 😁</option>
                    <option value="Angry">Angry 😡</option>
                    <option value="Sad">Sad 😔</option>
                    <option value="Surprised">Surprised 😯</option>
                    <option value="Fearful">Fearful 😱</option>
                    <option value="Disgusted">Disgusted 🤢</option>
                    <option value="Neutral">Neutral 😐</option>
                </select>

                <select id="dropdown" value={languageFilter} onChange={handleLanDropdownChange}>
                    <option value="English">English 🅰 </option>
                    <option value="Malayalam">Malayalam 🅰</option>
                </select>

            </nav>

            <div className='song-container'>
                <ul className='songlist'>
                    {csvData
                        .filter(row => languageFilter === null || (languageColumnIndex !== -1 && row[languageColumnIndex] === languageFilter))
                        .map((row, index) => (
                            <>
                                {index === musicIndex &&
                                    <li key={index}>
                                        <img className='preview' src={row[row.length - 1]} alt={`Song ${index + 1} Preview`} />
                                        <div className='audiobox'>

                                            <ReactPlayer className="cat" url={row[row.length - 2]} controls config={{ file: { forceAudio: true } }} />
                                        </div>
                                    </li>}
                            </>
                        ))}
                </ul>
                <div className='songsnavigate'>
                    <button onClick={handlePrevSong}>Previous</button>
                    <button onClick={handleNextSong}>Next</button>
                </div>
            </div>
        </>
    );
}

export default MusicPage;

import React, { useState } from 'react';
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai';
import list from '../assets/languages.json';

function Dropdown({ onSelect, defaultLang }) {
    console.log('got it as lang')
    console.log(defaultLang)
    console.log('got it as lang')
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(defaultLang);



    return (
        <div>
            <button
                onClick={() => {
                    setIsOpen((prev) => !prev);


                }}
            >
                {selectedLanguage} {!isOpen ? (<AiOutlineCaretDown className='h-8' />) : <AiOutlineCaretUp className='h-8' />}
            </button>
            {isOpen && (
                <div>
                    {list.map((item, i) => (
                        <div
                            onClick={() => {
                                setSelectedLanguage(item.language)
                                setIsOpen(false);
                                onSelect(item.language);
                            }}
                            key={i} >
                            <h3 className='font-bold'>{item.language}</h3>
                            <h3>{item.icon}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;

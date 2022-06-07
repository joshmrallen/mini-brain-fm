import React, { useState } from 'react';
import {AiFillCloseCircle} from 'react-icons/ai'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {AiOutlineArrowRight} from 'react-icons/ai'
import {FaPlay} from 'react-icons/fa'
import {FaPause} from 'react-icons/fa'

export default function PlayerContainer({toggleMentalState}){

    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        console.log("play/pause toggled!")
    }

    return(
        <div id="player-container">

            <button onClick={toggleMentalState}><AiFillCloseCircle /></button>
            <button><AiOutlineArrowLeft /></button>
            <button onClick={togglePlayPause}>
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button><AiOutlineArrowRight /></button>

        </div>
    );
}
import React, { useState } from 'react';
import {AiFillCloseCircle, AiOutlineRollback} from 'react-icons/ai'
import {FaPlay, FaPause} from 'react-icons/fa'
import {BsSkipBackwardFill, BsSkipForwardFill, BsArrowCounterclockwise, BsArrowClockwise} from 'react-icons/bs'

export default function PlayerContainer({toggleMentalState}){

    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        console.log("play/pause toggled!")
    }

    return(
        <div id="player-container">

            <button onClick={toggleMentalState}><AiOutlineRollback /></button>
            <button><BsSkipBackwardFill /></button>
            <button><BsArrowCounterclockwise /></button>
            <button onClick={togglePlayPause}>
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button><BsArrowClockwise /></button>
            <button><BsSkipForwardFill /></button>

        </div>
    );
}
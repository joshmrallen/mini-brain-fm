import React, { useState, useRef } from 'react';
import {AiFillCloseCircle, AiOutlineRollback} from 'react-icons/ai'
import {FaPlay, FaPause} from 'react-icons/fa'
import {BsSkipBackwardFill, BsSkipForwardFill, BsArrowCounterclockwise, BsArrowClockwise} from 'react-icons/bs'

export default function PlayerContainer({toggleMentalState}){
    //state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);

    //references
    const audioPlayer = useRef(); //reference audio component

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if(!prevValue){
            audioPlayer.current.play();
            console.log("Playing track...")
        } else {
            audioPlayer.current.pause();
            console.log("Pausing track.")
        }
    }

    return(
        <div className="player-container">

            <audio ref={audioPlayer} src="http://localhost:3000/tracks/focus/1" preload="metadata"></audio>
            <button className='forward-backward' onClick={toggleMentalState}><AiOutlineRollback /></button>
            <button className='forward-backward'><BsSkipBackwardFill /></button>
            <button className='forward-backward back-thirty'><BsArrowCounterclockwise />30</button>
            <button className='play-pause' onClick={togglePlayPause}>
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button className='forward-backward'>30<BsArrowClockwise /></button>
            <button className='forward-backward'><BsSkipForwardFill /></button>

            { /* current time */}

            <div className='current-time'>0:00</div>

            {/* progress bar */}

            <div>
                <input type="range" className='progress-bar' />
            </div>

            {/* durration */}

            <div className='duration'>{duration}</div>

        </div>
    );
}
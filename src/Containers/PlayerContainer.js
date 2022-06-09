import React, { useState, useRef, useEffect } from 'react';
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

    //effect
    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration)
        setDuration(seconds)
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMins = minutes < 10 ? `0${minutes}` : `${minutes}`;

        const remainingSecs = Math.floor(secs % 60);
        const returnedSecs = remainingSecs < 10 ? `0${remainingSecs}` : `${remainingSecs}`;

        return `${returnedMins}:${returnedSecs}`;
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

            <div className='duration'>{formatTime(duration)}</div>

        </div>
    );
}
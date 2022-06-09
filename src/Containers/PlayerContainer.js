import React, { useState, useRef, useEffect } from 'react';
import {AiFillCloseCircle, AiOutlineRollback} from 'react-icons/ai'
import {FaPlay, FaPause} from 'react-icons/fa'
import {BsSkipBackwardFill, BsSkipForwardFill, BsArrowCounterclockwise, BsArrowClockwise} from 'react-icons/bs'

export default function PlayerContainer({toggleMentalState}){
    //state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    //references
    const audioPlayer = useRef(); //reference audio component
    const progressBar = useRef(); //reference progress bar element
    const animationRef = useRef(); //reference progress bar animation

    //effect
    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration)
        setDuration(seconds)
        progressBar.current.max = seconds;
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);
    

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if(!prevValue){
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
            console.log("Playing track...")
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
            console.log("Pausing track.")
        }
    }


    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMins = minutes < 10 ? `0${minutes}` : `${minutes}`;

        const remainingSecs = Math.floor(secs % 60);
        const returnedSecs = remainingSecs < 10 ? `0${remainingSecs}` : `${remainingSecs}`;

        return `${returnedMins}:${returnedSecs}`;
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`);
        setCurrentTime(progressBar.current.value);
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

            <div className='current-time'>{formatTime(currentTime)}</div>

            {/* progress bar */}

            <div>
                <input type="range" className='progress-bar' defaultValue='0' ref={progressBar} onChange={changeRange} />
            </div>

            {/* durration */}

            <div className='duration'>{(duration && !isNaN(duration)) ? formatTime(duration) : "0:00"}</div>

        </div>
    );
}
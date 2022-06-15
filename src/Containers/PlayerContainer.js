import React, { useState, useRef, useEffect } from 'react';
import {AiFillCloseCircle, AiOutlineRollback} from 'react-icons/ai'
import {FaPlay, FaPause} from 'react-icons/fa'
import {BsSkipBackwardFill, BsSkipForwardFill, BsArrowCounterclockwise, BsArrowClockwise} from 'react-icons/bs'

export default function PlayerContainer({mState, toggleMentalState}){
    //state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(1);

    //references
    const audioPlayer = useRef(); //reference audio component
    const progressBar = useRef(); //reference progress bar element
    const animationRef = useRef(); //reference progress bar animation

    //effect
    useEffect(() => {
        setIsPlaying(true);
        audioPlayer.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
        console.log("track changed")
    }, [currentTrack]);

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration)
        setDuration(seconds)
        progressBar.current.max = seconds;
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

    useEffect(() => {
        const max = progressBar.current.max

        if(currentTime == max){
            console.log(`isPlaying: ${isPlaying}`);
            skipToNextTrack();
        }

    }, [currentTime]);

    //methods 
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

    const backThirty = () => {
        console.log(`progressBar.current.value before: ${progressBar.current.value}`)
        progressBar.current.value = Number(progressBar.current.value) - 30;
        console.log(`progressBar.current.value after: ${progressBar.current.value}`)
        changeRange();
    }

    const forwardThirty = () => {
        console.log(`progressBar.current.value before: ${progressBar.current.value}; ${typeof progressBar.current.value}; using Number: ${Number(progressBar.current.value)}`)
        progressBar.current.value = Number(progressBar.current.value) + 30;
        console.log(`progressBar.current.value after: ${progressBar.current.value}`)
        changeRange();
    }

    /* current bug: 
    happens only in chrome (and probably safari)
        1. clicking the forwardThirty and backThirty buttons result in the file restarting. Also can't drag the knob. Track just restarts.
            works as expected in firefox.

        2. Can't seek by dragging the knob of the progress bar.
    */

   /* Todo:
        1. Add Track name to Audio player display
        2. Ask around in discord about chrome issue with forward/back 30 buttons.
        
   */

    const skipToNextTrack = () => {
        // only need to set currentTrack -- the effects (see line 18) will play the track automatically and update the animations.
        setCurrentTrack(prevTrack => {
            if(prevTrack < 3){
                return prevTrack + 1;
            } else {
                return 1;
            }
        });
    }

    const skipToPrevTrack = () => {
        setCurrentTrack(prevTrack => {
            if(prevTrack > 1){
                return prevTrack - 1;
            } else {
                return 3;
            }
        });
    }


    return(
        <div className="player-container">
            { console.log(`Current Mental State: ${mState}\nCurrent Track: ${currentTrack}`) }
            <audio ref={audioPlayer} src={`http://localhost:3000/tracks/${mState}/${currentTrack}`} preload="metadata"></audio>
            <button className='forward-backward' onClick={toggleMentalState}><AiOutlineRollback /></button>
            <button className='forward-backward' onClick={skipToPrevTrack}><BsSkipBackwardFill /></button>
            <button className='forward-backward back-thirty' onClick={backThirty}><BsArrowCounterclockwise />30</button>
            <button className='play-pause' onClick={togglePlayPause}>
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button className='forward-backward' onClick={forwardThirty}>30<BsArrowClockwise /></button>
            <button className='forward-backward' onClick={skipToNextTrack}><BsSkipForwardFill /></button>

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
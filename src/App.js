import React, { useState } from 'react';
import './App.css';
import MentalStateContainer from './Containers/MentalStateContainer';
import PlayerContainer from './Containers/PlayerContainer';



export default function App(){

    const [mentalStateOn, setMentalStateOn] = useState(false);
    const [mState, setMState] = useState(null);

    const toggleMentalState = (e) => {
        setMState(e.target.getAttribute("name"));
        setMentalStateOn(!mentalStateOn);
        
        console.log(`Mental State: ${mState}`);
        console.log(`clicked! mental state is currently: ${mentalStateOn}`)
    }




    return(
        <>
            <div id="title"><h1>Activate with MiniBrain.fm</h1></div>
            { 
                mentalStateOn ? <PlayerContainer mState={mState} toggleMentalState={toggleMentalState} /> 
                : <MentalStateContainer toggleMentalState={toggleMentalState} /> 
            }
            
        
        </>
    );
}



import React, { useState } from 'react';
import './App.css';
import MentalStateContainer from './Containers/MentalStateContainer';



export default function App(){

    const [mentalStateOn, setMentalState] = useState(false);

    const toggleMentalState = () => {
        setMentalState(!mentalStateOn);
        console.log(`clicked! mental state is currently: ${mentalStateOn}`)
    }




    return(
        <>
            <div id="title"><h1>Activate with MiniBrain.fm</h1></div>
            <MentalStateContainer toggleMentalState={toggleMentalState} />
        
        </>
    );
}



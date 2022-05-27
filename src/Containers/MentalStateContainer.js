import React from 'react';
import MentalStateCard from '../Components/MentalStateCard';

export default function MentalStateContainer({toggleMentalState}){



    return(
        <div id="mental-state-container">
            <MentalStateCard name='focus' toggleMentalState = {toggleMentalState} />
            <MentalStateCard name='relax' toggleMentalState = {toggleMentalState} />
            <MentalStateCard name='sleep' toggleMentalState = {toggleMentalState} />
        </div>
    );
}
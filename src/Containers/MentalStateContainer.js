import React from 'react';
import MentalStateCard from '../Components/MentalStateCard';

export default function MentalStateContainer(){



    return(
        <div id="mental-state-container">
            <MentalStateCard name='focus' />
            <MentalStateCard name='relax' />
            <MentalStateCard name='sleep' />
        </div>
    );
}
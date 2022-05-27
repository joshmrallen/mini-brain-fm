import React from 'react';

export default function MentalStateCard({name}){

    const displayName = () => {
        switch(name){
            case "focus":
                return "Focus";
            case "relax":
                return "Relax";
            case "sleep":
                return "Sleep";
            default: ""
        }
    }

    return(
        <div class="mental-state-card">Mental State Card: {displayName()}</div>
    );
}
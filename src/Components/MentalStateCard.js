import React from 'react';

export default function MentalStateCard({name, toggleMentalState}){

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
        <div name={name} className="mental-state-card" onClick = {toggleMentalState}>Mental State Card: {displayName()}</div>
    );
}
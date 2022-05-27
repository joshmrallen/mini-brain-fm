import React from 'react';
import './App.css';
import MentalStateContainer from './Containers/MentalStateContainer';



export default class App extends React.Component {



    render(){

        return(
            <>
                <div id="title"><h1>Activate with MiniBrain.fm</h1></div>
                <MentalStateContainer />
            
            </>
        );
    }
}



import React from 'react';
import './App.css'
import MainCard from './components/MainCard'
import OptionsSide from './components/OptionsSide/OptionsSide'

export default function App() {
    return (
        <div className="wrapper">
            <OptionsSide></OptionsSide>

            <div className="card-container">
                <MainCard></MainCard>
            </div>
        </div>
    );
}
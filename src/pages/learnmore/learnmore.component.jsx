import React from 'react';
import './learnmore.styles.scss'
import learnmoreBackground from "./learnmorebackground.jpg"
const LearnMore = ({history, match}) => (

    <div className='learn-more-page'>
        <img className='learn-more-page-background' src={learnmoreBackground}></img>
        <div className='content'> 
            <h1 className='learn-title'>EXPLORING THE WORLD ONE ITINERARY AT A TIME</h1>
            <div className = 'learn-box'>
                <div className='learn-more-content'>&emsp;The internet is littered with itineraries which are hard to find and hard to trust. At Travideas, you can browser itineraries rated by people all over the world which are written by locals, expert travels, or simply people who are traveling for fun. To explore, click on either the search tab or the most popular tab. Or you can create an account and begin writing your own itineraries to help a fellow traveler out. You can also use your profile to favorite accounts that you want to view later. Happy exploring!</div> 
            </div>
            <button className='explore-learn-button' onClick={() => history.push(`${'popular'}`)}>EXPLORE</button>
        </div>
        
        
    </div> 
)


export default LearnMore;


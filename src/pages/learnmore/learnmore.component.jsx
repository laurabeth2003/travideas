import React from 'react';
import './learnmore.styles.scss'

const LearnMore = ({history, match}) => (

    <div className='learn-more-page'>
        <div className='learn-more-page-background' style = {{
             backgroundImage: `url(${'https://images.unsplash.com/photo-1543258326-f076470a4415?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2187&q=80'})`
        }}></div>
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


import React from 'react';
import './homepage.styles.scss'
import homepageBackground from "./homepagebackground.jpg"
const HomePage = ({history, match}) => (

    <div className='homepage'>
        <img className='homepage-background' src={homepageBackground}></img>
        <div className='content'> 
            <h1 className='title'>EXPLORING THE WORLD ONE ITINERARY AT A TIME</h1>
            <button className='learn-more' onClick={() => history.push(`${match.url}${'learn-more'}`)}>FIND OUT MORE</button>
            <button className='explore-button' onClick={() => history.push(`${match.url}${'popular'}`)}>EXPLORE</button>
        </div>
        
        
    </div> 
)


export default HomePage;

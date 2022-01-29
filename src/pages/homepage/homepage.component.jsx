import React from 'react';
import './homepage.styles.scss'

const HomePage = ({history, match}) => (

    <div className='homepage'>
        <div className='homepage-background' style = {{
             backgroundImage: `url(${'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'})`
        }}></div>
        <div className='content'> 
            <h1 className='title'>EXPLORING THE WORLD ONE ITINERARY AT A TIME</h1>
            <button className='learn-more' onClick={() => history.push(`${match.url}${'learn-more'}`)}>FIND OUT MORE</button>
            <button className='explore-button' onClick={() => history.push(`${match.url}${'popular'}`)}>EXPLORE</button>
        </div>
        
        
    </div> 
)


export default HomePage;

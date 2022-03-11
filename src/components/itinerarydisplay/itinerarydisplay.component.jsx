import React from 'react';
import './itinerarydisplay.styles.scss'
import {Link} from 'react-router-dom';

const ItineraryDisplay = ({itinerary, classname, history, match, show}) => {
    let itineraryrange
    if (itinerary['lengthNum'] === 3) {
        itineraryrange = '1-3 DAYS'
    }
    else if (itinerary['lengthNum'] === 6) {
        itineraryrange = '4-6 DAYS'
    }

    else if (itinerary['lengthNum'] === 9) {
        itineraryrange = '7-9 DAYS'
    }

    else {
        itineraryrange = '10+ DAYS'
    }

    let communityrating = Number((itinerary['communityratingtotal'] / itinerary['communitymembers']).toFixed(2))
    console.log(show)
    return(
    <Link to={'/' + itinerary['id']}>
        
        <div className = {classname}>
            <div className='itinerary-image' style = {{
                backgroundImage: `url(${itinerary['coverurl']})`
            }}/>
            
                

            
            
            <div className={show === null ? 'no-title-container' : 'title-container'}>
                <div className='itinerary-title'>{itinerary['citylower'].toUpperCase() + ', ' + itinerary['countrylower'].toUpperCase()}</div>
            </div>


            <div className={show === null ? 'no-length-container' : 'length-container'}>
                <div className='length-title'>{'LENGTH: ' + itineraryrange}</div>
            </div>

            <div className={show === null ? 'no-community-container' : 'community-container'}>
                <div className='community-title'>{'Community Rating: ' + communityrating}</div>
            </div>

            
            
        
        </div>
    </Link>
    )


}

export default ItineraryDisplay
import React from 'react';
//import CreateForm from '../../components/create/create-form.component'
import ItineraryDisplay from '../itinerarydisplay/itinerarydisplay.component';
import './search-component.styles.scss'


const SearchComponents = ({itineraries, page}) => {
    const sliceitinerary = itineraries.slice((page - 1) * 4, ((page - 1) * 4) + 4)
    return(<div className='search-component-container'>{
        
        (sliceitinerary.length !== 0 && sliceitinerary[0] !== 0)?
        (sliceitinerary.map((itinerary, id) => <ItineraryDisplay key={itinerary['id']} classname = 'itinerary-container1' itinerary={itinerary} show={false}/>)) :
        console.log("")
    }
    
    </div>)
}

export default SearchComponents;
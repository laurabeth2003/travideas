import React from 'react';
import "./accordion.styles.scss"
import {BiUpArrow, BiDownArrow} from 'react-icons/bi'
import {useState} from 'react'; 
import ItineraryDisplay from '../itinerarydisplay/itinerarydisplay.component'






function Accordion({classname1, classname2, classname3, children, title, i}) {
    
    const [selected, setSelected] = useState(null)
    
    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null)
        }

        setSelected(i)
    }
    console.log(selected)
    return (
    <div className = {classname1}>    
        <div className = {classname2} onClick={() => toggle(i)}>
            <div className = 'title' >{title}</div>
            <div className = 'arrow'>{selected === i ? <BiUpArrow/> : <BiDownArrow/>}</div>
            
        </div>
        <div className = {selected === i ? `${classname3}-show` : `${classname3}`}>
            {children.map(child => (child === 'NONE' ?
                <div className = 'text'>NONE</div> : <ItineraryDisplay key={child['id']} classname = 'itinerary-container2' itinerary={child} show={selected}/>
                ))
            }
        </div>
    </div>

    )


}

export default Accordion
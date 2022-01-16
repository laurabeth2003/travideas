import React from 'react';
import "./accordion.styles.scss"
import {BiUpArrow, BiDownArrow} from 'react-icons/bi'
import {useState} from 'react'; 







function Accordion({classname1, classname2, classname3, children, title, i}) {
    
    const [selected, setSelected] = useState(null)
    
    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null)
        }

        setSelected(i)
    }

    return (
    <div className = {classname1}>    
        <div className = {classname2} onClick={() => toggle(i)}>
            <div className = 'title' >{title}</div>
            <div className = 'arrow'>{selected === i ? <BiUpArrow/> : <BiDownArrow/>}</div>
            
        </div>
        <div className = {selected === i ? `${classname3}-show` : `${classname3}`}>
            <div className='text'> HI</div>
            <div className='text'> OLLO</div>
            <div className='text'> BONJOUR</div>
        </div>
    </div>

    )


}

export default Accordion
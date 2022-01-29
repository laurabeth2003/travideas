import React from 'react';
import './search.styles.scss'

const Search = ({handleChange, label, inputName, labelName, groupName, ...otherProps}) => (
    <div className = {groupName}>
    {
        <label className={labelName}>
         {label}
        </label>
    }
        <input className={inputName} onChange={handleChange} {...otherProps} />
        {inputName === 'search-length-input' ? <div className = 'days-div'>DAYS</div> : null}
        
        
    
    </div>
)

export default Search
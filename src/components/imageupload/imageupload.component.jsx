import React, {useState}  from 'react';

import './imageupload.styles.scss'
const ImageUpload = ({handleChange, label, ...otherProps}) => {
    
    return (
        <div className = 'file-group'> 
            <label className='file-input-label'> 
                {label}
            </label>
            <input className = 'file-input' onChange={handleChange} {...otherProps}/>
            
        
        </div>
    )

}

export default ImageUpload

import React from 'react';
import './ColorRecognition.css';
import ColorDetails from './ColorDetails';

const ColorRecognition = ( { imageUrl, color_props, color_hidden } ) => {
    return color_hidden ? (
        <h2></h2>
    ) : (
        <div className="color-container" id="color-container">
                <div className='color-image'> 
                    <img 
                        src={imageUrl}
                        alt="Color Image will be displayed"
                    />
                </div>

                <div id="color-details">
                    <ColorDetails color_props={color_props} />
                </div>
        </div>
    )
}
export default ColorRecognition

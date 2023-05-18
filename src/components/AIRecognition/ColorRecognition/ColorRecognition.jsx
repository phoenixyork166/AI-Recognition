import React from 'react';
import './ColorRecognition.css';
import ColorDetails from './ColorDetails';

const ColorRecognition = ( { imageUrl, color_props } ) => {
    return (
        <div className="center ma" id="color-container">
               <img 
                id='color-image'
                src={imageUrl}
                alt="Image will be displayed"
                style={{
                    marginTop: '5vh',
                    width: '50vw',
                    height: '50vh',
                }}
                />

                <div id="color-details">
                    <ColorDetails color_props={color_props} />
                </div>
                

        </div>
    )
}
export default ColorRecognition

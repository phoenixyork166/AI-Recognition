import React from 'react';
import './ColorRecognition.css';
import ColorName from './ColorName';

const ColorRecognition = ( { imageUrl, eachColor } ) => {
    return (
        <div className="center ma">
            <ColorName eachColor={eachColor} />
            <div className='absolute mt2' id='big-box'>
               <img 
                id='color-image'
                src={imageUrl}
                alt="testing img"
                style={{
                    marginTop: '5vh',
                    width: '50vw',
                    height: '50vh',
                }}
                />
            <div 
                className='color-box' 
            />
                Hi123
            </div>
        </div>
    )
}
export default ColorRecognition

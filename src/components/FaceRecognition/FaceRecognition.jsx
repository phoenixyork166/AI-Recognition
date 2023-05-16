import React from 'react';
import './FaceRecognition.css';
import CelebrityName from './CelebrityName';

const FaceRecognition = ( { imageUrl, box, celebrityName } ) => {
    return (
        <div className="center ma">
            <CelebrityName celebrityName={celebrityName} />
            <div className='absolute mt2' id='big-box'>
               <img 
                id='inputimage'
                src={imageUrl}
                alt="testing img"
                style={{
                    marginTop: '5vh',
                    width: '50vw',
                    height: '50vh',
                }}
                />
                    <div 
                        className='bounding-box' 
                        style={{
                            top: box.topRow,
                            right: box.rightCol,
                            bottom: box.bottomRow,
                            left: box.leftCol,
                        }}
                    />
                    </div>
        </div>
    )
}
export default FaceRecognition
// From App.js:
// calculateFaceLocation()
// return {
//     topRow: clarifaiFace.top_row * height,
//     leftCol: clarifaiFace.left_col * width, 
//     bottomRow: height - (clarifaiFace.bottom_row * height),
//     rightCol: width - (clarifaiFace.right_col * width),
//   }

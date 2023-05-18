import React from 'react';
import './FaceRecognition.css';
import CelebrityName from './CelebrityName';

const FaceRecognition = ( { imageUrl, box, celebrityName } ) => {
    return (
        <div className="center ma">
            {/* <CelebrityName celebrityName={celebrityName} /> */}
            <div className='absolute mt2'>
                <div className='image-container'>
                   <img 
                    id='inputimage'
                    src={imageUrl}
                    alt="Image will be displayed"
                    style={{
                        marginTop: '5vh',
                        width: '50vw',
                        height: '50vh',
                    }}
                   /> 
                </div>
               
                <div 
                  className='bounding-box' 
                  style={{
                   top: box.topRow,
                   right: box.rightCol,
                   bottom: box.bottomRow,
                   left: box.leftCol,
                    }}
                >
                  <h3 className="celebrity-name">{celebrityName}</h3>
                </div>
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

import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ( { imageUrl, box, celebrityName, face_hidden } ) => {

    return face_hidden ? (
        <h2></h2>
        
    ) : ( 
        <div className="center ma">
            <div className='absolute mt2'>
                <div >
                   <img
                    // id='face-image' is used for DOM manipulation
                    // cannot be edited
                    id='face-image'
                    src={imageUrl}
                    alt="Image will be displayed"
                    // style={{
                    //     visibility: 'hidden'
                    // }}
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

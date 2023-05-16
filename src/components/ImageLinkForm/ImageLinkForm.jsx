import React from "react";
import './ImageLinkForm.css';

// Passing onInputChange event listener as props to App.js
const ImageLinkForm = ( { onInputChange, onButtonSubmit } ) => {
  return (
    <div className="">
      <p className='f3'>
        {'This Brain will detect faces in your pictures. \nGive it a try'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input 
            className='f4 pa2 w-70 center' 
            id='input'
            type="text" 
            onChange={onInputChange} 
          />
          <div className='ImageLinkButtons'>
            <button 
              className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
              onClick={onButtonSubmit}
            >
            Detect</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;

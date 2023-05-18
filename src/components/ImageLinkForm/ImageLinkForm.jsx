import React from "react";
import "./ImageLinkForm.css";

// Passing onInputChange event listener as props to App.js
const ImageLinkForm = ({ 
  onInputChange, 
  onCelebrityButton, 
  onColorButton,
  face_hidden,
  color_hidden,
}) => {
  return (
    <div className="center" id="container">
      <div id="paragraph">
        <p className="f3">
          {"This Brain will detect faces in your pictures. \nGive it a try"}
        </p>
      </div>

      <div id="container-inner">
        <div className="form center pa4 br3 shadow-5" id="input">
          <input
            className="f4 pa2 w-70 center"
            id="input-inner"
            type="text"
            onChange={onInputChange}
          />
        </div>
        <div className="buttons">
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onCelebrityButton}
          >
            Detect Celebrity
          </button>
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onColorButton}
          >
            Detect Color
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;

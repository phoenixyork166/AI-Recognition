import React, { Component } from "react";
import "./App.css";
// import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

// const app = new Clarifai.App({
//   apiKey: '910f3adce45b4519a33c50ab13e1efcb'
// });

// Most API requires an API Key
const returnClarifaiRequestOptions = (imageUrl) => {
  
  const PAT = "b3e95c6890e443c29885edab45529224";

  const USER_ID = "phoenixyork166";
  const APP_ID = "my-app";
  // const MODEL_ID = "face-detection";
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return requestOptions;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      celebrity: {},
      celebrityName: '',
    }
  }

  findCelebrity = (data) => {
    // We'd like to only get 1 celebrity at a time
    const clarifaiCelebrity = data.outputs[0].data.regions[0].data.concepts[0];
    const celebrityName = clarifaiCelebrity.name;
    const celebrityValue = clarifaiCelebrity.value;

    return {
      name: celebrityName,
      value: celebrityValue,
    }

  }

  displayCelebrity = (celebrity) => {
    this.setState({celebrity: celebrity},
    () => console.log('Celebrity object: \n', celebrity)
    );
    
  }

  // Face-detection func
  calculateFaceLocation = (data) => {
    // We'd like to try only get 1 face now
    // bounding_box is % of image size
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // DOM manipulation
    // for <img id='...'/> in <FaceRecognition/>
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log('img width:\n', width, '\nimg height:\n', height)
    console.log('bounding box - calcFaceLocaiton\n', clarifaiFace);
    // returning an object to fill up this.state.box
    // img width 238px
    // img height 384px
    // sample dataset (%)
    // { top_row: 0.0871627, left_col: 0.3230537, bottom_row: 0.8270308, right_col: 0.7289897 }

    // sample dataset (px)
    // { top_row: 33.47(h), 
    // left_col: 76.89(w), 
    // bottom_row: 66.42(h), 
    // right_col: 64.5(w) }
    return {
      topRow: clarifaiFace.top_row * height,
      leftCol: clarifaiFace.left_col * width, 
      bottomRow: height - (clarifaiFace.bottom_row * height),
      rightCol: width - (clarifaiFace.right_col * width),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box},
    () => console.log('box object: \n', box)
    );
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value},
    () => console.log(event.target.value)
    );
  };

  onButtonSubmit = () => {
    // Whenever clicking Detect button
    // setState imageUrl: this.state.input from InputChange
    this.setState({imageUrl: this.state.input},
      () => console.log('this.state.input:\n', this.state.input));
    console.log("click");

  // On Button Click => run function(Face Detection)
  // app.models.predict('Model ID', 'URL').then(...)

  //   app.models.predict(Clarifai.COLOR_MODEL, this.state.input)
  //     .then(response => console.log(response.json()))
  //     .catch(err => console.log('Errors...', err));
  // } 

  // fetch("https://api.clarifai.com/v2/models/general-image-recognition/outputs", returnClarifaiRequestOptions(imageUrl))
    fetch(
        "https://api.clarifai.com/v2/models/" +
        "celebrity-face-detection" +
        "/outputs",
        returnClarifaiRequestOptions(this.state.input)
      )

        .then((response) => response.json())
        .then((response) => {
        console.log("HTTP Response: \n", response);
        console.log('bounding box', response.outputs[0].data.regions[0].region_info.bounding_box)
        console.log('Celebrity obj:\n', response.outputs[0].data.regions[0].data.concepts[0]);
        // Face-detection model
        this.displayFaceBox(this.calculateFaceLocation(response));
        // Celebrity-face-detection
        this.displayCelebrity(this.findCelebrity(response));
        // this.displayFaceBox() setState({box: box})
        // getting values returned by:
        // this.calculateFaceLocation return {
           // leftCol: clarifaiFace.left_col * width, 
           // topRow: clarifaiFace.top_row * height, 
           // rightCol: width - (clarifaiFace.right_col * width),
           // bottomRow: height - (clarifaiFace.bottom_row * height)
        // }
        })
        .catch((err) => console.log(err));

  };
  

  render() {
    // const { imageUrl } = this.state;
    {console.log('this.state.input: \n', this.state.input)};
    {console.log('this.state.imageUrl: \n', this.state.imageUrl)};
    {console.log('this.state.box: \n', this.state.box)};
    {console.log('this.state.celebrity: \n', this.state.celebrity)};
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition 
          box={this.state.box} 
          imageUrl={this.state.imageUrl} 
          celebrityName={this.state.celebrity.name}
        />
      </div>
    );
  }
}

export default App;

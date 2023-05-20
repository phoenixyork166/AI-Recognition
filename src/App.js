import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/AIRecognition/FaceRecognition/FaceRecognition";
import ColorRecognition from "./components/AIRecognition/ColorRecognition/ColorRecognition";
import AgeRecognition from "./components/AIRecognition/AgeRecognition/AgeRecognition";

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
      colors: [],
      age: [],
      face_hidden: true,
      color_hidden: true,
      age_hidden: true,
      responseStatusCode: Number(''),
      disabled: {
        celebrity_active: null,
        color_active: null,
        age_active: null,
        }
    }
  }

  // For Celebrity detection model
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

  // For Color detection model
  findColor = (data) => {
      const clarifaiColors = data.outputs[0].data.colors
      console.log('data - Colors:\n', clarifaiColors)

      return clarifaiColors.map(color => {
        return {
          colors: color,
        }
      });
    }

  // For Age detection model
  findAge = (data) => {
    const clarifaiAges = data.outputs[0].data.concepts
    console.log('findAge(data) - Ages:\n', clarifaiAges)

    return clarifaiAges.map(each_age => {
      return {
        age: each_age,
      }
    });
  
  }

  // For Celebrity detection model
  displayCelebrity = (celebrity) => {
    this.setState({celebrity: celebrity},
    () => console.log('Celebrity object: \n', celebrity)
    );
    
  }

  // For Color detection model
  displayColor = (colorInput) => {
    this.setState({colors: colorInput},
    () => console.log('Colors obj locally stored: \n', colorInput)
    );
  }

  // For Age detection model
  displayAge = (ageInput) => {
    this.setState({age: ageInput},
    () => console.log('Age group objs locally stored: \n', ageInput)
    );
  }

  // Face-detection func
  calculateFaceLocation = (data) => {
    // We'd like to try only get 1 face now
    // bounding_box is % of image size
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // DOM manipulation
    // for <img id='...'/> in <FaceRecognition/>
    const image = document.getElementById('face-image');
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
    () => console.log('Input value:\n', event.target.value)
    );
  };

  validateState = () => {
    const celebrity_detection = document.querySelector('#face-image');
    const celebrity_name = document.querySelector('#root > div > div.center.ma > div > div.bounding-box > h3');
    const color_box = document.querySelector('#color-container > div.color-image > img')
    const color_details = document.querySelector('#color-details');
    const age_detection = document.querySelector('#face-image')
    const age_number = document.querySelector('#age-number > h3')

    // When Face detection is in place
    if (this.state.face_hidden === false && this.state.color_hidden === true && this.state.age_hidden === true) {
      celebrity_detection.style.display = 'none'
      celebrity_name.style.display = 'none'
      this.setState({face_hidden: this.state.face_hidden = true})
      this.setState({celebrity: this.state.celebrity = {} })

    // When Color detection is in place
    } else if (this.state.face_hidden === true && this.state.color_hidden === false && this.state.age_hidden === true) {
      color_box.style.display = 'none'
      color_details.style.display = 'none'
      this.setState({color_hidden: this.state.color_hidden = true})
      this.setState({colors: this.state.colors = [] })

    // When Age detection is in place
    } else if (this.state.face_hidden === true && this.state.color_hidden === true && this.state.age_hidden === false) {
      age_detection.style.display = 'none'
      age_number.style.display = 'none'
      this.setState({age_hidden: this.state.age_hidden = true})
      this.setState({age: this.state.age = [] })

    }

  
  }

  onCelebrityButton = () => {
    this.validateState()
    // Whenever clicking Detect button
    // setState imageUrl: this.state.input from InputChange
    this.setState({imageUrl: this.state.input},
      () => console.log('this.state.input:\n', this.state.input));


    // Disable Detect Celebrity button when Celebrity Detection is Active
    this.setState({celebrity_active: this.state.disabled.celebrity_active = true})
    this.setState({color_active: this.state.disabled.celebrity_active = false})
    this.setState({age_active: this.state.disabled.age_active = false})

    this.setState({face_hidden: false},
      () => console.log('this.state.face_hidden:\n', this.state.face_hidden));

    // Clearing out this.state.celebrity before future fetching
    this.setState({celebrity: this.state.celebrity = {} });

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
        console.log("HTTP request status code:\n", response.status.code);
        console.log('bounding box', response.outputs[0].data.regions[0].region_info.bounding_box)
        console.log('Celebrity obj:\n', response.outputs[0].data.regions[0].data.concepts[0]);
        // Face-detection model
        this.displayFaceBox(this.calculateFaceLocation(response));
        // Celebrity-face-detection
        this.displayCelebrity(this.findCelebrity(response));
        // Store HTTP response status code
        this.setState({responseStatusCode: response.status.code});
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

  onColorButton = () => {
   this.validateState()
    
    // Whenever clicking Detect button
    // setState imageUrl: this.state.input from InputChange
    this.setState({imageUrl: this.state.input},
      () => console.log('this.state.input:\n', this.state.input));
    
    // Disable Detect Color button when Color Detection is Active
    this.setState({celebrity_active: this.state.disabled.celebrity_active = false})
    this.setState({color_active: this.state.disabled.celebrity_active = true})
    this.setState({age_active: this.state.disabled.age_active = false})

    this.setState({color_hidden: false},
      () => console.log('this.state.color_hidden:\n', this.state.color_hidden));

    // Clearing out this.state.colors before future fetching
    this.setState({colors: this.state.colors = [] });

    fetch(
        "https://api.clarifai.com/v2/models/" +
        "color-recognition" +
        "/outputs",
        returnClarifaiRequestOptions(this.state.input)
      )

        .then((response) => response.json())
        .then((response) => {
        const len = response.outputs[0].data.colors.length;
        console.log("HTTP Response: \n", response);
        console.log("HTTP request status code:\n", response.status.code);
        for (let i=0; i < len; i++) {
          console.log('Fetched Colors obj:\n', response.outputs[0].data);
          // color-detection
          // this.displayColor adding color hex to this.state.color
          // this.findColor(response) returns color hex
          this.displayColor(this.findColor(response));
        }
        })
        .catch((err) => console.log(err));
        
  };

  onAgeButton = () => {
    this.validateState()
    
    // Whenever clicking Detect button
    // setState imageUrl: this.state.input from InputChange
    this.setState({imageUrl: this.state.input},
      () => console.log('this.state.input:\n', this.state.input));
    
    // Disable Detect Age button when Age Detection is Active
    this.setState({celebrity_active: this.state.disabled.celebrity_active = false})
    this.setState({color_active: this.state.disabled.celebrity_active = false})
    this.setState({age_active: this.state.disabled.age_active = true})

    this.setState({age_hidden: false},
      () => console.log('this.state.age_hidden:\n', this.state.age_hidden));

    // Clearing out this.state.colors before future fetching
    this.setState({age: this.state.age = [] });

    fetch(
        "https://api.clarifai.com/v2/models/" +
        "age-demographics-recognition" +
        "/outputs",
        returnClarifaiRequestOptions(this.state.input)
      )

        .then((response) => response.json())
        .then((response) => {
          const len = response.outputs[0].data.concepts.length;
          console.log("HTTP Response\nAge Detection", response);
          console.log("HTTP request status code:\n", response.status.code);
            console.log('Fetched Age grp obj:\n', response.outputs[0].data.concepts);
            // color-detection
            // this.displayColor adding color hex to this.state.color
            // this.findColor(response) returns color hex
            this.displayAge(this.findAge(response));
          
          })
          .catch((err) => console.log(err));
        
  };
  
  render() {
    // const { imageUrl } = this.state;
    
    {console.log('this.state.input: \n', this.state.input)};
    {console.log('this.state.imageUrl: \n', this.state.imageUrl)};
    {console.log('this.state.box: \n', this.state.box)};
    {console.log('this.state.celebrity: \n', this.state.celebrity)};
    {console.log('this.state.colors: \n', this.state.colors)};
    {console.log('this.state.age: \n', this.state.age)};
    {console.log('this.state.face_hidden', this.state.face_hidden)};
    {console.log('this.state.color_hidden', this.state.color_hidden)};
    {console.log('this.state.age_hidden', this.state.age_hidden)};
    {console.log('this.state.responseStatusCode:\n', this.state.responseStatusCode)};

    const { age, colors } = this.state;
    const colors_array = colors.map(color => color)
    const age_props = age.map((each, i) => each.age.name)[0]
    console.log('age_props\n', age_props);

    return (
      <div className="App">
        <Navigation />
        <Logo />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onCelebrityButton={this.onCelebrityButton}
          celebrity_active={this.state.celebrity_active}
          onColorButton={this.onColorButton}
          color_active={this.state.color_active}
          onAgeButton={this.onAgeButton}
          age_active={this.state.age_active}
          face_hidden={this.state.face_hidden}
          color_hidden={this.state.color_hidden}
          age_hidden={this.state.age_hidden}
        />
        <FaceRecognition 
          box={this.state.box} 
          imageUrl={this.state.imageUrl} 
          celebrityName={this.state.celebrity.name}
          face_hidden={this.state.face_hidden}
        />
        <ColorRecognition
          imageUrl={this.state.imageUrl}
          color_props={colors_array}
          color_hidden={this.state.color_hidden}
        />
        <AgeRecognition
          age={age_props}
          imageUrl={this.state.imageUrl}
          age_hidden={this.state.age_hidden}
        />
      </div>
    );
  }
}

export default App;

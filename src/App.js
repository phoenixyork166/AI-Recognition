import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
// import { config } from './Particles-bg';
import ParticlesBg from 'particles-bg';

// ClarifiAPI UserID: phoenixyork166
// Documentation 
// https://docs.clarifai.com/?__hstc=26175983.aa71cc08acccd62c4c41c751c3c23945.1684054817578.1684054817578.1684054817578.1&__hssc=26175983.3.1684054817578&__hsfp=1466132241
function App() {
  return (
    <div className="App">
      <ParticlesBg 
        className="particles"
        type="cobweb" 
        bg={true} 
        // config={config} 
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import './App.css';

const particleOptions = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800 
        }
      }
    }
  
}

const app = new Clarifai.App({
  apiKey: '2e985394533c4351bf02038d50aef3a2'
 });

class App extends Component {
  constructor(){
    super();
    this.state = {
        input: '',
        imageUrl: '',
        box: []
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height) 
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box})
  } 

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
   app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
      .then(generalModel => {
        return generalModel.predict(this.state.input);
      })
      .then(response => {
        this.displayFaceBox(this.calculateFaceLocation(response))

      })
      .catch(err => console.log(err));
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
      </div>
    );  
  }
}

export default App;

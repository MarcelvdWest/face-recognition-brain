import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
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

const initialState = {
  input: '',
  imageUrl: '',
  error: [
    {
      message: '',
      validation: false
    }
  ],
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: '0',
    joined: new Date()
  }
}  

let resp = '';   

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  calculateFaceLocation = (data) => {
    console.log('test')
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
    this.setState({ box: box })
  } 

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    const { input } = this.state; 
    this.setState({ imageUrl: input, error: { validation : false }})
    fetch('http://localhost:3100/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          input: this.state.input
      })   
    }).then(response => response.json())
      .then(response => {
        resp = response
        console.log(resp)
        if(response !== "Unable To Work With API"){
          fetch('http://localhost:3100/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })   
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          }).catch(err => this.setState({ error: {
            message: resp ,
            validation: true
          }}))
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => this.setState({ error: {
        message: resp ,
        validation: true
      }}))
  }

  onRouteChange = (route) => {
    this.setErrorFalse();
    
    if(route === 'signout'){
      this.setState(initialState)
    } else if(route === 'home'){ 
      this.setState({isSignedIn: true})
    }
    this.setState({ route: route })
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  setErrorTrue = (resp) => {
    this.setState({ error: {
      message: resp ,
      validation: true
    }})
  }

  setErrorFalse = () => {
    this.setState({error: { validation: false }})
  }

  render(){
    const { box, imageUrl, isSignedIn, route , error, resp } = this.state
    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { error.validation === true 
            ? 
              ( 
                route === 'signout' || route === 'signin'
                  ?
                    <div>
                      <SignIn 
                        loadUser={this.loadUser} 
                        onRouteChange={this.onRouteChange} 
                        setErrorTrue={this.setErrorTrue} 
                      />
                      <h3>{ error.message }</h3>
                    </div>
                  : (
                      route === 'register'
                        ?
                          <div>
                            <Register 
                              loadUser={this.loadUser} 
                              onRouteChange={this.onRouteChange} 
                              setErrorTrue={this.setErrorTrue} 
                            />
                            <h3>{ error.message }</h3>
                          </div>
                        : (
                            <div>
                              <Logo />
                              <Rank name={this.state.user.name} entries={this.state.user.entries} />
                              <h3>{error.message}</h3>
                              <ImageLinkForm 
                                onInputChange={this.onInputChange} 
                                onButtonSubmit={this.onButtonSubmit}
                              />
                              <FaceRecognition 
                                imageUrl={imageUrl} 
                                box={box} 
                              />
                            </div>
                          )  
                    )   
                  )
            : (    
                route === 'home' 
                  ? <div>
                      <Logo />
                      <Rank name={this.state.user.name} entries={this.state.user.entries} />
                      <ImageLinkForm 
                        onInputChange={this.onInputChange} 
                        onButtonSubmit={this.onButtonSubmit}
                      />
                      <FaceRecognition 
                        imageUrl={imageUrl} 
                        box={box} 
                      />
                    </div>

                : (
                    route === 'signout' || route === 'signin'
                      ? <SignIn 
                          loadUser={this.loadUser} 
                          onRouteChange={this.onRouteChange} 
                          setErrorTrue={this.setErrorTrue} 
                        />
                      : <Register 
                          loadUser={this.loadUser} 
                          onRouteChange={this.onRouteChange} 
                          setErrorTrue={this.setErrorTrue} 
                        />
                  )
              )    
        }
      </div>
    );  
  }
}

export default App;

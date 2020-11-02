import React from 'react';
import MultiBox from './MultiBox';


const FaceRecognition= ({ resp, imageUrl, box, displayFaceBox, calculateFaceLocation, respCheck }) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={ imageUrl } width= '500px' height='auto'/>
                {
                    respCheck === true 
                        ? <MultiBox resp={resp} box={box} displayFaceBox={displayFaceBox} calculateFaceLocation={calculateFaceLocation}/>
                        : <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
                }
                
            </div>
        </div>    
          
    );
}

export default FaceRecognition;
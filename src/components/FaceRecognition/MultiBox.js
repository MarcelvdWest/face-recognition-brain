import React from 'react';
import Box from './Box';
import './FaceRecognition.css';

const MultiBox= ({ resp, box, displayFaceBox, calculateFaceLocation }) => {
    return(
        <div>
            {                
                resp.outputs[0].data.regions.map((regions, i) => {
                    displayFaceBox(calculateFaceLocation(resp, i))

                    return(
                        <Box key={i} box={box} />
                    );
                })
            }
        </div>        
    );
    
}

export default MultiBox;


import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm= ({ onInputChange, onButtonSubmit }) => {

    return(
        <div>
            <p className='f3'>
                {'This Magic Brain Will Detect Faces In Your Pictures.'}
            </p>
            <p className='f3'>
                {'To Give It a Try Use a Link To a Photo On The Web'}
            </p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-1'>
                    <input 
                        className='f4 pa2 w-70 center' 
                        type='text' 
                        onChange={onInputChange}
                        onKeyPress= {(event) => {
                                if(event.key === 'Enter'){
                                    onButtonSubmit()
                                }
                            }
                        }    
                    />
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-green' 
                        onClick={onButtonSubmit}>
                        Detect
                    </button>
                </div>
            </div>
        </div>    
          
    );
}

export default ImageLinkForm;
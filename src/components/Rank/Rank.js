import React from 'react';

const Rank = ({ name, entries }) => {
    return(
        <div>
            <div className='white f3'>
                {`${name} you've currently used the app on:`}
            </div>
            <div className='white f1'>
                {entries}
            </div>
            <div className='white f3'>
                { entries === 1
                    ?  'photo'
                    :  'photos'
                }  
                    
            </div>
        </div>
    );
}

export default Rank;
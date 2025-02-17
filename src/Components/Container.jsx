import React from 'react';

const Container = ({children}) => {
  return (
    <div className='container' style={{display: 'flex', justifyContent: 'space-around'}}>
        {children}
    </div>
  );
}

export default Container;
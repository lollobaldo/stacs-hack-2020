import React from 'react';
import PropTypes from 'prop-types';

import './Lights.scss';
import Bulb from './Bulb';

const Lights = ({ handler, state }) => {
  // const [state, setState] = useState(true);

  // const switchLight = () => {
  //   console.log('light switched');
  //   // console.log(publish);
  //   // console.log(safePublish);
  //   setState(!state);
  //   safePublish(
  //     'lights/floorlamp',
  //     state ? 'ON' : 'OFF'
  //   );
  // };

  return(
    <div
      className={state ? 'active' : ''}
      style={{
        'display': 'flex',
        'justifyContent': 'space-evenly',
        'alignItems': 'center',
        'flexDirection': 'column',
        'height': '100%'}}>

      {/* <Bulb state={state} onClick={() => alert('change')} /> */}
      <div className='bg-yellow'></div>
      <Bulb state={state} onClick={handler} />
      {/* <img src={state ? bulbON : bulbOFF} onClick={() => setState(!state)} /> */}
      {/* <div className="slider-container">
        <input
          type="range"
          min="1" max="100"
          className="slider"
          value={state ? 100 : 0}
          onChange={handleChange} />
      </div> */}
      {/* <h1>{state ? 'ON' : 'OFF'}</h1> */}
    </div>
  )
};

Lights.propTypes = {
  handler: PropTypes.func,
  state: PropTypes.bool,
}

export default Lights;

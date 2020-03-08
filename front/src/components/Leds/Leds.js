import React from 'react';
import PropTypes from 'prop-types';

import ColourWheel from '../ColourWheel';

import './Leds.scss';

// import { crossTrice } from '../../utils';

const Leds = ({ handler, state }) => (
  <div
    className={state ? 'active' : ''}
    style={{
      'display': 'flex',
      'justifyContent': 'space-evenly',
      'alignItems': 'center',
      'flexDirection': 'column',
      'height': '100%'}}>
      {/* <canvas></canvas> */}
    <ColourWheel
      radius={window.innerWidth * .4}
      padding={10}
      lineWidth={50}
      onColourSelected={handler}
      spacers={{
        colour: '#FFFFFF',
        shadowColour: 'grey',
        shadowBlur: 5
      }}
      colour={state}
      animated />
  </div>
);

Leds.propTypes = PropTypes.shape({
  handler: PropTypes.func,
  state: PropTypes.bool,
}).isRequired;

export default Leds;

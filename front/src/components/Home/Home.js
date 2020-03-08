import React from 'react';
import PropTypes from 'prop-types';

import './Home.scss';

import Presets from './Presets';
import Devices from './Devices';

const Home = ({ presets, activePreset, onPresectSelect }) => {
  return (
    <div className="body">
      <h3>Presets</h3>
      <Presets
        presets={presets}
        activePreset={activePreset}
        onPresectSelect={onPresectSelect} />
      <h3>Settings</h3>
      <Devices />
    </div>
)}

Home.propTypes = {
  presets: PropTypes.array,
  activePreset: PropTypes.number.isRequired,
  onPresectSelect: PropTypes.func.isRequired,
};

export default Home;

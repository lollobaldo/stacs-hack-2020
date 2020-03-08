import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import constants from '../../constants/_constants.scss';

import './Body.scss';

import Cards from '../Card';

const { Card, CardIcon } = Cards;
const { red, yellow, orange, green, blue } = constants;
// const { redG } = constants;

const Presets = ({ presets, activePreset, onPresectSelect }) => (
  <div className="flex presets">
    {presets.map(({ name, color, bg, icon }, i) => (
      <CardIcon
        key={name}
        icon={icon}
        color={color}
        bg={bg}
        isActive={activePreset === i}
        onClick={() => onPresectSelect(i)} />
    ))}
    {/* <CardIcon icon="heart" color={red} bg={redG} />
    <CardIcon icon="film" color={purple} />
    <CardIcon icon="moon" color={yellow} /> */}
  </div>
);

const Settings = () => (
  <div className="flex settings">
    <Link to="/lights">
      <Card
        name="Lights"
        icon="lightbulb" color={orange}
        value="ON"/>
    </Link>
    <Card name="LEDs" icon="tree" color={red} value="Green"/>
    <Card name="Fans" icon="fan" color={blue} value="OFF"/>
    <Card name="Temp" icon="thermometer-half" color={yellow} value="86%"/>
    <Card name="Humidity" icon="tint" color={blue} value="86%"/>
    <Card name="Plants" icon="seedling" color={green} value="86%"/>
  </div>
)

const Body = ({ presets, activePreset, onPresectSelect }) => {
  return (
    <div className="body">
      <h3>Ciao</h3>
      <Presets
        presets={presets}
        activePreset={activePreset}
        onPresectSelect={onPresectSelect} />
      <h3>Settings</h3>
      <Settings />
    </div>
)}

Presets.propTypes = {
  presets: PropTypes.array,
  activePreset: PropTypes.number.isRequired,
  onPresectSelect: PropTypes.func.isRequired,
};

Body.propTypes = {
  presets: PropTypes.array,
  activePreset: PropTypes.number.isRequired,
  onPresectSelect: PropTypes.func.isRequired,
};

export default Body;

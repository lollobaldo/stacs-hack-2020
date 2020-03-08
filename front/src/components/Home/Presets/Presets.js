import React from 'react';
import PropTypes from 'prop-types';

import Cards from '../../Card';

import './Presets.scss';

const { CardIcon } = Cards;

const Presets = ({ presets, activePreset, onPresectSelect }) => (
  <div className="flex presets">
    {presets.map(({ name, color, bg, icon }, i) => (
      <CardIcon key={name}
        icon={icon} color={color} bg={bg}
        isActive={activePreset === i}
        onClick={() => onPresectSelect(i)} />
    ))}
  </div>
);

Presets.propTypes = {
  presets: PropTypes.array,
  activePreset: PropTypes.number.isRequired,
  onPresectSelect: PropTypes.func.isRequired,
};

export default Presets;

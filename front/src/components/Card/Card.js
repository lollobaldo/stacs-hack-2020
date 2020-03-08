import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Card.scss';

const Card = ({ onClick, name, icon, color, value }) => (
  <div className="w3-card card" onClick={onClick}>
    <FontAwesomeIcon
      icon={icon}
      size="2x"
      color={color}
      className="card-icon" />
    <h4>{name}</h4>
    <p>{value}</p>
  </div>
);

const CardIcon = ({ isActive, onClick, icon, color, bg }) => (
  <div
    className="w3-card card cardicon"
    style={isActive ? {background: bg} : null}
    onClick={onClick}>
    <FontAwesomeIcon
      icon={icon}
      size="3x"
      color={isActive ? 'white' : color}
      className="cardicon-icon" />
  </div>
);

Card.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.any.isRequired,
  color: PropTypes.string,
  value: PropTypes.string.isRequired,
};

CardIcon.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  icon: PropTypes.any.isRequired,
  color: PropTypes.string,
  bg: PropTypes.string,
};

export default { Card, CardIcon};

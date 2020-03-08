import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components'

import './Plants.scss';

const Plants = ({ state, plantsDetails }) => (
  <div className="w3-container">
    {Object.keys(state).map((plant) => (
      <PlantsListItem
        key={plant}
        details={plantsDetails[plant]}
        state={state[plant]} />
    ))}
  </div>
);

const PlantsListItem = ({ details, state, ...props }) => {
  const {
    name, img, min, max,
  } = details;
  return (
    <div className="w3-container plant-item" {...props}>
      <img src={`../../res/plants/${img}`} alt={name} style={{ width: '90px' }} />
      <p>{name}</p>
      <MoistureLevelBar
        target={max}
        value={state} />
    </div>
  );
};

const generateLinearGradient = (target) => {
  const lower = Math.max(target - 20, 5);
  const upper = Math.min(target + 15, 95);
  const bottom = Math.min(lower - 10, 0);
  const top = Math.min(upper + 10, 100);
  return `linear-gradient(
    90deg,
    rgba(255,0,0,1) ${bottom}%,
    rgba(255,255,0,1) ${lower}%,
    rgba(0,255,0,1) ${target}%,
    rgba(255,255,0,1) ${upper}%,
    rgba(255,0,0,1) ${top}%
  )`;
};

const MoistureLevel = styled.p`
  height: 15px;
  width: 65%;
  float: right;
  position: relative;

  &:after {
    bottom: 0;
    ${'' /* left: 50%; */ }
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-color: rgba(255, 0, 255, 0);
    border-top-color: #ff00ff;
    border-width: 15px;
    margin-left: -15px;
  }

  ${({ value }) => css`
    &:after {
      left: ${value}%;
    }
  `};
`;

const MoistureLevelBar = ({ target, value }) => (
  <MoistureLevel
    // className="plants-moisture-bar"
    value={value}
    style={{
      background: generateLinearGradient(target),
    }}>
  </MoistureLevel>
);

MoistureLevelBar.propTypes = {
  target: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


PlantsListItem.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
  }),
  state: PropTypes.number.isRequired,
};

Plants.propTypes = {
  state: PropTypes.object,
  plantsDetails: PropTypes.object,
};

export default Plants;

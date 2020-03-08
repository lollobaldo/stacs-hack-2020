import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// eslint-disable-next-line import/no-unresolved
import Cards from 'components/Card';

// eslint-disable-next-line import/no-unresolved
import constants from 'constants/_constants.scss';

import './Devices.scss';

const { Card } = Cards;
const {
  yellow, orange, green, blue,
} = constants;

// const Devices = ({ history }) => (
//   <div className="flex settings">
//     <Card name="Lights"
//       icon="lightbulb" color={orange}
//       value="ON"
//       onClick={() => history.push('/lights')} />
//     <Card name="LEDs" icon="tree" color={red} value="Green"/>
//     <Card name="Fans" icon="fan" color={blue} value="OFF"/>
//     <Card name="Temp" icon="thermometer-half" color={yellow} value="86%"/>
//     <Card name="Humidity" icon="tint" color={blue} value="86%"/>
//     <Card name="Plants" icon="seedling" color={green} value="86%"/>
//   </div>
// );

class Devices extends React.Component {
  goToCarddetails = (cardId) => {
    localStorage.setItem('selectedCard', cardId);
    this.props.history.push('/card-details');
  }

  render() {
    return (
      <div className="flex settings">
        <Card name="Lights"
          icon="lightbulb" color={orange}
          value="ON"
          onClick={() => this.props.history.push('/lights')} />
        <Card name="Leds"
          icon="lightbulb" color={orange}
          value=""
          onClick={() => this.props.history.push('/leds')} />
        <Card name="Plants"
          icon="seedling" color={green}
          value=""
          onClick={() => this.props.history.push('/plants')} />
        <Card name="Fans" icon="fan" color={blue} value="OFF"/>
        <Card name="Temp" icon="thermometer-half" color={yellow} value="86%"/>
        <Card name="Humidity" icon="tint" color={blue} value="86%"/>
      </div>
    );
  }
}

Devices.propTypes = {
  history: PropTypes.any,
};

export default withRouter(Devices);

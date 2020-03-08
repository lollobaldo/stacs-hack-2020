import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
// import posed, { PoseGroup } from "react-pose";

import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faLightbulb,
  faThermometerHalf,
  faTint,
  faSeedling,
  faTree,
  faFan,
  faHome,
  faSquareFull,
  faHeart,
  faFilm,
  faMoon,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { faUserCircle, faHeart as fasHeart, faLightbulb as fasLightBulb } from '@fortawesome/free-regular-svg-icons';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// eslint-disable-next-line import/no-unresolved
import plantDetails from 'src/plantsDetails';

import { presets } from '../constants';
import './Main.scss';
import Header from './Header';
// import Footer from './Footer';
import Home from './Home';
import Lights from './Lights';
import Leds from './Leds';
import Plants from './Plants';

import {
  getKeys,
  assignWithPath,
  parseMqttMessage,
  rgbToHex,
} from '../utils';
import { startMqtt, safePublish } from '../utils/mqtt';

library.add(
  faUserCircle,
  faLightbulb,
  fasLightBulb,
  faThermometerHalf,
  faTint,
  faSeedling,
  faTree,
  faFan,
  faHome,
  faSquareFull,
  faHeart,
  fasHeart,
  faFilm,
  faMoon,
  faArrowLeft,
);

// const RoutesContainer = posed.div({
//   enter: {
//     // opacity: 1,
//     // delay: 300,
//     // staggerChildren: 100,
//     // beforeChildren: true
//   },
//   exit: { opacity: 0 }
// });

class Main extends React.Component {
  constructor(props) {
    super(props);
    const defState = {
      presets,
      activePreset: -1,
      name: 'Lorenzo',
      mqtt: false,
      mqttState: {
        lights: {
          floorlamp: false,
          leds: '#ffbb00',
        },
        plants: {
          p1: 0,
          p2: 0,
          p3: 0,
          p4: 0,
          p5: 0,
        },
      },
    };
    console.log(getKeys(defState.mqttState));
    this.state = defState;

    const callbacks = {
      onConnect: this.onMqttConnect,
      onMessage: this.onMqttMessage,
    };
    console.log('In constructor, calling startMqtT()');
    startMqtt(callbacks);
  }

  onMqttConnect = () => {
    this.setState({ mqtt: true });
    // console.log('mqtt onConnect called');
    return getKeys(this.state.mqttState);
  }

  onMqttMessage = (topic, message) => {
    // console.log(`Message on topic ${topic}: ${message.toString()}`);
    // console.log((message))
    this.setState({
      mqttState: assignWithPath(
        this.state.mqttState,
        topic,
        parseMqttMessage(message),
      ),
    });
    // console.log(this.state);
  }

  onPresectSelect = (i) => {
    const { activePreset } = this.state;
    this.setState({ activePreset: i === activePreset ? -1 : i });
  }

  onLightSwitch = () => {
    // alert('called');
    const { lights } = this.state.mqttState;
    const newState = !lights.floorlamp;
    this.setState(
      assignWithPath(
        this.state.mqttState,
        'light/floorlamp',
        newState,
      ),
    );
    safePublish('lights/floorlamp', newState);
  }

  onLedsChange = (colour) => {
    const hex = rgbToHex(colour);
    this.setState(
      assignWithPath(
        this.state.mqttState,
        'light/leds',
        hex,
      ),
    );
    safePublish('lights/leds', hex);
  }

  render() {
    const {
      activePreset,
      name,
    } = this.state;
    const { location } = this.props;
    const { lights, plants } = this.state.mqttState;
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Switch>
          {/* <PoseGroup style={{height: '100%'}}>
            <RoutesContainer key={location.pathname}> */}
              <Route path="/lights">
                <Header name={name} location={location.pathname} />
                <Lights
                  handler={this.onLightSwitch}
                  state={lights.floorlamp} />
              </Route>
              <Route path="/leds">
                <Header name={name} location={location.pathname} />
                <Leds
                  handler={this.onLedsChange}
                  state={lights.leds} />
              </Route>
              <Route path="/plants">
                <Header name={name} location={location.pathname} />
                <Plants
                  state={plants}
                  plantsDetails={plantDetails} />
              </Route>
              <Route exact>
                <Header name={name} location={location.pathname} />
                <Home
                  presets={presets}
                  activePreset={activePreset}
                  onPresectSelect={(i) => this.onPresectSelect(i)} />
              </Route>
            {/* </RoutesContainer>
          </PoseGroup> */}
        </Switch>
      </div>
    );
  }
}

Main.propTypes = {
  location: PropTypes.any,
};

export default withRouter(Main);

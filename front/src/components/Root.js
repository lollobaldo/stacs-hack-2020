import { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from "react-hot-loader";

import Main from './Main';

export default class Root extends Component {
  render() {
    return (
      hot(module)(Main)
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

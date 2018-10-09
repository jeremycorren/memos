import React, { Component } from 'react';
import { createStore } from 'redux';

import configStore from './client/config/configStore';
import Root from './client/components/Root';

const store = configStore();

export default class App extends Component {
  render() {
    return (
      <Root store={store} />
    );
  }
}
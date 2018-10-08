import React, { Component } from 'react';
import { createStore } from 'redux';

import reducer from './client/reducers/reducer';
import Root from './client/components/Root';

const store = createStore(reducer);

export default class App extends Component {
  render() {
    return (
      <Root store={store} />
    );
  }
}
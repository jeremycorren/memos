import React from 'react';
import { Text, View, Button } from 'react-native';
import { Provider } from 'react-redux';

import AddMemo from '../containers/AddMemo';
import styles from '../styles/styles';

const Root = ({ store }) => (
  <Provider store={store}>
  	<AddMemo />
	</Provider>
);

export default Root;
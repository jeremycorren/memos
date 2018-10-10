import React from 'react';
import { Text, View, Button } from 'react-native';
import { Provider } from 'react-redux';

import AddMemo from '../containers/AddMemo';
import ListMemos from '../containers/ListMemos';
import styles from '../styles/styles';

const Root = ({ store }) => (
  <Provider store={store}>
  	<View style={{ flex: 1, backgroundColor: '#F5FCFF' }}>
  		<AddMemo />
  		<ListMemos />
  	</View>
	</Provider>
);

export default Root;
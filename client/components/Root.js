import React from 'react';
import { Text, View, Button } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider, Divider } from 'react-native-paper';

import Header from '../components/Header';
import AddMemo from '../containers/AddMemo';
import ListMemos from '../containers/ListMemos';
import styles from '../styles/styles';

const Root = ({ store }) => (
  <StoreProvider store={store}>
    <PaperProvider>
      <View style={{ flex: 1, backgroundColor: '#F5FCFF' }}>
        <Header />
        <AddMemo />
        <Divider />
        <ListMemos />
      </View>
    </PaperProvider>
  </StoreProvider>
);

export default Root;
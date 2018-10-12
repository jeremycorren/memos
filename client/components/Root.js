import React from 'react';
import { Text, View, Button } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider, Divider, DefaultTheme } from 'react-native-paper';

import Header from '../components/Header';
import AddMemo from '../containers/AddMemo';
import ListMemos from '../containers/ListMemos';
import styles from '../styles/styles';

const theme = { ...DefaultTheme };

const Root = ({ store }) => (
  <StoreProvider store={store}>
    <PaperProvider theme={theme}>
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
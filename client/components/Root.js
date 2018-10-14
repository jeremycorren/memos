import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { Provider as PaperProvider } from 'react-native-paper';

import Header from '../components/Header';
import Home from '../components/Home';
import Detail from '../components/Detail';

const Navigator = createStackNavigator({
  home: { 
    screen: Home,
    navigationOptions: {
      headerTitle: 'Memos'
    }
  },
  detail: { 
    screen: Detail,
    navigationOptions: {
      headerTitle: 'Detail'
    }
  }
}, {
  navigationOptions: { 
    headerStyle: {
      backgroundColor: '#6200ee'
    },
    headerTitle: 'Memos',
    headerTitleStyle: {
      color: 'white'
    },
    headerTintColor: 'white'
  }
});

const Root = ({ store }) => (
  <StoreProvider store={store}>
    <PaperProvider>
      <Navigator />
    </PaperProvider>
  </StoreProvider>
);

export default Root;
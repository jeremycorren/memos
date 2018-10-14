import React from 'react';
import { Surface, Divider } from 'react-native-paper';

import AddMemo from '../containers/AddMemo';
import ListMemos from '../containers/ListMemos';
import styles from '../styles/styles';

const Home = ({ navigation }) => (
  <Surface style={{ flex: 1, backgroundColor: '#F5FCFF' }}>
    <AddMemo />
    <Divider />
    <ListMemos navigation={navigation} />
  </Surface>
);

export default Home;
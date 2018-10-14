import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Surface, Text, Paragraph } from 'react-native-paper';

import Memo from './Memo';
import styles from '../styles/styles';

const ListMemos = ({ memos, navigation }) => {
  return (
    <Surface style={{flex: 2}}>
      {(() => {
        if (memos.length > 0) {
          return (
            <FlatList
              data={memos}
              keyExtractor={(memo, idx) => memo.id}
              renderItem={({ item }) => <Memo memo={item} navigation={navigation} />}
            />
          );
        }
        return (
          <Paragraph style={{color: 'grey', textAlign: 'center', marginTop: 30}}>
            You have not recorded any sounds yet.
          </Paragraph>
        )
      })()}
    </Surface>
  );
};

const mapStateToProps = (state) => { 
  return {
    memos: state.memos
  };
};

ListMemos = connect(
  mapStateToProps
)(ListMemos);

export default ListMemos;
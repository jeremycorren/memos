import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Memo from './Memo';

import styles from '../styles/styles';

const ListMemos = ({ memos }) => {
	return (
		<View style={styles.card}>
			{(() => {
				if (memos.length > 0) {
					return (
						<FlatList
							data={memos}
							keyExtractor={(memo, idx) => memo.id}
							renderItem={({ item }) => <Memo memo={item} />}
						/>
					);
				}
			})()}
		</View>
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
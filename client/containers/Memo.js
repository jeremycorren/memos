import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Card, Title, Text, Paragraph, Button as Icon } from 'react-native-paper';

import Player from './Player';
import styles from '../styles/styles';

class Memo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null
    }
  }

  componentDidMount() {
    this.setState({ name: this.props.memo.name });
  }

  editMemo = () => {
    const { memo, dispatch } = this.props;
    dispatch({
      type: 'EDIT_MEMO',
      id: memo.id,
      name: this.state.name
    });
  }

  removeMemo = () => {
    const { memo, dispatch } = this.props;
    dispatch({
      type: 'REMOVE_MEMO',
      id: memo.id
    });
  }

  viewDetail = () => {
    const { memo, navigation } = this.props;
    navigation.navigate('detail', { memo });
  }

  render() {
    const { memo } = this.props;
    return (
      <Card>
        <Card.Content>
          <TextInput
            style={{fontSize: 18}}
            autoFocus={true}
            onChangeText={(name) => this.setState({ name: name })}
            onEndEditing={this.editMemo}
            value={memo.name}
          />
          <Paragraph>{memo.createTimestamp}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Player 
            componentName={'Icon'}
            recording={memo.recording}
          />
          <Icon
            icon='delete'
            onPress={this.removeMemo}
          />
          <Icon
            icon='more-horiz'
            onPress={this.viewDetail}
          />
        </Card.Actions>
      </Card>
    );
  }
}

Memo = connect()(Memo);

export default Memo;
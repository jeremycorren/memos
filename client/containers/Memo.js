import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Card, Title, Paragraph, Button as Icon } from 'react-native-paper';

import styles from '../styles/styles';

class Memo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      sound: null,
      isPlaying: false
    }
  }

  componentDidMount() {
    this.setState({ name: this.props.memo.name });
  }

  playOrPauseSound = async () => {
    this.setState({ isPlaying: !this.state.isPlaying }, () => {
      return this.state.isPlaying ? this.playSound() : this.pauseSound();
    });
  }

  playSound = async () => {
    const { recording } = this.props.memo;
    const { sound } = await recording.createNewLoadedSound({}, (status) => {
      if (status.isLoaded && status.didJustFinish) {
        this.setState({ isPlaying: false });
      }
    });

    this.setState({ sound: sound }, async () => {
      await this.state.sound.playAsync();
    });
  }

  pauseSound = async () => {
    await this.state.sound.pauseAsync();
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
          <Icon 
            icon={!this.state.isPlaying ? 'play-arrow' : 'pause'}
            mode='outlined'
            onPress={this.playOrPauseSound}
          />
          <Icon
            icon='delete'
            onPress={this.removeMemo}
          />
        </Card.Actions>
      </Card>
    );
  }
}

Memo = connect()(Memo);

export default Memo;
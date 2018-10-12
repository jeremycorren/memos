import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Card, Title, Paragraph, Button as Icon } from 'react-native-paper';

import styles from '../styles/styles';

class Memo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sound: null,
      isPlaying: false
    }
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
        console.log("woo!")
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

  render() {
    const { memo } = this.props;
    return (
      <Card>
        <Card.Content>
           <Title>{memo.createTimestamp}</Title>
        </Card.Content>
        <Card.Actions>
          <Icon 
            icon={!this.state.isPlaying ? 'play-arrow' : 'pause'}
            mode='outlined'
            onPress={this.playOrPauseSound}
          />
        </Card.Actions>
      </Card>
    );
  }
}

export default Memo;
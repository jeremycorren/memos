import React, { Component } from 'react';
import { Button as Icon, FAB } from 'react-native-paper';

import styles from '../styles/styles';

class Player extends Component {
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
    const { sound } = await this.props.recording.createNewLoadedSound({}, (status) => {
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

  render() {
    switch (this.props.componentName) {
      case 'Icon':
        return (
          <Icon 
            compact
            icon={!this.state.isPlaying ? 'play-arrow' : 'pause'}
            onPress={this.playOrPauseSound}
          />
        );
      case 'FAB':
        return (
          <FAB 
            style={styles.fab}
            icon={!this.state.isPlaying ? 'play-arrow' : 'pause'}
            onPress={this.playOrPauseSound}
          />
        );
    }
  }
}

export default Player;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Provider as PaperProvider, 
  Surface,
  Card, 
  Headline, 
  Subheading,
  Text } from 'react-native-paper';

import Player from '../containers/Player';
import styles from '../styles/styles';

class Detail extends Component {
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
    const { recording } = this.props.navigation.getParam('memo');
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

  render() {
    const memo = this.props.navigation.getParam('memo');
    return (
      <Surface>
        <Card>
          <Card.Content>
            <Headline>{memo.name}</Headline>
            <Subheading>{memo.createTimestamp}</Subheading>
          </Card.Content>
          <Card.Content>
            <Player 
              componentName={'FAB'}
              recording={memo.recording}
            />
          </Card.Content>
        </Card>
      </Surface>
    );
  }
}

Detail = connect()(Detail);

export default Detail;
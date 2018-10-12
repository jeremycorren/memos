import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Expo, { Permissions, FileSystem, Audio } from 'expo';
import { FAB } from 'react-native-paper';

import styles from '../styles/styles';

class AddMemo extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasAudioPermission: false,
      isRecording: false,
      recording: null,
      sound: null
    };
  }

  componentDidMount() {
    this.getAudioPermission();
  }

  getAudioPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({ hasAudioPermission: status === 'granted' });
  }

  startOrStopRecording = async () => {
    this.setState({ 
      isRecording: !this.state.isRecording
    }, () => this.state.isRecording ? this.startRecording() : this.stopRecording());
  }

  startRecording = async () => {
    await Audio.setAudioModeAsync(audioModeSettings(true));

    this.setState({ recording: new Audio.Recording() });
    await this.state.recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    await this.state.recording.startAsync();
  }

  stopRecording = async () => {
    await this.state.recording.stopAndUnloadAsync();
    const info = await FileSystem.getInfoAsync(this.state.recording.getURI());
    console.log(`FILE INFO: ${JSON.stringify(info)}`);

    await Audio.setAudioModeAsync(audioModeSettings(false));

    const { sound } = await this.state.recording.createNewLoadedSound();
    this.setState({ sound: sound });

    this.saveRecording();
  }

  saveRecording = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'ADD_MEMO',
      recording: this.state.recording
    });
    this.setState({ 
      sound: null,
      recording: null
    });
  };

  render() {
    if (!this.state.hasAudioPermission) {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>Memos requires audio permission.</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <FAB 
            onPress={this.startOrStopRecording}
            icon={!this.state.isRecording ? "mic" : "stop"}
          />
        </View>
      );
    }
  }
}

const audioModeSettings = (allowsRecordingIOS) => {
  return {
    allowsRecordingIOS: allowsRecordingIOS,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    playsInSilentLockedModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    playThroughEarpieceAndroid: true
  };
}

AddMemo = connect()(AddMemo);

export default AddMemo;


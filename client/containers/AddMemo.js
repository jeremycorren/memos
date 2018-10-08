import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import Expo, { Permissions, FileSystem, Audio } from 'expo';

import styles from '../styles/styles';

class AddMemo extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			name: '',
			hasAudioPermission: false,
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

	startRecording = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });

		this.setState({ recording: new Audio.Recording() });
		await this.state.recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
		await this.state.recording.startAsync();
	}

	stopRecording = async () => {
		await this.state.recording.stopAndUnloadAsync();
		const info = await FileSystem.getInfoAsync(this.state.recording.getURI());
		console.log(`FILE INFO: ${JSON.stringify(info)}`);

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });

    const { sound } = await this.state.recording.createNewLoadedSound();
    this.setState({ sound: sound });
	}

	playRecording = async () => {
		await this.state.sound.playAsync();
	}

	render() {
		const { memos, dispatch } = this.props;
		console.log(memos);

		let m = '';
		if (memos.length > 0) {
			m = memos[memos.length - 1];
			this.state.sound = m.sound;
		}
		
		if (!this.state.hasAudioPermission) {
			return (
				<View style={styles.container}>
					<Text style={styles.header}>Memos requires audio permission.</Text>
				</View>
			);
		} else {
			return (
				<View style={styles.container}>
					<Text style={styles.header}>
					 	Create a new memo.
					</Text>
					<View>
						<Text style={styles.prompt}>Name</Text>
						<TextInput style={styles.input}
							placeholder='Enter name'
							maxLength={15}
							onChangeText={(name) => this.setState({ name })}
						/>
						<Button
							title='START RECORDING'
							onPress={this.startRecording}
						/>
						<Button
							title='STOP RECORDING'
							onPress={this.stopRecording}
						/>
						<Button
							title='Save'
							onPress={() => dispatch({
								type: 'ADD_MEMO',
								name: this.state.name,
								sound: this.state.sound
							})}
						/>
					</View>
					<View>
						<Text>{m.name}</Text>
						<Button
							title='PLAY RECORDING'
							onPress={this.playRecording}
						/>
					</View>
				</View>
			);
		}
	}
}

const mapStateToProps = (state) => { 
	return {
		memos: state.memos
	};
};

AddMemo = connect(
	mapStateToProps
)(AddMemo);

export default AddMemo;

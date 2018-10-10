import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import Expo, { Permissions, FileSystem, Audio } from 'expo';

import styles from '../styles/styles';

const START_RECORD_IMG = require('../../assets/icons/start-record.png');
const STOP_RECORD_IMG = require('../../assets/icons/stop-record.png');

class AddMemo extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			name: '',
			hasAudioPermission: false,
			recording: null,
			sound: null,
			isRecording: false
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
	}

	saveRecording = () => {
		const { dispatch } = this.props;
		dispatch({
			type: 'ADD_MEMO',
			name: this.state.name,
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
					<View style={styles.container}>
						<Text style={styles.header}>
						 	My Sounds
						</Text>
						<View>
							<TouchableOpacity 
								onPress={this.startOrStopRecording}>
									{(() => {
										const imgSrc = !this.state.isRecording ? START_RECORD_IMG : STOP_RECORD_IMG;
										return (
											<Image
								        style={styles.recordingIcon}
								        source={imgSrc}
								      />
										);
									})()}
							</TouchableOpacity>
						</View>
					</View>
					<View style={{flex: 1}}>
						{(() => {
							if (this.state.sound) {
								return (
									<View>
										<TextInput style={styles.input}
											placeholder='Enter name'
											maxLength={15}
											onChangeText={(name) => this.setState({ name })}
										/>
										<View>
											<Button
												title='Add new sound'
												onPress={this.saveRecording}
												disabled={this.state.name === ''}
											/>
										</View>
									</View>
								);
							}
						})()}
					</View>
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
  };
}

AddMemo = connect()(AddMemo);

export default AddMemo;

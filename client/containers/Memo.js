import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from '../styles/styles';

const PLAY_SOUND_IMG = require('../../assets/icons/play-sound.png');
const PAUSE_SOUND_IMG = require('../../assets/icons/pause-sound.png');

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
		const { sound } = await recording.createNewLoadedSound({}, async () => {
			if (this.state.sound) {
				const { isPlaying } = await this.state.sound.getStatusAsync();
				if (!isPlaying) {
					this.setState({ isPlaying: false })
				}
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
			<View>
				<View
				  style={{
				    borderBottomColor: 'black',
				    borderBottomWidth: 1,
				    marginBottom: 10
				  }}
				/>
				<View style={{marginBottom: 10}}>
					<View>
						<Text style={styles.cardHeader}>
							{memo.name}
						</Text>
						<Text style={{marginBottom: 10}}>
							{memo.createTimestamp}
						</Text>
					</View>
					<View>
						<TouchableOpacity 
							onPress={this.playOrPauseSound}>
								{(() => {
									const imgSrc = !this.state.isPlaying ? PLAY_SOUND_IMG : PAUSE_SOUND_IMG;
									return (
										<Image
							        style={styles.soundIcon}
							        source={imgSrc}
							      />
									);
								})()}
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

export default Memo;
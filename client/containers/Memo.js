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
			isPlaying: false,
			showPlaySoundImg: true
		}
	}

	playOrPauseSound = async () => {
		this.setState({ 
			isPlaying: !this.state.isPlaying,
			showPlaySoundImg: !this.state.showPlaySoundImg 
		}, () => {
			return this.state.isPlaying ? this.playSound() : this.pauseSound();
		});
	}

	playSound = async () => {
		this.setState({ sound: this.props.memo.sound }, async () => {
			await this.state.sound.playAsync();
		});
	}

	pauseSound = async () => {
		await this.state.sound.pauseAsync();
	}

	render() {
		const { memo } = this.props;
		return (
			<View style={{flexDirection: 'row'}}>
				<View
					 style={styles.soundIcon}>
					<Text>
						{memo.name}
					</Text>
				</View>
				<View>
					<TouchableOpacity 
						onPress={this.playOrPauseSound}>
							{(() => {
								const imgSrc = this.state.showPlaySoundImg ? PLAY_SOUND_IMG : PAUSE_SOUND_IMG;
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
		);
	}
}

export default Memo;
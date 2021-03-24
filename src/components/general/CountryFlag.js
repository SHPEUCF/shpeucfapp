import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, SafeAreaView, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import Flag from 'react-native-flags';
import { Button } from './Button';
import { Input } from './Input';
import { editUser } from '@/services/user';

const { height, width } = Dimensions.get('screen');

export const CountryFlag = () => {
	const [allFlagsVisible, setAllFlags] = useState(false);
	const [customFlagVisible, setCustomFlag] = useState(false);
	const [flagText, setText] = useState('');
	const user = useSelector(({ user }) => user);

	const updateFlag = flag => {
		(!flag) ? setCustomFlag(true) : editUser({ flag });
		setAllFlags(false);
	};

	return (
		<>
			<TouchableOpacity onPress = { () => setAllFlags(!allFlagsVisible) }>
				<Flag type = 'flat' code = { user.flag } size = { 32 } />
			</TouchableOpacity>
			<RenderAllFlags visible = { allFlagsVisible } onHide = { setAllFlags } onSelect = { updateFlag } />
			<CustomFlag
				customFlagVisible = { customFlagVisible }
				flagText = { flagText }
				changeText = { setText }
				changeVisibility = { setCustomFlag }
				flagPicked = { flag => { editUser({ flag }); setAllFlags(false) } }
			/>
		</>
	);
};

const RenderAllFlags = ({ onHide, onSelect, visible }) => {
	const { flagModal, flagColumn } = styles;

	const flagHeight = { height: height - 0.3 * height };
	const countriesL = ['AR', 'BO', 'BR', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'SV', 'GQ', 'GT', 'HN'];
	const countriesR = ['MX', 'NI', 'PA', 'PY', 'PE', 'PR', 'RO', 'ES', 'TT', 'US', 'UY', 'VE', ''];

	return (
		<Modal visible = { visible } transparent>
			<SafeAreaView>
				<TouchableOpacity style = { [flagModal, flagHeight] } onPress = { () => onHide(false) }>
					{ [countriesL, countriesR].map(countries => (
						<View style = { flagColumn }>
							{ countries.map(flag =>
								<TouchableOpacity onPress = { () => onSelect(flag) }>
									<Flag type = 'flat' code = { flag } size = { 32 } />
								</TouchableOpacity>
							) }
						</View>
					)) }
				</TouchableOpacity>
			</SafeAreaView>
		</Modal>
	);
};

const CustomFlag = ({ customFlagVisible, flagText, changeVisibility, changeText, flagPicked }) => {
	const { textColor, modalText, modalButton, modalButtonContainer } = styles;

	return (
		<Modal visible = { customFlagVisible } transparent = { true }>
			<View style = { styles.modalBackground }>
				<View style = { styles.modalContent }>
					<Text style = { [modalText, textColor] }>
						Look up your two digit country ISO code and enter it!
					</Text>
					<Input
						style = { styles.modalTextInput }
						onChangeText = { (text) => changeText(text) }
						value = { flagText }
						autoCapitalize = { 'characters' }
						autoCorrect = { false }
						maxLength = { 2 }
					/>
					<View style = { modalButtonContainer }>
						<View style = { modalButton }>
							<Button title = 'Done' onPress = { () => { flagPicked(flagText); changeVisibility(false) } } />
						</View>
						<View style = { modalButton }>
							<Button title = 'Cancel' onPress = { () => changeVisibility(false) } />
						</View>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = {
	textColor: {
		color: '#e0e6ed'
	},
	modalContent: {
		height: height * 0.5,
		width: width * 0.8,
		padding: height * 0.008,
		backgroundColor: '#21252b',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	modalBackground: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 0,
		height: height,
		width: width,
		backgroundColor: '#000a'
	},
	modalButtonContainer: {
		flexDirection: 'row',
		 justifyContent: 'space-evenly',
		 width: '100%'
	},
	modalButton: {
		flex: 0.45
	},
	flagModal: {
		position: 'absolute',
	 flexDirection: 'row',
	 width: width,
	 justifyContent: 'space-between',
	 top: height * 0.15,
	 paddingLeft: '2%',
	 paddingRight: '2%'
	},
	flagColumn: {
		justifyContent: 'space-evenly'
	},
	modalText: {
		textAlign: 'center',
		fontSize: 16
	},
	modalTextInput: {
		height: 80,
		textAlign: 'center',
		width: width * 0.6,
		backgroundColor: '#e0e6ed22',
		borderColor: '#e0e6ed',
		borderRadius: 16,
		borderWidth: 3,
		borderStyle: 'solid',
		fontWeight: 'bold',
		fontSize: 60,
		color: '#E0E6ED'
	}
};
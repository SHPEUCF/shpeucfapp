import { Dimensions } from "react-native";
import React from "react";
import { Modal, SafeAreaView, TouchableOpacity, View, Text, TextInput } from "react-native";
import Flag from "react-native-flags";
import { Button } from "../components/general/";

const dimension = Dimensions.get("window");

export const RenderFlags = (props) => {
	const {
		flagModal,
		flagColumn
	} = styles;
	const {
		changeVisibility,
		flagPicked,
		flagsVisible
	} = props;

	const flagHeight = { height: dimension.height - 0.3 * dimension.height };
	const countriesL = ["AR", "BO", "BR", "CL", "CO", "CR", "CU", "DO", "EC", "SV", "GQ", "GT", "HN"];
	const countriesR = ["MX", "NI", "PA", "PY", "PE", "PR", "RO", "ES", "TT", "US", "UY", "VE", ""];

	return (
		<Modal visible = { flagsVisible } transparent = { true }>
			<SafeAreaView >
				<TouchableOpacity
					style = { [flagModal, flagHeight] }
					onPress = { () => changeVisibility(false) }
				>
					<View style = { flagColumn }>
						{ countriesL.map(item =>
							<TouchableOpacity onPress = { () => flagPicked(item) }>
								<Flag
									type = "flat"
									code = { item }
									size = { 32 }
								/>
							</TouchableOpacity>
						) }
					</View>
					<View style = { flagColumn }>
						{ countriesR.map(item =>
							<TouchableOpacity onPress = { () => flagPicked(item) }>
								<Flag
									type = "flat"
									code = { item }
									size = { 32 }
								/>
							</TouchableOpacity>
						) }
					</View>
				</TouchableOpacity>
			</SafeAreaView>
		</Modal>
	);
};

export const CustomFlag = (props) => {
	const {
		textColor,
		modalText,
		modalButton,
		modalButtonContainer
	} = styles;
	const {
		customFlagVisible,
		customFlagText,
		changeVisibility,
		changeText,
		flagPicked
	} = props;

	return (
		<Modal visible = { customFlagVisible } transparent = { true }>
			<View style = { styles.modalBackground }>
				<View style = { styles.modalContent }>
					<Text style = { [modalText, textColor] }>
                        Look up your two digit country ISO code and enter it!
					</Text>
					<TextInput
						style = { styles.modalTextInput }
						onChangeText = { (text) => changeText(text) }
						value = { customFlagText }
						autoCapitalize = { "characters" }
						autoCorrect = { false }
						maxLength = { 2 }
					/>
					<View style = { modalButtonContainer }>
						<View style = { modalButton }>
							<Button
								title = "Done"
								onPress = { () => {
									flagPicked(customFlagText);
									changeVisibility(false);
								} }
							/>
						</View>
						<View style = { modalButton }>
							<Button
								title = "Cancel"
								onPress = { () => changeVisibility(false) }
							/>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = {
	textColor: {
		color: "#e0e6ed"
	},
	modalContent: {
		height: dimension.height * 0.5,
		width: dimension.width * 0.8,
		padding: dimension.height * 0.008,
		backgroundColor: "#21252b",
		alignItems: "center",
		justifyContent: "space-around"
	},
	modalBackground: {
		justifyContent: "center",
		alignItems: "center",
		margin: 0,
		height: dimension.height,
		width: dimension.width,
		backgroundColor: "#000a"
	},
	modalButtonContainer: {
		flexDirection: "row",
		 justifyContent: "space-evenly",
		 width: "100%"
	},
	modalButton: {
		flex: 0.45
	},
	flagModal: { position: "absolute",
	 flexDirection: "row",
	 width: dimension.width,
	 justifyContent: "space-between",
	 top: dimension.height * 0.15,
	 paddingLeft: "2%",
	 paddingRight: "2%"
	},
	flagColumn: {
		justifyContent: "space-evenly"
	},
	modalText: {
		textAlign: "center",
		fontSize: 16
	},
	modalTextInput: {
		height: 80,
		textAlign: "center",
		width: dimension.width * 0.6,
		backgroundColor: "#e0e6ed22",
		borderColor: "#e0e6ed",
		borderRadius: 16,
		borderWidth: 3,
		borderStyle: "solid",
		fontWeight: "bold",
		fontSize: 60,
		color: "#E0E6ED"
	}
};
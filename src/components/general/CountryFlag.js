import { Dimensions } from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, SafeAreaView, TouchableOpacity, View, Text, TextInput } from "react-native";
import Flag from "react-native-flags";
import { Button } from "./";
import { editUser } from "../../ducks";

const { height, width } = Dimensions.get("window");

class CountryFlag extends Component {
	constructor(props) {
		super(props);
		this.state = {
			flagsVisible: false,
			customFlagVisible: false,
			customFlagText: ""
		};
	}

	render() {
		const { customFlagVisible, customFlagText, flagsVisible } = this.state;

		return (
			<View>
				<TouchableOpacity onPress = { () => this.setState({ flagsVisible: !this.state.flagsVisible }) } >
					<Flag type = "flat" code = { this.props.activeUser.flag } size = { 32 } />
				</TouchableOpacity>
				<RenderFlags
					flagsVisible = { flagsVisible }
					changeVisibility = { (val) => this.setState({ flagsVisible: val }) }
					flagPicked = { flag => {
						if (!flag) this.setState({ flagsVisible: false, customFlagVisible: true });
						else editUser({ flag });
						this.setState({ flagsVisible: false });
					} }
				/>
				<CustomFlag
					customFlagVisible = { customFlagVisible }
					customFlagText = { customFlagText }
					changeText = { (text) => this.setState({ customFlagText: text }) }
					changeVisibility = { (val) => this.setState({ customFlagVisible: val }) }
					flagPicked = { flag => {
						 editUser({ flag });
						this.setState({ flagsVisible: false });
					} }
				/>
			</View>
		);
	}
}

const RenderFlags = (props) => {
	const { flagModal, flagColumn } = styles;
	const { changeVisibility, flagPicked, flagsVisible } = props;

	const flagHeight = { height: height - 0.3 * height };
	const countriesL = ["AR", "BO", "BR", "CL", "CO", "CR", "CU", "DO", "EC", "SV", "GQ", "GT", "HN"];
	const countriesR = ["MX", "NI", "PA", "PY", "PE", "PR", "RO", "ES", "TT", "US", "UY", "VE", ""];

	return (
		<Modal visible = { flagsVisible } transparent>
			<SafeAreaView >
				<TouchableOpacity style = { [flagModal, flagHeight] } onPress = { () => changeVisibility(false) }>
					{ [countriesL, countriesR].map(countries => (
						<View style = { flagColumn }>
							{ countries.map(item =>
								<TouchableOpacity onPress = { () => flagPicked(item) }>
									<Flag type = "flat" code = { item } size = { 32 } />
								</TouchableOpacity>
							) }
						</View>
					)) }
				</TouchableOpacity>
			</SafeAreaView>
		</Modal>
	);
};

const CustomFlag = (props) => {
	const { textColor, modalText, modalButton, modalButtonContainer } = styles;
	const { customFlagVisible, customFlagText, changeVisibility, changeText, flagPicked } = props;

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
								onPress = { () => { flagPicked(customFlagText); changeVisibility(false)	} }
							/>
						</View>
						<View style = { modalButton }>
							<Button title = "Cancel" onPress = { () => changeVisibility(false) } />
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
		height: height * 0.5,
		width: width * 0.8,
		padding: height * 0.008,
		backgroundColor: "#21252b",
		alignItems: "center",
		justifyContent: "space-around"
	},
	modalBackground: {
		justifyContent: "center",
		alignItems: "center",
		margin: 0,
		height: height,
		width: width,
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
	 width: width,
	 justifyContent: "space-between",
	 top: height * 0.15,
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
		width: width * 0.6,
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

const mapStateToProps = ({ user: { activeUser } }) => ({ activeUser });
const mapDispatchToProps = { editUser };

export default connect(mapStateToProps, mapDispatchToProps)(CountryFlag);
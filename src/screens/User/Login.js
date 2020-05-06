import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, SafeAreaView, Dimensions } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Input } from "../../components/general";
import { registrationFormData } from "../../data/FormData";
import {
	createUser,
	loginUser,
	registrationError
} from "../../ducks";
import { Form } from "../../components";

const dimension = Dimensions.get("window");

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			registrationFormVisibility: false
		};
	}

	onButtonPress() {
		const {
			email,
			password
		} = this.state;

		if (!email || email === "")
			this.props.registrationError("Please enter your knights email");
		else if (!password || password === "")
			this.props.registrationError("Please enter your password");
		else
			this.props.loginUser(email, password);
	}

	renderError() {
		if (this.props.error)
			return (
				<Text style = { styles.errorTextStyle }>
					{ this.props.error }
				</Text>
			);
	}

	renderResetPassword() {
		const {
			resetPasswordText,
			bottomContainer
		} = styles;

		return (
			<TouchableOpacity
				style = { [bottomContainer, { flex: 0.4, alignItems: "flex-start" }] }
				onPress = { () => Actions.resetPassword() }
			>
				<Text style = { resetPasswordText }>Forgot Password?</Text>
			</TouchableOpacity>
		);
	}
	renderSignUpButton() {
		const {
			signUpText,
			bottomContainer
		} = styles;

		return (
			<View style = { bottomContainer }>
				<Text style = {{ color: "#bbb", fontWeight: "bold" }}>Don't have an account? </Text>
				<TouchableOpacity
					onPress = { () => this.setState({ registrationFormVisibility: true }) }>
					<Text style = { signUpText }> Register</Text>
				</TouchableOpacity>
			</View>
		);
	}

	renderButtons() {
		return (
			<View style = { styles.buttonContainer }>
				<View style = {{ flexDirection: "row", flex: 1, alignItems: "center" }}>
					<View style = {{ flex: 0.3 }}></View>
					<View style = {{ flex: 1 }}>
						<View style = {{ flex: 0.5, justifyContent: "center" }}>
							<Button
								title = "Log in"
								onPress = { this.onButtonPress.bind(this) }
							/>
						</View>
						{ this.renderResetPassword() }
					</View>
					<View style = {{ flex: 0.3 }}></View>
				</View>
				{ this.renderSignUpButton() }
			</View>
		);
	}

	renderContent() {
		const {
			formContainerStyle,
			headerContainer,
			headerTitle,
			headerTextStyle,
			headerSubtitleStyle
		} = styles;

		return (
			<KeyboardAwareScrollView
				style = {{ backgroundColor: "#0c0b0b" }}
				resetScrollToCoords = {{ x: 0, y: 0 }}
				contentContainerStyle = {{ flexGrow: 1 }}
				scrollEnabled = { true }
				enableOnAndroid = { true }
			>
				<SafeAreaView style = { formContainerStyle }>
					<Form
						elements = { registrationFormData }
						title = "Registration"
						visible = { this.state.registrationFormVisibility }
						changeVisibility = { (visible) => this.setState({ registrationFormVisibility: visible }) }
						onSubmit = { (value) => {
							const user = Object.assign({}, value);
							delete user.password;
							this.props.createUser(user, value.email, value.password);
						 } }
					/>
					<View style = {{ flex: 1, backgroundColor: "#FECB00" }}>
						<View style = {{ flex: 0.1 }}></View>
						<View style = {{ alignItems: "center", flex: 1, justifyContent: "center" }}>
							<Image
								source = { require("../../assets/images/SHPE_UCF_Logo.png") }
								style = {{ alignSelf: "center" }}
								height = { dimension.height * 0.5 }
								resizeMode = "contain"
							/>
						</View>
						<View style = { headerContainer }>
							<View style = { headerTitle }>
								<Text style = { headerTextStyle }>S H P E  </Text>
								<Text style = { [headerTextStyle, { color: "white" }] }>U C F</Text>
							</View>
							<Text style = { headerSubtitleStyle }>Society of Hispanic Professional Engineers</Text>
						</View>
					</View>
					<View style = {{ flex: 0.18 }}></View>
					<View style = {{ flex: 0.5, paddingLeft: "5%", paddingRight: "5%", justifyContent: "space-evenly" }}>
						<Input
							placeholder = "Knights Email"
							value = { this.state.email }
							autoCapitalize = "none"
							keyboardType = "email-address"
							onChangeText = { (email) => this.setState({ email }) }
						/>
						<Input
							secureTextEntry = { true }
							placeholder = "Password"
							autoCapitalize = "none"
							value = { this.state.password }
							onChangeText = { (password) => this.setState({ password }) }
						/>
					</View>
					{ this.renderError() }
					{ this.renderButtons() }
				</SafeAreaView>
			</KeyboardAwareScrollView>
		);
	}

	render() {
		return this.renderContent();
	}
}

const styles = {
	formContainerStyle: {
		backgroundColor: "#0c0b0b",
		height: dimension.height
	},
	headerContainer: {
		flex: 0.6,
		alignItems: "center",
		justifyContent: "space-evenly",
		paddingBottom: "5%"
	},
	headerTextStyle: {
		color: "black",
		fontSize: 40,
		alignSelf: "center"
	},
	headerTitle: {
		flexDirection: "row",
		justifyContent: "space-evenly"
	},
	headerSubtitleStyle: {
		color: "gray",
		fontWeight: "bold"
	},
	errorTextStyle: {
		fontSize: 14,
		alignSelf: "center",
		color: "red",
		fontWeight: "bold"
	},
	formButton: {
		flex: 1
	},
	buttonContainer: {
		flex: 0.7
	},
	resetPasswordText: {
		fontWeight: "bold",
		color: "white"
	},
	signUpText: {
		flex: 1,
		fontWeight: "bold",
		color: "white"
	},
	bottomContainer: {
		flex: 0.6,
		flexDirection: "row",
		justifyContent: "center"
	}
};

const mapStateToProps = ({ user }) => {
	const {
		email,
		password,
		error,
		loading,
		loggedIn
	} = user;

	return { email, password, error, loading, loggedIn };
};

const mapDispatchToProps = {
	createUser,
	loginUser,
	registrationError
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
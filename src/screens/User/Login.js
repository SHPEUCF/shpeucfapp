import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, SafeAreaView, Dimensions } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "../../components";
import { registrationFormData, loginFormData } from "../../data/FormData";
import { createUser, loginUser, registrationError } from "../../ducks";
import { Form } from "../../components/";

const { height } = Dimensions.get("window");

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = { email: "", password: "", registrationFormVisibility: false, error: "" };
	}

	loginSubmit() {
		const { email, password } = this.state;

		if (!email)
			this.props.registrationError("Please enter your knights email");
		else if (!password)
			this.props.registrationError("Please enter your password");
		else
			this.props.loginUser(email, password).then(() => Actions.main());
	}

	renderError() {
		if (this.props.error) {
			return (
				<Text style = { styles.errorTextStyle }>
					{ this.props.error }
				</Text>
			);
		}
	}

	renderButtons() {
		const { resetPasswordText, bottomContainer, signUpText, buttonContainer } = styles;

		return (
			<View style = { buttonContainer }>
				<View style = {{ flex: 0.5, justifyContent: "center", paddingHorizontal: "20%" }}>
					<Button title = "Log in" onPress = { () => this.loginSubmit() } />
				</View>
				<TouchableOpacity
					style = { [bottomContainer, { flex: 0.4 }] }
					onPress = { () => Actions.resetPassword() }
				>
					<Text style = { resetPasswordText }>Forgot Password?</Text>
				</TouchableOpacity>
				<View style = { bottomContainer }>
					<Text style = {{ color: "#BBB", fontWeight: "bold" }}>Don't have an account? </Text>
					<TouchableOpacity onPress = { () => this.setState({ registrationFormVisibility: true }) }>
						<Text style = { signUpText }>Register</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	render() {
		const { formContainer, headerContainer, headerTitle, headerText, headerSubtitleStyle } = styles;

		return (
			<KeyboardAwareScrollView
				style = {{ backgroundColor: "#0C0B0B" }}
				resetScrollToCoords = {{ x: 0, y: 0 }}
				contentContainerStyle = {{ flexGrow: 1 }}
				scrollEnabled = { true }
				enableOnAndroid = { true }
			>
				<SafeAreaView style = { formContainer }>
					<Form
						elements = { registrationFormData }
						title = "Registration"
						visible = { this.state.registrationFormVisibility }
						changeVisibility = { visible => this.setState({ registrationFormVisibility: visible }) }
						onSubmit = { user => this.props.createUser({ ...user }) }
					/>
					<View style = {{ flex: 1, backgroundColor: "#FECB00", alignItems: "center" }}>
						<Image
							source = { require("../../assets/images/SHPE_UCF_Logo.png") }
							style = {{ flex: 1 }}
							height = { height * 0.5 }
							resizeMode = "contain"
						/>
						<View style = { headerContainer }>
							<View style = { headerTitle }>
								<Text style = { headerText }>S H P E  </Text>
								<Text style = { [headerText, { color: "white" }] }>U C F</Text>
							</View>
							<Text style = { headerSubtitleStyle }>Society of Hispanic Professional Engineers</Text>
						</View>
					</View>
					<View style = {{ flex: 0.5, paddingHorizontal: "5%", justifyContent: "space-evenly" }}>
						<Form
							elements = { loginFormData }
							title = "Login"
							onlyRenderElements
							onChange = { state => this.setState(state) }
						/>
					</View>
					{ this.renderError() }
					{ this.renderButtons() }
				</SafeAreaView>
			</KeyboardAwareScrollView>
		);
	}
}

const styles = {
	formContainer: {
		backgroundColor: "#0c0b0b",
		height: height
	},
	headerContainer: {
		flex: 0.6,
		alignItems: "center",
		justifyContent: "space-evenly",
		paddingBottom: "5%"
	},
	headerText: {
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

const mapStateToProps = ({ user: { email, password, error, loading, loggedIn } }) => (
	{ email, password, error, loading, loggedIn }
);
const mapDispatchToProps = { createUser, loginUser, registrationError };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
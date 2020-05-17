import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Button, Spinner, Input } from "../../components";
import { resetPassword } from "../../ducks";

const dimension = Dimensions.get("window");

class ResetPassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: ""
		};
	}

	renderError() {
		if (this.props.error)
			return (
				<Text style = { styles.errorTextStyle }>
					{ this.props.error }
				</Text>
			);
	}

	ResetPasswordButton() {
		return (
			<Button
				title = "RESET"
				onPress = { ()=> this.props.resetPassword(this.state.email) }
			/>
		);
	}

	LogInButton() {
		const {
			resetPasswordContainer,
			loginButton,
			insteadButton
		} = styles;
		return (
			<View style = { resetPasswordContainer }>
				<TouchableOpacity
					onPress = { Actions.login() }>
					<Text style = { loginButton }>Log In </Text>
				</TouchableOpacity>
				<Text style = { insteadButton }> instead?</Text>
			</View>
		);
	}

	renderButtons() {
		if (this.props.loading)
			return (
				<View style = {{ marginTop: 40, marginBottom: 20 }}>
					<Spinner size = "large" />
				</View>
			);

		return (
			<View>
				{ this.ResetPasswordButton() }
				{ this.LogInButton() }
			</View>
		);
	}

	renderContent() {
		const {
			container,
			formContainerStyle,
			headerStyle,
			headerTextStyle,
			headerSubtitleStyle
		} = styles;
		if (this.props.loggedIn)
			return <Spinner />;
		else
			return (
				<View style = { container }>
					<View style = { formContainerStyle }>
						<View style = { headerStyle }>
							<Text style = { headerTextStyle }>Reset Password</Text>
							<Text style = { headerSubtitleStyle }>Enter your email below</Text>
						</View>
						<View style = {{ height: dimension.height * 0.12 }}>
							<Input
								placeholder = "Email"
								value = { this.state.email }
								autoCapitalize = "none"
								maxLength = { 45 }
								onChangeText = { (email) => this.setState({ email }) }
							/>
							<View style = {{ height: dimension.height * 0.02 }}></View>
						</View>
						{ this.renderError() }
						{ this.renderButtons() }
					</View>
				</View>
			);
	}

	render() {
		return this.renderContent();
	}
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: "#0c0b0b",
		justifyContent: "center"
	},
	formContainerStyle: {
		marginLeft: 20,
		marginRight: 20
	},
	headerStyle: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: 5,
		marginBottom: 30
	},
	headerTextStyle: {
		color: "white",
		fontSize: 22
	},
	headerSubtitleStyle: {
		color: "gray",
		marginTop: 10,
		marginBottom: 10
	},
	errorTextStyle: {
		fontSize: 14,
		alignSelf: "center",
		color: "red",
		fontWeight: "bold",
		padding: 10
	},
	formButton: {
		marginTop: 10,
		marginBottom: 10
	},
	resetPasswordContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 10,
		marginBottom: 10
	},
	loginButton: {
		color: "white",
		flexDirection: "row",
		justifyContent: "center"
	},
	insteadButton: {
		color: "gray",
		marginBottom: 20
	}
};

const mapStateToProps = ({ user }) => {
	const { error } = user;

	return { error };
};

const mapDispatchToProps = {
	resetPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
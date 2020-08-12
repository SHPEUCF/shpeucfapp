import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Button, Input } from "../../components";
import { resetPassword } from "../../ducks";

const dimension = Dimensions.get("window");

class ResetPassword extends Component {
	constructor(props) {
		super(props);

		this.state = { email: "" };
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
		const { resetPasswordContainer, loginButton, insteadButton } = styles;

		return (
			<View>
				<Button title = "RESET" onPress = { () => this.props.resetPassword(this.state.email) } />
				<View style = { resetPasswordContainer }>
					<TouchableOpacity onPress = { () => Actions.login() }>
						<Text style = { loginButton }>Log In</Text>
					</TouchableOpacity>
					<Text style = { insteadButton }> instead?</Text>
				</View>
			</View>
		);
	}

	render() {
		const { container, formContainer, header, headerText, headerSubtitle } = styles;

		return (
			<View style = { container }>
				<View style = { formContainer }>
					<View style = { header }>
						<Text style = { headerText }>Reset Password</Text>
						<Text style = { headerSubtitle }>Enter your email below</Text>
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
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: "#0c0b0b",
		justifyContent: "center"
	},
	formContainer: {
		marginLeft: 20,
		marginRight: 20
	},
	header: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: 5,
		marginBottom: 30
	},
	headerText: {
		color: "white",
		fontSize: 22
	},
	headerSubtitle: {
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

const mapStateToProps = ({ user: { error } }) => ({ error });
const mapDispatchToProps = { resetPassword };

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
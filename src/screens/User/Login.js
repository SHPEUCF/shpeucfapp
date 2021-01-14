import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { View, Text, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from '@/components';
import { registrationFormData, loginFormData } from '@/data/FormData';
import { createUser, loginUser } from '@/ducks';
import { Form } from '@/components/';

const { height, width } = Dimensions.get('screen');

export default () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [registrationFormVisibility, setVisibility] = useState(false);
	const [error, setError] = useState("");
	const dispatch = useDispatch();

	const {
		formContainer,
		topContainer,
		headerContainer,
		headerTitle,
		headerText,
		headerSubtitleStyle,
		bottomContainer,
		buttonContainer,
		signUpText,
		loginForm,
		loginButton,
		resetPasswordText,
		errorTextStyle
	} = styles;

	const loginSubmit = () => {
		if (!email)
			setError("Please enter your knights email")
		else if (!password)
			setError("Please enter your password");
		else
			dispatch(loginUser(email, password)).then(() => Actions.main());
	}

	const renderError = () => {
		if (error)
			return <Text style = { errorTextStyle }>{ error }</Text>
	}

	const renderButtons = () => (
		<View style = { buttonContainer }>
			<View style = { loginButton }>
				<Button title = "Log in" onPress = { loginSubmit } />
			</View>
			<TouchableOpacity  onPress = { Actions.resetPassword }>
				<Text style = { resetPasswordText }> Forgot Password? </Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<KeyboardAwareScrollView
			style = {{ backgroundColor: "#0C0B0B" }}
			resetScrollToCoords = {{ x: 0, y: 0 }}
			contentContainerStyle = {{ flexGrow: 1 }}
			scrollEnabled
			enableOnAndroid
		>
			<SafeAreaView style = { formContainer }>
				<Form
					elements = { registrationFormData }
					title = "Registration"
					visible = { registrationFormVisibility }
					changeVisibility = { visible => setVisibility(visible) }
					onSubmit = { user => dispatch(createUser({ ...user })) }
				/>
				<View style = { topContainer }>
					<Image
						source = { require("../../assets/images/SHPE_UCF_Logo.png") }
						style = {{ flex: 10 }}
						resizeMode = "contain"
					/>
					<View style = { headerContainer }>
						<View style = { headerTitle }>
							<Text style = { headerText }> S H P E  </Text>
							<Text style = { [headerText, { color: "white" }] }> U C F </Text>
						</View>
						<Text style = { headerSubtitleStyle }> Society of Hispanic Professional Engineers </Text>
					</View>
				</View>
				<View style = { loginForm }>
					<Form
						title = "Login"
						elements = { loginFormData }
						onChange = { state => { setEmail(state.email); setPassword(state.password) } }
						onlyRenderElements
					/>
					{ renderButtons() }
				</View>
				<View style = { bottomContainer }>
					<Text style = { signUpText }> Don't have an account? </Text>
					<Button title = "Register" onPress = { () => setVisibility(true) } />
				</View>
				{ renderError() }
			</SafeAreaView>
		</KeyboardAwareScrollView>
	);
};

const styles = {
	formContainer: {
		backgroundColor: '#0c0b0b',
		height: height
	},
	topContainer: {
		flex: 0.5, 
		backgroundColor: "#FFC107",
		alignItems: "center"
	},
	headerContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-evenly",
		paddingBottom: "10%"
	},
	headerText: {
		color: 'black',
		fontSize: 40,
		alignSelf: "center",
	},
	headerTitle: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		paddingBottom: 10
	},
	headerSubtitleStyle: {
		color: "white",
		fontSize: 18,
		paddingVertical: 15
	},
	errorTextStyle: {
		fontSize: 14,
		alignSelf: 'center',
		color: 'red',
		fontWeight: 'bold'
	},
	loginForm: {
		flex: 0.5, 
		paddingHorizontal: "5%", 
		backgroundColor: "#21252B", 
		borderRadius: 10, 
		marginTop: height * 0.05, 
		marginHorizontal: width * 0.05
	},
	buttonContainer: {
		flex: 0.5,
		paddingTop: 15,
	},
	loginButton: {
		justifyContent: "center", 
		paddingHorizontal: "15%", 
		paddingVertical: 10
	},
	resetPasswordText: {
		color: "white",
		alignSelf: "center",
	},
	signUpText: {
		color: "white",
		fontSize: 15,
		textAlign: "center", 
		marginBottom: 5,
	},
	bottomContainer: {
		flex: 0.3,
		justifyContent: "center",
		marginHorizontal: width * 0.2,
		marginBottom: 75
	}
};
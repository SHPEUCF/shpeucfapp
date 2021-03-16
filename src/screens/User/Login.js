import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Alert, Form } from '@/components';
import { registrationFormData, loginFormData } from '@/data/FormData';
import { createUser } from '@/services/user';
import { loginUser } from '@/services/app';

const { height } = Dimensions.get('screen');

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = { email: '', password: '', registrationFormVisibility: false, error: '' };
	}

	loginSubmit() {
		const { email, password } = this.state;

		if (!email) { this.setState({ error: 'Please enter your knights email' }) }
		else if (!password) { this.setState({ error: 'Please enter your password' }) }
		else {
			loginUser(email, password).catch(error => this.setState({ error }));
			// else Alert.alert('Please update your app');
		}
	}

	renderError() {
		if (this.state.error) {
			return (
				<Text style = { styles.errorTextStyle }>
					{ this.state.error }
				</Text>
			);
		}
	}

	renderButtons() {
		const { resetPasswordText, bottomContainer, signUpText, buttonContainer } = styles;

		return (
			<View style = { buttonContainer }>
				<View style = {{ flex: 0.5, justifyContent: 'center', paddingHorizontal: '20%' }}>
					<Button title = 'Log In' onPress = { () => this.loginSubmit() } />
				</View>
				<TouchableOpacity
					style = { [bottomContainer, { flex: 0.4 }] }
					onPress = { () => this.props.navigation.push('ResetPassword') }
				>
					<Text style = { resetPasswordText }>Forgot Password?</Text>
				</TouchableOpacity>
				<View style = { bottomContainer }>
					<Text style = {{ color: '#BBB', fontWeight: 'bold' }}>Don't have an account? </Text>
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
				style = {{ backgroundColor: '#0C0B0B' }}
				resetScrollToCoords = {{ x: 0, y: 0 }}
				contentContainerStyle = {{ flexGrow: 1 }}
				scrollEnabled = { true }
				enableOnAndroid = { true }
			>
				<SafeAreaView style = { formContainer }>
					<Form
						elements = { registrationFormData }
						title = 'Registration'
						visible = { this.state.registrationFormVisibility }
						changeVisibility = { visible => this.setState({ registrationFormVisibility: visible }) }
						onSubmit = { user => createUser(user).catch(error => Alert.alert(error, { type: 'error' })) }
					/>
					<View style = {{ flex: 1, backgroundColor: '#FECB00', alignItems: 'center' }}>
						<Image
							source = { require('../../assets/images/SHPE_UCF_Logo.png') }
							style = {{ flex: 1 }}
							height = { height * 0.5 }
							resizeMode = 'contain'
						/>
						<View style = { headerContainer }>
							<View style = { headerTitle }>
								<Text style = { headerText }>S H P E  </Text>
								<Text style = { [headerText, { color: 'white' }] }>U C F</Text>
							</View>
							<Text style = { headerSubtitleStyle }>Society of Hispanic Professional Engineers</Text>
						</View>
					</View>
					<View style = {{ flex: 0.5, paddingHorizontal: '5%', justifyContent: 'space-evenly' }}>
						<Form
							elements = { loginFormData }
							title = 'Login'
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
		backgroundColor: '#0c0b0b',
		height: height
	},
	headerContainer: {
		flex: 0.6,
		alignItems: 'center',
		justifyContent: 'space-evenly',
		paddingBottom: '5%'
	},
	headerText: {
		color: 'black',
		fontSize: 40,
		alignSelf: 'center'
	},
	headerTitle: {
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	headerSubtitleStyle: {
		color: 'gray',
		fontWeight: 'bold'
	},
	errorTextStyle: {
		fontSize: 14,
		alignSelf: 'center',
		color: 'red',
		fontWeight: 'bold'
	},
	buttonContainer: {
		flex: 0.7
	},
	resetPasswordText: {
		fontWeight: 'bold',
		color: 'white'
	},
	signUpText: {
		flex: 1,
		fontWeight: 'bold',
		color: 'white'
	},
	bottomContainer: {
		flex: 0.6,
		flexDirection: 'row',
		justifyContent: 'center'
	}
};

const mapStateToProps = ({ app: { hasCorrectVersion }, user: { email, password, error, loading, loggedIn } }) => (
	{ email, password, error, loading, loggedIn, hasCorrectVersion }
);

export default connect(mapStateToProps)(Login);
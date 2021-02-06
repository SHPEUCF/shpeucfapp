import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Input } from '@/components';
import { resetPassword } from '@/services/user';

export const ResetPassword = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');

	const renderButtons = () => {
		const { resetPasswordContainer, loginButton, insteadButton } = styles;

		return (
			<>
				<Button title = 'RESET' onPress = { () => resetPassword(email, setError).then(error => !error && navigation.pop()) } />
				<View style = { resetPasswordContainer }>
					<TouchableOpacity onPress = { () => navigation.pop() }>
						<Text style = { loginButton }>Log In</Text>
					</TouchableOpacity>
					<Text style = { insteadButton }> instead?</Text>
				</View>
			</>
		);
	};

	const { container, formContainer, header, headerText, headerSubtitle, errorTextStyle } = styles;

	return (
		<View style = { container }>
			<View style = { formContainer }>
				<View style = { header }>
					<Text style = { headerText }>Reset Password</Text>
					<Text style = { headerSubtitle }>Enter your email below</Text>
				</View>
				<Input
					placeholder = 'Email'
					value = { email }
					autoCapitalize = 'none'
					maxLength = { 45 }
					onChangeText = { setEmail }
				/>
				{ !!error && <Text style = { errorTextStyle }>{ error }</Text> }
				{ renderButtons() }
			</View>
		</View>
	);
};

const styles = {
	container: {
		flex: 1,
		backgroundColor: '#0c0b0b',
		justifyContent: 'center'
	},
	formContainer: {
		marginLeft: 20,
		marginRight: 20
	},
	header: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 5,
		marginBottom: 30
	},
	headerText: {
		color: 'white',
		fontSize: 22
	},
	headerSubtitle: {
		color: 'gray',
		marginTop: 10,
		marginBottom: 10
	},
	errorTextStyle: {
		fontSize: 14,
		alignSelf: 'center',
		color: 'red',
		fontWeight: 'bold',
		padding: 10
	},
	resetPasswordContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
		marginBottom: 10
	},
	loginButton: {
		color: 'white',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	insteadButton: {
		color: 'gray',
		marginBottom: 20
	}
};
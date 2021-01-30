import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Input, Button, ButtonLayout } from '@/components';
import * as ElectionService from '@/services/elections';

export const PositionForm = ({ navigation, route: { params: { action, position } } }) => {
	const { positions } = useSelector(({ elect }) => elect);
	const [title, setTitle] = useState(position ? position.title : '');
	const [description, setDescription] = useState(position ? position.description : '');
	const [error, setError] = useState('');

	const onButtonPress = () => {
		setError((title) ? '' : 'Title missing');

		if (title && action === 'ADD')
			ElectionService.addPosition(title, description, Object.keys(positions || {}).length);
		else if (title && action === 'EDIT')
			ElectionService.editPosition(title, description, (position.title === title) ? null : position.title);

		if (title && action)
			navigation.pop();
	};

	const { formContainerStyle, headerStyle, headerTextStyle, errorTextStyle, scrollView } = styles;

	return (
		<SafeAreaView style = { formContainerStyle }>
			<View style = { headerStyle }>
				<Text style = { headerTextStyle }>{ `${action} POSITION` }</Text>
			</View>
			<ScrollView style = { scrollView }>
				<Input placeholder = 'Position Title' value = { title } onChangeText = { text => setTitle(text) } />
				<Input placeholder = 'Position Description' value = { description } onChangeText = { text => setDescription(text) } />
				{ !!error && <Text style = { errorTextStyle }>{ error }</Text> }
			</ScrollView>
			<ButtonLayout>
				<Button title = 'Submit' onPress = { onButtonPress } />
				<Button title = 'Cancel' onPress = { () => navigation.pop() } />
			</ButtonLayout>
		</SafeAreaView>
	);
};

const styles = {
	formContainerStyle: {
		flex: 1,
		backgroundColor: '#0c0b0b'
	},
	headerStyle: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 40,
		marginBottom: 10
	},
	headerTextStyle: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#e0e6ed'
	},
	errorTextStyle: {
		fontSize: 14,
		alignSelf: 'center',
		color: 'red',
		fontWeight: 'bold',
		padding: 10
	},
	scrollView: {
		backgroundColor: 'black',
		height: '50%',
		paddingTop: 0,
		paddingBottom: 0,
		paddingLeft: '5%',
		paddingRight: '5%'
	}
};
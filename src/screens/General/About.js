import React from 'react';
import { View, Text, SafeAreaView, Dimensions, Linking, TouchableOpacity } from 'react-native';
import { NavBar, Avatar, ListItem } from '@/components';
import { menuItems, developers } from '@/data/AboutItems.js';
import { appVersion } from '../../../package.json';

const { height } = Dimensions.get('screen');

export const About = () => {
	const { textStyle, subBackground, center, titleStyle, contributorStyle, containerFlex, footer } = styles;

	const renderTabs = ({ url, title, content, icon }) => (
		<ListItem onPress = { () => Linking.openURL(url) } key = { title }>
			<ListItem.Title>{ title }</ListItem.Title>
			<ListItem.Subtitle>{ content }</ListItem.Subtitle>
			<ListItem.LeftIcon name = { icon } size = { 26 } color = 'white' />
			<ListItem.RightIcon name = 'chevron-forward-circle-outline' size = { height * 0.025 } color = '#FECB00' />
		</ListItem>
	);

	const renderDev = ({ name, pic, github }) => {
		const [firstName, lastName] = name.split(' ');

		return (
			<TouchableOpacity onPress = { () => Linking.openURL(github) } key = { name }>
				<View style = { center }>
					<Avatar source = { pic } />
				</View>
				<View style = { center }>
					<Text style = { [textStyle, { fontSize: 16 }] }>{ firstName }</Text>
					<Text style = { [textStyle, { fontSize: 16 }] }>{ lastName }</Text>
				</View>
			</TouchableOpacity>
		);
	};

	let version = <Text style = { [textStyle, { fontSize: 16, textAlign: 'right' }] }>{ appVersion }</Text>;

	return (
		<SafeAreaView style = { [subBackground, containerFlex] }>
			<NavBar title = 'About' childComponent = { version } back />
			<View style = { [{ color: 'black' }, containerFlex] }>
				{ menuItems.map(tab => renderTabs(tab)) }
			</View>
			<View style = { containerFlex }>
				<Text style = { [textStyle, titleStyle, { fontSize: 20 }] }>Developed by:</Text>
				<View style = {{ flexDirection: 'row', justifyContent: 'space-around' }}>
					{ developers.map(dev => renderDev(dev)) }
				</View>
				<TouchableOpacity onPress = { () => Linking.openURL('https://github.com/SHPEUCF/shpeucfapp/graphs/contributors') }>
					<Text style = { [textStyle, contributorStyle] }>...and our amazing contributors.</Text>
				</TouchableOpacity>
				<View style = { [center, footer] }>
					<Text style = { textStyle }>Copyright © 2018 SHPE UCF</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = {
	subBackground: {
		backgroundColor: '#0c0b0b'
	},
	textStyle: {
		color: '#FFF',
		fontSize: 14
	},
	center: {
		alignItems: 'center'
	},
	titleStyle: {
		fontWeight: 'bold',
		padding: '4%',
		fontSize: 16
	},
	containerFlex: {
		flex: 1
	},
	contributorStyle: {
		alignSelf: 'center',
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: '3%'
	},
	footer: {
		flex: 0.95,
		justifyContent: 'flex-end'
	}
};
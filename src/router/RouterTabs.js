import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@/components';

export const RouterTabs = ({ state, navigation }) => {
	const Icons = ['newspaper', 'ios-calendar', 'ios-person', 'ios-menu'];
	const { tabRow, tab } = styles;

	const Tab = ({ route, index }) => {
		const isFocused = state.index === index;
		const onPress = () => {
			const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });

			if (!isFocused && !event.defaultPrevented)
				navigation.navigate(route.name);
		};

		return (
			<TouchableOpacity onPress = { onPress } style = { tab }>
				<Icon name = { Icons[index] } size = { 30 } style = {{ color: isFocused ? '#FFC107' : 'white' }} />
				<Text style = {{ color: isFocused ? '#E0E6ED' : '#C0CCDA' }}>
					{ route.name }
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style = { tabRow }>
			{ state.routes.map((route, index) => <Tab route = { route } index = { index } key = { route.name } />) }
		</View>
	);
};

const styles = {
	tabRow: {
		height: '8%',
		flexDirection: 'row',
		backgroundColor: '#21252b',
		justifyContent: 'space-around'
	},
	tab: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around'
	}
};
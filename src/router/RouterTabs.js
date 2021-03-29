import React from 'react';
import { View, Text } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import { Icon } from '@/components';

export const RouterTabs = ({ state, navigation }) => {
	const Icons = ['newspaper', 'ios-calendar', 'ios-person', 'ios-menu'];
	const { tabRow, mask } = styles;

	const Tab = ({ route, index }) => {
		const isFocused = state.index === index;
		const onPress = () => {
			const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });

			if (!isFocused && !event.defaultPrevented)
				navigation.navigate(route.name);
		};

		return (
			<MaskedView
				onStartShouldSetResponder = { () => true }
				onResponderGrant = { onPress }
				style = {{ flex: 1 }}
				maskElement = { <View style = { mask }>
					<Icon name = { Icons[index] } size = { 30 } />
					<Text>{ route.name }</Text>
				</View> }
			>
				{ isFocused && <View style = {{ position: 'absolute', zIndex: 1, transform: [{ translateX: 45 }], height: '100%', width: '100%', backgroundColor: '#FFC107' }} /> }
				<View style = {{ flex: 1, backgroundColor: 'white' }} />
			</MaskedView>
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
	mask: {
		backgroundColor: 'transparent',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
};
import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';

class NavBar extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		text: PropTypes.string,
		back: PropTypes.boolean
	}

	render() {
		const {
			tabBar,
			tabBarText,
			childStyle
		} = styles;

		const {
			title,
			back,
			onBack,
			childComponent,
			style
		} = this.props;

		if (back) {
			return (
				<View style={[tabBar, style, {flexDirection: 'row'}]}>
					<View style={{paddingLeft: '3%'}}>
						<Ionicons name="md-arrow-back" size={30} onPress={onBack} style={{padding: '3%', color: '#E0E6ED'}}/>
					</View>
					<View>
						<Text style={tabBarText}>{title}</Text>
					</View>
					<View style={childStyle}>
						{childComponent}
					</View>
				</View>
			)
		}
		else {
			return (
				<View style={[tabBar, style, {flexDirection: 'row'}]}>
					<View>
						<Text style={tabBarText}>{title}</Text>
					</View>
					<View style={childStyle}>
						{childComponent}
					</View>
				</View>
			)
		}
	}
}

NavBar.defaultProps = {
	back: false
}

const dimension = Dimensions.get('window');

const styles = StyleSheet.create({
	tabBar: {
		justifyContent: 'flex-start',
		backgroundColor: '#21252b',
		alignItems:'center',
		borderBottomWidth: 1,
		borderBottomColor: '#fff2',
		height: dimension.height * 0.1
	},
	tabBarText: {
		color: '#E0E6ED',
		fontSize: 20,
		fontWeight:'bold',
		paddingLeft: '5%'
	},
	childStyle: {
		paddingRight: '3%'
	}
})

export { NavBar };
import React from 'react';
import { View, Dimensions, SafeAreaView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ListItem } from '@/components';

const { height } = Dimensions.get('screen');

const menuItems = [
	{
		title: 'Leaderboard',
		icon: 'format-align-left',
		screen: 'LeaderboardM',
		userPrivilege: 'user'
	},
	{
		title: 'Voting',
		icon: 'done',
		screen: 'ElectionBallot',
		userPrivilege: 'paidMember'
	},
	{
		title: 'E-Board Application',
		icon: 'assignment',
		screen: 'ElectionApplication',
		userPrivilege: 'paidMember'
	},
	{
		title: 'Committees',
		icon: 'assignment-ind',
		screen: 'Committees',
		userPrivilege: 'user'
	},
	{
		title: 'About',
		icon: 'info',
		screen: 'About',
		userPrivilege: 'user'
	},
	{
		title: 'BackEnd',
		icon: 'settings',
		screen: 'AdminHub',
		userPrivilege: 'eboard'
	}
];

export default () => {
	const { alignSelf, header, mainBackgroundColor, secondaryBackgroundColor, fullFlex } = styles;
	const imageUrl = '../../assets/images/';

	const { user: { activeUser: { privilege, apply } }, elect: { election } } = useSelector(state => state);

	const renderMenu = ({	title, icon, screen, userPrivilege }) => {
		if ((title === 'Voting' && !election) || (title === 'E-Board Application' && !apply))
			return null;

		if (privilege && privilege[userPrivilege]) {
			return (
				<ListItem onPress = { Actions[screen] } key = { title }>
					<ListItem.Title>{ title }</ListItem.Title>
					<ListItem.LeftIcon type = 'MaterialIcons' name = { icon } color = 'white' />
					<ListItem.RightIcon name = 'chevron-forward-circle-outline' size = { 22 } color = '#FECB00' />
				</ListItem>
			);
		}
	};

	return (
		<SafeAreaView style = { [mainBackgroundColor, fullFlex] }>
			<View style = { [header, secondaryBackgroundColor] }>
				<Image
					source = { require(`${imageUrl}SHPE_UCF_Logo.png`) }
					style = { alignSelf }
					height = { height * 0.06 }
					resizeMode = 'contain'
				/>
			</View>
			<View style = { fullFlex }>
				{ menuItems.map(tab => renderMenu(tab)) }
			</View>
			<View style = { [fullFlex, mainBackgroundColor] }>
				<Image
					source = { require(`${imageUrl}SHPE_logo_FullColor-RGB-2x.png`) }
					style = { alignSelf }
					height = { 80 }
					resizeMode = 'contain'
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = {
	header: {
		height: '10%',
		justifyContent: 'center'
	},
	mainBackgroundColor: {
		backgroundColor: 'black'
	},
	secondaryBackgroundColor: {
		backgroundColor: '#FECB00'
	},
	fullFlex: {
		flex: 1
	},
	alignSelf: {
		alignSelf: 'center'
	}
};
import React from 'react';
import { View, SafeAreaView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { ListItem } from '@/components';

const menuItems = [
	{
		title: 'Leaderboard',
		icon: 'format-align-left',
		screen: 'Leaderboard',
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

export default ({ navigation }) => {
	const {
		flex25,
		flex100,
		mainBackgroundColor,
		secondaryBackgroundColor,
		centerContent,
		shpeLogo,
		knightLogo
	} = styles;

	const imageUrl = '../../assets/images/';

	const { user: { privilege, apply }, elect: { election } } = useSelector(state => state);

	const renderMenu = ({	title, icon, screen, userPrivilege }) => {
		if ((title === 'Voting' && !election) || (title === 'E-Board Application' && !apply))
			return null;

		if (privilege && privilege[userPrivilege]) {
			return (
				<ListItem onPress = { () => navigation.push(screen) } key = { title }>
					<ListItem.Title>{ title }</ListItem.Title>
					<ListItem.LeftIcon type = 'MaterialIcons' name = { icon } color = 'white' />
					<ListItem.RightIcon name = 'chevron-forward-circle-outline' size = { 22 } color = '#FECB00' />
				</ListItem>
			);
		}
	};

	return (
		<SafeAreaView style = { [mainBackgroundColor, flex100] }>
			<View style = { [flex25, secondaryBackgroundColor, centerContent ] }>
				<Image
					source = { require(`${imageUrl}SHPE_UCF_Logo.png`) }
					style = { knightLogo }
					resizeMode = 'contain'
				/>
			</View>
			<View style = { flex100 }>
				{ menuItems.map(tab => renderMenu(tab)) }
			</View>
			<View style = { [flex100, mainBackgroundColor, centerContent] }>
				<Image
					source = { require(`${imageUrl}SHPE_logo_FullColor-RGB-2x.png`) }
					style = { shpeLogo }
					resizeMode = 'contain'
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = {
	flex25: {
		flex: 0.25
	},
	flex100: {
		flex: 1
	},
	mainBackgroundColor: {
		backgroundColor: 'black'
	},
	secondaryBackgroundColor: {
		backgroundColor: '#FECB00'
	},
	centerContent: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	knightLogo: {
		height: '70%'
	},
	shpeLogo: {
		width: '70%'
	}
};
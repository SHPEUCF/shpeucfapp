import React from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { NavBar, ListItem } from '@/components';

const menuItems = [
	{
		title: 'Election',
		icon: 'check',
		screen: 'ElectionAdmin',
		privilege: 'president'
	},
	{
		title: 'Committees',
		icon: 'assignment-ind',
		screen: 'CommitteesAdmin',
		privilege: 'eboard'
	},
	{
		title: 'Members',
		icon: 'people',
		screen: 'MemberAdmin',
		privilege: 'eboard'
	}
];

export default ({ navigation }) => {
	const { user } = useSelector(state => state);
	const { page } = styles;

	const renderItem = ({ privilege, title, icon, screen }) => {
		if (user.privilege && user.privilege[privilege]) {
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
		<SafeAreaView style = { page }>
			<NavBar title = 'Back End' onBack = { () => navigation.pop() } back />
			{ menuItems.map(tab => renderItem(tab)) }
		</SafeAreaView>
	);
};

const styles = {
	page: {
		flex: 1,
		backgroundColor: '#0c0b0b'
	}
};
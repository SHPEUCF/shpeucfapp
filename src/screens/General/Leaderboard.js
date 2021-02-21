import React, { useState } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { NavBar, FilterList, Icon, MemberPanel } from '@/components';

const { height } = Dimensions.get('screen');

export const Leaderboard = () => {
	const [search, setSearch] = useState(false);
	const { members: { allMemberAccounts, rankedIDs } } = useSelector(state => state);
	const { screenBackground } = styles;
	const searchIcon = <Icon
		onPress = { () => setSearch(!search) }
		name = 'ios-search'
		size = { height * 0.04 }
		color = '#FECB00'
	/>;

	return (
		<SafeAreaView style = { screenBackground }>
			<NavBar title = 'Leaderboard' childComponent = { searchIcon } back />
			<FilterList
				data = { rankedIDs.map(id => allMemberAccounts[id]) }
				search = { search }
				placeholder = 'Find user'
				itemJSX = { member => <MemberPanel member = { member } variant = 'Leaderboard' /> }
				regexFunc = { ({ firstName, lastName }) => `${firstName} ${lastName}` }
				onSelect = { () => null }
			/>
		</SafeAreaView>
	);
};

const styles = {
	screenBackground: {
		flex: 1,
		backgroundColor: '#0c0b0b'
	},
};
import React from 'react';
import { useSelector } from 'react-redux';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from '@/components';

const { width, height } = Dimensions.get('screen');

export const Leaderboard = ({ navigation }) => {
	const { user: { activeUser: { id } }, members: { rankedIDs, allMemberAccounts } } = useSelector(state => state);
	const firstMember = allMemberAccounts[rankedIDs[0]];
	const {
		title,
		leaderboardContent,
		textColor,
		indexText,
		index,
		leaderboardContainer,
		leaderboardContentDivider,
		leaderboardDividerLine,
		leaderboardArrow,
		gold
	} = styles;

	return (
		firstMember && <TouchableOpacity style = { leaderboardContainer } onPress = { () => navigation.push('Leaderboard') }>
			<View style = {{ flex: 1 }}>
				<View style = { leaderboardContent }>
					<Text style = { [title, textColor] }>Top Member</Text>
					<Text style = { textColor }>
						{ firstMember.firstName } { firstMember.lastName }
					</Text>
				</View>
				<View style = { leaderboardContentDivider }>
					<View style = { leaderboardDividerLine } />
					<View style = { leaderboardArrow }>
						<Icon name = 'chevron-forward-circle-outline' size = { height * 0.025 } style = { gold } />
					</View>
					<View style = { leaderboardDividerLine } />
				</View>
				<View style = { leaderboardContent }>
					<Text style = { [title, textColor] }>Your Ranking</Text>
					<View style = { index }>
						<Text style = { indexText }>{ allMemberAccounts[id].rank }</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = {
	title: {
		fontSize: 18,
		fontWeight: '500'
	},
	textColor: {
		color: '#e0e6ed'
	},
	leaderboardContainer: {
		backgroundColor: '#21252b',
		marginRight: 5,
		width: '100%',
		height: '100%'
	},
	leaderboardContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-evenly'
	},
	leaderboardContentDivider: {
		flex: 0.3,
		alignSelf: 'center',
		width: '80%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around'
	 },
	leaderboardDividerLine: {
		flex: 0.45,
		height: height * 0.003,
		backgroundColor: 'black'
	},
	leaderboardArrow: {
		color: '#FECB00',
		width: width * 0.06,
		alignItems: 'center'
	},
	index: {
		color: '#000',
		borderColor: '#FECB00',
		backgroundColor: '#FECB00',
		borderStyle: 'solid',
		borderRadius: height * 0.05 * 0.5,
		justifyContent: 'center',
		alignItems: 'center',
		height: height * 0.05,
		width: height * 0.05
	},
	indexText: {
		fontWeight: '700',
		fontSize: 20,
		color: 'black'
	},
	gold: {
		color: '#FECB00'
	}
};
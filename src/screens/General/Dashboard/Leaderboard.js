import React, { PureComponent } from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { rankMembersAndReturnsCurrentUser } from '@/utils/render';
import { Icon } from '@/components';

const { width, height } = Dimensions.get('screen');
const iteratees = ['points', 'lastName', 'firstName'];
const order = ['desc', 'asc', 'asc'];

export default class Leaderboard extends PureComponent {
	render() {
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

		let sortedMembers = _.orderBy(this.props.membersPoints, iteratees, order);
		let currentMember = rankMembersAndReturnsCurrentUser(sortedMembers, this.props.activeUser.id);

		return (
			<TouchableOpacity style = { leaderboardContainer } onPress = { () => this.props.navigation.push('Leaderboard') }>
				{ currentMember && <View style = {{ flex: 1 }}>
					<View style = { leaderboardContent }>
						<Text style = { [title, textColor] }>Top Member</Text>
						<Text style = { textColor }>{ sortedMembers[0].firstName } { sortedMembers[0].lastName }</Text>
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
							<Text style = { indexText }>{ currentMember.index }</Text>
						</View>
					</View>
				</View> }
			</TouchableOpacity>
		);
	}
}

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
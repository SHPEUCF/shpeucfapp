import React, { useEffect, useRef } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Avatar, ProgressBar } from '@/components';
import { truncateNames, verifiedCheckMark } from '@/utils/render';
import _ from 'lodash';

const { width, height } = Dimensions.get('screen');

export const MemberPanel = ({ member, variant }) => {
	const { id, rank, picture, color, points, paidMember } = member;
	const { text, currentUserTextColor } = styles;

	const { user, members: { allMemberAccounts, rankedIDs } } = useSelector(state => state);
	const navigation = useNavigation();

	const [firstName, lastName] = truncateNames(member);
	const isCurrentUser = id === user.id;
	const memberRef = useRef({ listener: () => null });
	const defaultAvatar = <Avatar
		source = { picture }
		title = { firstName[0].concat(lastName[0]) }
		style = {{ backgroundColor: color }}
	/>;

	let panelContent = null;
	let userTextStyle = isCurrentUser ? currentUserTextColor : {};

	useEffect(() => { memberRef.current.member = member });

	// pushes any new changes to the active event
	if (memberRef.current.member !== undefined && !_.isEqual(memberRef.current, member))
		memberRef.current.listener(member);

	if (variant === 'General') {
		const { generalContainer, generalUserInfoContainer, fullFlex } = styles;

		panelContent = <View style = { generalContainer }>
			<View style = { generalUserInfoContainer }>
				<Text style = { [text, fullFlex, userTextStyle] }>{ `${firstName} ${lastName}` }</Text>
				{ defaultAvatar }
			</View>
		</View>;
	}
	else if (variant === 'Leaderboard') {
		const {
			row,
			position,
			progress,
			indexText,
			leaderboardContainer,
			leaderboardUserInfoContainer,
			userTextContainer,
			itemContentContainer
		} = styles;

		panelContent = <View style = { leaderboardContainer }>
			<View style = { itemContentContainer }>
				<View style = { position }>
					<Text style = { indexText }>{ rank }</Text>
				</View>
				<View>
					<View style = { leaderboardUserInfoContainer }>
						<View style = { userTextContainer }>
							<View style = { row }>
								<Text style = { [text, { fontWeight: 'bold' }, userTextStyle] }>
									{ `${firstName} ${lastName}` }
								</Text>
								{ verifiedCheckMark({ paidMember }) }
							</View>
							<Text style = { [text, { fontSize: 15 }, userTextStyle] }>{ `Points: ${points}` }</Text>
						</View>
						{ defaultAvatar }
					</View>
					<ProgressBar
						style = { progress }
						progress = { points / Math.max(allMemberAccounts[rankedIDs[0]].points, 1) }
						height = { width * 0.03 }
						width = { width * 0.75 }
						color = '#FFD700'
					/>
				</View>
			</View>
		</View>;
	}

	return (
		<TouchableOpacity onPress = { () => isCurrentUser ? navigation.navigate('Profile') : navigation.push('OtherProfile', memberRef) }>
			{ panelContent }
		</TouchableOpacity>
	);
};

const styles = {
	row: {
		alignItems: 'center',
		flexDirection: 'row'
	},
	text: {
		color: '#e0e6ed',
		fontSize: width * 0.05
	},
	fullFlex: {
		flex: 1
	},
	leaderboardContainer: {
		height: height * 0.18,
		backgroundColor: 'black',
		alignItems: 'flex-start',
		paddingHorizontal: 15
	},
	generalContainer: {
		height: 150,
		alignItems: 'flex-start',
		paddingHorizontal: 15,
		justifyContent: 'center'
	},
	currentUserTextColor: {
		color: '#FECB00'
	},
	progress: {
		marginTop: 10,
		justifyContent: 'center',
		height: 13,
		borderColor: '#2C3239',
		backgroundColor: '#2C3239'
	},
	indexText: {
		alignSelf: 'center',
		fontWeight: '700',
		fontSize: width * 0.05,
		color: 'black'
	},
	position: {
		borderColor: '#FECB00',
		backgroundColor: '#FECB00',
		marginRight: '4%',
		borderRadius: height * 0.06 * 0.5,
		justifyContent: 'center',
		height: height * 0.06,
		width: height * 0.06,
		elevation: 1,
		alignItems: 'center'
	},
	itemContentContainer: {
		flexDirection: 'row',
		 flex: 1,
		 alignItems: 'center'
	},
	userTextContainer: {
		paddingTop: 5,
		width: '62%'
	},
	leaderboardUserInfoContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		paddingBottom: 20
	},
	generalUserInfoContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
};
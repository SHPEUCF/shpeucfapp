import React, { useState } from 'react';
import { Text, View, Dimensions, SafeAreaView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { verifiedCheckMark, rankMembersAndReturnsCurrentUser, truncateNames } from '@/utils/render';
import { NavBar, FilterList, Avatar, ProgressBar, Icon } from '@/components';
import { getVisitedMember } from '@/ducks';

const { height, width } = Dimensions.get('screen');
const iteratees = ['points', 'lastName', 'firstName'];
const order = ['desc', 'asc', 'asc'];

export const Leaderboard = () => {
	const [search, setSearch] = useState(false);
	const { user: { activeUser }, members: { allMemberAccounts } } = useSelector(state => state);
	const dispatch = useDispatch();

	const sortedMembers = _.orderBy(allMemberAccounts, iteratees, order);

	const renderMembers = ({ id, index, picture, color, points, paidMember, ...user }, sortedMembers) => {
		const {
			row,
			position,
			progress,
			textStyle,
			indexText,
			userInfoContainer,
			userTextContainer,
			userContainerColor,
			itemContentContainer,
			contentContainerStyle
		} = styles;
		let currentUserTextStyle = (id === activeUser.id) ? userContainerColor : {};

		truncateNames(user);

		return (
			<View style = { contentContainerStyle }>
				<View style = { itemContentContainer }>
					<View style = { position }>
						<Text style = { indexText }>{ index }</Text>
					</View>
					<View>
						<View style = { userInfoContainer }>
							<View style = { userTextContainer }>
								<View style = { row }>
									<Text style = { [textStyle, { fontWeight: 'bold' }, currentUserTextStyle] }>
										{ `${user.firstName} ${user.lastName}` }
									</Text>
									{ verifiedCheckMark({ paidMember }) }
								</View>
								<Text style = { [textStyle, { fontSize: 15 }, currentUserTextStyle] }>{ `Points: ${points}` }</Text>
							</View>
							{ picture
								? <Avatar source = { picture } />
								: <Avatar
									title = { user.firstName[0].concat(user.lastName[0]) }
									titleStyle = {{ backgroundColor: color }}
								/> }
						</View>
						<ProgressBar
							style = { progress }
							progress = { points / Math.max(sortedMembers[0].points, 1) }
							height = { width * 0.03 }
							width = { width * 0.75 }
							color = '#FFD700'
						/>
					</View>
				</View>
			</View>
		);
	};

	const { screenBackground } = styles;
	const searchIcon = <Icon
		onPress = { () => setSearch(!search) }
		name = 'ios-search'
		size = { height * 0.04 }
		color = '#FECB00'
	/>;

	rankMembersAndReturnsCurrentUser(sortedMembers, activeUser.id);

	return (
		<SafeAreaView style = { screenBackground }>
			<NavBar title = 'Leaderboard' childComponent = { searchIcon } back />
			<FilterList
				data = { sortedMembers }
				search = { search }
				placeholder = 'Find user'
				itemJSX = { data => renderMembers(data, sortedMembers) }
				regexFunc = { ({ firstName, lastName }) => `${firstName} ${lastName}` }
				onSelect = { ({ id }) => { dispatch(getVisitedMember(id)); Actions.OtherProfileM() } }
			/>
		</SafeAreaView>
	);
};

const styles = {
	row: {
		alignItems: 'center',
		flexDirection: 'row'
	},
	screenBackground: {
		flex: 1,
		backgroundColor: '#0c0b0b'
	},
	textStyle: {
		color: '#e0e6ed',
		fontSize: width * 0.05
	},
	contentContainerStyle: {
		height: height * 0.18,
		backgroundColor: 'black',
		alignItems: 'flex-start',
		paddingHorizontal: 15
	},
	userContainerColor: {
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
	userInfoContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		paddingBottom: 20
	},
	userTextContainer: {
		paddingTop: 5,
		width: '62%'
	}
};
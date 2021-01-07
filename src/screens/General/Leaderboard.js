import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { NavBar, FilterList, Avatar, ProgressBar, Icon } from '@/components';
import _ from 'lodash';
import { Text, View, Dimensions, SafeAreaView } from 'react-native';
import { verifiedCheckMark, rankMembersAndReturnsCurrentUser, truncateNames } from '@/utils/render';
import { getVisitedMember, filterChanged } from '@/ducks';

const dimension = Dimensions.get('screen');
const iteratees = ['points', 'lastName', 'firstName'];
const order = ['desc', 'asc', 'asc'];

class Leaderboard extends Component {
	constructor(props) {
		super(props);

		this.state = { search: false };
	}

	componentDidMount() {
		this.props.filterChanged('');
	}

	render() {
		const { screenBackground } = styles;
		const { allMemberAccounts, activeUser } = this.props;

		const sortedMembers = _.orderBy(allMemberAccounts, iteratees, order);
		const search = <Ionicons
			onPress = { () => { this.props.filterChanged(""); this.setState({ search: !this.state.search }) } }
			name = "ios-search"
			size = { height * 0.04 }
			color = "#FECB00"
		/>;

		rankMembersAndReturnsCurrentUser(sortedMembers, activeUser.id);

		return (
			<SafeAreaView style = {{ screenBackground }}>
				<NavBar back title = "Leaderboard" childComponent = { search } />
				<FilterList
					data = { sortedMembers }
					search = { this.state.search }
					placeholder = "Find user"
					regexFunc = { ({ firstName, lastName }) => `${firstName} ${lastName}` }
					onSelect = { ({ id }) => { this.props.getVisitedMember(id); Actions.OtherProfileM() } }
					itemJSX = { data => this.renderComponent(data, sortedMembers) }
				/>
			</SafeAreaView>
		);
	}

	renderComponent({ id, index, picture, color, points, paidMember, ...user }, sortedMembers) {
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

		let currentUserTextStyle = (id === this.props.activeUser.id) ? userContainerColor : {};

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
										{ `${item.firstName} ${item.lastName}` }
									</Text>
									{ verifiedCheckMark({ paidMember }) }
								</View>
								<Text style = { [textStyle, { fontSize: 15 }, currentUserTextStyle] }>{ `Points: ${points}` }</Text>
							</View>
							{ picture
								? <Avatar source = { item.picture } />
								: <Avatar
									title = { item.firstName[0].concat(item.lastName[0]) }
									titleStyle = {{ backgroundColor: item.color }}
								/> }
						</View>
						<ProgressBar
							style = { progress }
							progress = { item.points / Math.max(sortedMembers[0].points, 1) }
							height = { dimension.width * 0.03 }
							width = { dimension.width * 0.75 }
							color = '#ffd700'
						/>
					</View>
				</View>
			</View>
		);
	}
}

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
		fontSize: dimension.width * 0.05
	},
	contentContainerStyle: {
		height: dimension.height * 0.18,
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
		fontSize: dimension.width * 0.05,
		color: 'black'
	},
	index: {
		borderColor: '#FECB00',
		backgroundColor: '#FECB00',
		borderRadius: dimension.height * 0.06 * 0.5,
		marginRight: '4%',
		justifyContent: 'center',
		height: dimension.height * 0.06,
		width: dimension.height * 0.06,
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

const mapStateToProps = ({ user: { activeUser }, members: { allMemberAccounts }, general: { filter } }) => (
	{ activeUser, filter, allMemberAccounts }
);
const mapDispatchToProps = { getVisitedMember, filterChanged };

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
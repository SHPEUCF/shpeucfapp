import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { FlatList, View, Dimensions, SafeAreaView, Image } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { pageLoad, updateElection } from '../../ducks';

const dimension = Dimensions.get('window');

const menuItems = [
	{
		title: 'Leaderboard',
		icon: 'format-align-left',
		screen: 'LeaderboardM',
		privilege: 'user'
	},
	{
		title: 'Voting',
		icon: 'done',
		screen: 'ElectionBallot',
		privilege: 'paidMember'
	},
	{
		title: 'E-Board Application',
		icon: 'assignment',
		screen: 'ElectionApplication',
		privilege: 'paidMember'
	},
	{
		title: 'Committees',
		icon: 'assignment-ind',
		screen: 'Committees',
		privilege: 'user'
	},
	{
		title: 'About',
		icon: 'info',
		screen: 'About',
		privilege: 'user'
	},
	{
		title: 'BackEnd',
		icon: 'settings',
		screen: 'AdminHub',
		privilege: 'eboard'
	}
];

const imageUrl = '../../assets/images/';

class More extends Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false
		};
	}

	render() {
		const {
			alignSelf,
			header,
			mainBackgroundColor,
			secondaryBackgroundColor,
			fullFlex
		} = styles;

		return (
			<SafeAreaView style = { [mainBackgroundColor, fullFlex] }>
				<View style = { [header, secondaryBackgroundColor] }>
					<Image
						source = { require(imageUrl + 'SHPE_UCF_Logo.png') }
						style = { alignSelf }
						height = { dimension.height * 0.06 }
						resizeMode = 'contain'
					/>
				</View>
				<FlatList
					removeClippedSubviews = { false }
					extraData = { this.props }
					keyExtractor = { this.keyExtractor }
					data = { menuItems }
					renderItem = { this.renderItem }
				/>
				<View style = { [fullFlex, mainBackgroundColor] }>
					<Image
						source = { require(imageUrl + 'SHPE_logo_FullColor-RGB-2x.png') }
						style = { alignSelf }
						height = { 80 }
						resizeMode = 'contain'
					/>
				</View>
			</SafeAreaView>
		);
	}

	_onRefresh = () => {
		this.setState({ refreshing: false });
	}

	keyExtractor = (item, index) => index

	renderItem = ({	item }) => {
		const {
			election,
			activeUser
		} = this.props;

		const {
			privilege,
			apply
		} = activeUser;

		const {
			mainBackgroundColor,
			bottomBorder,
			primaryTextColor,
			secondaryTextColor
		} = styles;

		if (item.title === 'Voting' && !election) return null;
		if (item.title === 'E-Board Application' && !apply) return null;

		if (privilege && privilege[item.privilege])
			return (
				<View>
					<ListItem
						containerStyle = { [mainBackgroundColor, bottomBorder] }
						removeClippedSubviews = { false }
						title = { item.title }
						titleStyle = { primaryTextColor }
						leftIcon = {{ name: item.icon, color: 'white' }}
						rightIcon = { <Ionicons
							name = 'ios-arrow-dropright'
							size = { 22 }
							style = { secondaryTextColor }
						/> }
						onPress = { () => Actions[item.screen]() }
					/>
				</View>
			);
	}
}

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
	bottomBorder: {
		borderBottomWidth: 1,
		borderColor: 'black'
	},
	fullFlex: {
		flex: 1
	},
	primaryTextColor: {
		color: 'white'
	},
	secondaryTextColor: {
		color: '#FECB00'
	},
	alignSelf: {
		alignSelf: 'center'
	}
};

const mapStateToProps = ({ user, general, elect }) => {
	const { activeUser } = user;
	const { loading } = general;
	const {
		election,
		apply
	} = elect;

	return { loading, election, apply, activeUser };
};

const mapDispatchToProps = {
	pageLoad,
	updateElection
};

export default connect(mapStateToProps, mapDispatchToProps)(More);
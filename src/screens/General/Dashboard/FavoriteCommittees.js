import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('screen');

export default class FavoriteCommittees extends PureComponent {
	render() {
		const {
			committeesPanelContainer,
			committeesListContainer,
			committeeItemContainer,
			committeeNameContainer,
			committeesPlaceHolder,
			selectCommitteesIcon,
			leaderboardArrow,
			textColor,
			gold
		} = styles;

		const { committeesList, userCommittees } = this.props;

		return (
			<View style = { committeesPanelContainer }>
				<View style = { selectCommitteesIcon }>
					<Ionicons
						name = 'ios-information-circle'
						size = { height * 0.028 }
						onPress = { () => Actions['CommitteesD']({ screen: 'dashboard' }) } style = { gold }
					/>
				</View>
				{ (!userCommittees || !committeesList)
					? <View style = { committeesPlaceHolder }>
						<Text style = { [textColor, { fontSize: width * 0.03 }] }>Add your main committees!</Text>
					</View>
					: <View style = { committeesListContainer }>
						{ Object.keys(userCommittees).map(committeeName =>
							<TouchableOpacity
								style = { committeeItemContainer }
								onPress = { () => {
									this.props.loadCommittee(committeesList[committeeName]);
									Actions['CommitteePageD']({ screen: 'dashboard' });
								} }
							>
								<View style = { committeeNameContainer }>
									<Text style = { [textColor, { fontSize: width * 0.03 }] }>{ committeeName }</Text>
								</View>
								<View style = { leaderboardArrow }>
									<Ionicons name = 'ios-arrow-dropright' size = { height * 0.025 } style = { gold } />
								</View>
							</TouchableOpacity>
						) }
					</View>
				}
			</View>
		);
	}
}

const styles = {
	committeesPanelContainer: {
		flexDirection: 'row',
		flex: 1,
		height: '100%',
		backgroundColor: '#21252b',
		alignItems: 'center',
		marginLeft: 5
	},
	committeesListContainer: {
		flex: 1,
		height: '80%'
	},
	committeesPlaceHolder: {
		flex: 1,
		justifyContent: 'space-evenly',
		height: '80%'
	},
	selectCommitteesIcon: {
		height: '100%',
		alignItems: 'center',
		flex: 0.25,
		paddingTop: '5%'
	},
	committeeItemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		paddingRight: 20
	},
	committeeNameContainer: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'space-evenly'
	},
	gold: {
		color: '#FECB00'
	},
	textColor: {
		color: '#e0e6ed'
	},
	leaderboardArrow: {
		color: '#FECB00',
		width: width * 0.06,
		alignItems: 'center'
	}
};
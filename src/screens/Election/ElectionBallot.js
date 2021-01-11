import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Alert, Button, NavBar, ButtonLayout, Avatar, Icon } from '@/components';
import { getPositions, vote, getVotes } from '@/ducks';
import { stockImg, truncateNames } from '@/utils/render';

const iterateesPos = ['level'];
const orderPos = ['asc'];
const iterateesCandidate = ['lastName', 'firstName'];
const orderCandidate = ['asc', 'asc'];

class ElectionBallot extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedCandidates: {},
			visibleCandidate: {},
			visible: false,
			isLoaded: false
		};
	}

	componentDidMount() {
		this.props.getPositions();
		this.props.getVotes();
	}

	// Refills selectedCandidates object with data from firebase.
	componentWillReceiveProps(nextProps) {
		const {
			votes,
			voted,
			id
		} = nextProps;

		if (votes && voted && !this.state.isLoaded) {
			let selectedCandidates = {};

			Object.entries(votes).forEach(([position, candidates]) => {
				Object.entries(candidates).forEach(([candidate, candidateData]) => {
					if (candidateData[id])
						selectedCandidates[position] = candidate;
				});
			});

			const isLoaded = !_.isEmpty(selectedCandidates);

			this.setState({ selectedCandidates, isLoaded });
		}
	}

	render() {
		const {
			flex,
			mainBackground,
			secondaryBackground
		} = styles;

		const {
			positions,
			activeUser,
			navigation
		} = this.props;

		const positionsArray = _.orderBy(positions, iterateesPos, orderPos);

		return (
			<SafeAreaView style = { [flex, mainBackground] }>
				<NavBar title = 'Positions' back onBack = { () => navigation.pop() } />
				<View style = { [flex, secondaryBackground] }>
					<FlatList
						data = { positionsArray }
						extraData = { this.state }
						keyExtractor = { this.keyExtractor }
						renderItem = { ({ item }) => this.renderCandidatesList(item) }
						ListHeaderComponent = { () => this.renderSeparator() }
						ListFooterComponent = { () => this.renderSeparator() }
						ItemSeparatorComponent = { () => this.renderSeparator() }
					/>
				</View>
				{ !activeUser.voted && <ButtonLayout>
					<Button title = 'Submit' onPress = { () => this.submitVote() } />
					<Button title = 'Cancel' onPress = { () => { navigation.pop() } } />
				</ButtonLayout> }
				{ this.renderModal() }
			</SafeAreaView>
		);
	}

	renderSeparator() {
		return (
			<View style = { styles.spacing } />
		);
	}

	keyExtractor = (item, index) => index;

	renderCandidatesList(item) {
		const {
			mainBackground,
			goldBackground,
			titleStyle,
			spacing,
			positionContent,
			center
		} = styles;

		const candidateList = _.orderBy(item.candidates, iterateesCandidate, orderCandidate);

		if (candidateList.length > 0 && candidateList.some((candidate) => candidate.approved)) {
			return (
				<View style = { [positionContent, center] }>
					<View style = { [spacing, goldBackground] }>
						<Text style = { titleStyle }>{ item.title }</Text>
					</View>
					<View style = { [spacing, mainBackground] }>
						{ candidateList.map(candidate => <View>
							{ this.renderCandidate(candidate) }
						</View>) }
					</View>
				</View>
			);
		}
	}

	renderCandidate(candidate) {
		const {
			center,
			candidateStyle,
			textColor,
			titleStyle,
			flex,
			centerItems
		} = styles;

		truncateNames(candidate);

		const {
			approved,
			firstName,
			lastName,
			picture
		} = candidate;

		if (approved) {
			return (
				<View style = { [candidateStyle, flex] }>
					{ this.renderCheck(candidate) }
					<TouchableOpacity
						style = { [candidateStyle, flex] }
						onPress = { () => this.setState({ visibleCandidate: candidate, visible: true }) }
					>
						<View style = { [flex, centerItems] }>
							<Avatar size = { 50 } source = { picture || stockImg } />
						</View>
						<Text style = { [center, textColor, titleStyle, { flex: 1.5 }] }>
							{ firstName } { lastName }
						</Text>
						<View style = { [centerItems, { flex: 0.3 }] }>
							<Icon name = 'ios-arrow-dropright' size = { 22 } color = '#FECB00' />
						</View>
					</TouchableOpacity>
				</View>
			);
		}
	}

	renderCheck(candidate) {
		const {
			center
		} = styles;

		const isChecked = candidate.id === this.state.selectedCandidates[candidate.position];

		return (
			<TouchableOpacity style = { center } onPress = { () => this.updateSelection(isChecked, candidate) }>
				<Icon
					type = 'FontAwesome'
					name = { isChecked ? 'check-circle-o' : 'circle-o' }
					color = { isChecked ? '#FECB00' : '#FFF' }
					size = { 30 }
				/>
			</TouchableOpacity>
		);
	}

	updateSelection(isChecked, { position, id }) {
		if (this.props.activeUser.voted) {
			Alert.alert('You have already voted!');
		}
		else {
			let selectedCandidates = Object.assign({}, this.state.selectedCandidates);

			if (isChecked)
				selectedCandidates = _.omit(selectedCandidates, position);
			else
				selectedCandidates[position] = id;

			this.setState({ selectedCandidates });
		}
	}

	renderModal() {
		const {
			firstName,
			lastName,
			picture,
			plan
		} = this.state.visibleCandidate;

		const {
			modalBackground,
			modalContent,
			textColor,
			planStyle,
			titleStyle,
			closeModalBar
		} = styles;

		return (
			<Modal transparent = { true } visible = { this.state.visible } animationType = 'slide'>
				<View style = { modalBackground }>
					<TouchableOpacity
						style = { closeModalBar }
						onPress = { () => this.setState({ visible: false, visibleCandidate: {} }) }
					>
						<Icon name = 'ios-close-circle' size = { 40 } color = 'white' />
					</TouchableOpacity>
					<View style = { modalContent }>
						<Avatar size = { 200 } source = { picture || stockImg } />
						<Text style = { [textColor, titleStyle, { paddingVertical: '8%' }] }>
							{ firstName } { lastName }
						</Text>
						<Text style = { [textColor, planStyle] }>{ plan }</Text>
					</View>
				</View>
			</Modal>
		);
	}

	submitVote() {
		const {
			vote
		} = this.props.activeUser;

		if (_.isEmpty(this.state.selectedCandidates)) {
			Alert.alert('Please vote for at least one candidate!');
		}
		else {
			vote(this.state.selectedCandidates);
			this.props.navigation.pop();
		}
	}
}

const styles = {
	textColor: {
		color: 'white'
	},
	titleStyle: {
		fontWeight: 'bold',
		fontSize: 18
	},
	flex: {
		flex: 1
	},
	mainBackground: {
		backgroundColor: 'black'
	},
	goldBackground: {
		backgroundColor: '#FECB00'
	},
	secondaryBackground: {
		backgroundColor: '#0c0b0b'
	},
	center: {
		alignSelf: 'center'
	},
	candidateStyle: {
		flexDirection: 'row',
		padding: 7
	},
	spacing: {
		padding: '5%'
	},
	positionContent: {
		width: '90%',
		borderRadius: 5,
		overflow: 'hidden'
	},
	modalContent: {
		width: '95%',
		backgroundColor: 'rgba(33, 37, 43, 0.98)',
		alignItems: 'center',
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		padding: '6%'
	},
	modalBackground: {
		alignItems: 'center',
		height: '100%',
		justifyContent: 'center',
		backgroundColor: '#000a'
	},
	closeModalBar: {
		backgroundColor: '#FECB00',
		width: '95%',
		alignItems: 'center',
		justifyContent: 'center',
		borderTopRightRadius: 5,
		borderTopLeftRadius: 5
	},
	planStyle: {
		fontSize: 18
	},
	centerItems: {
		justifyContent: 'center',
		alignItems: 'center'
	}
};

const mapStateToProps = ({ elect, user }) => {
	const {
		election,
		positions,
		candidatePlan,
		votes
	} = elect;

	const { activeUser } = user;

	return {
		election,
		positions,
		candidatePlan,
		votes,
		activeUser
	};
};

const mapDispatchToProps = {
	getPositions,
	vote,
	getVotes
};

export default connect(mapStateToProps, mapDispatchToProps)(ElectionBallot);
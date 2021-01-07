import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FlatList, Text, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { NavBar, Icon } from '@/components';
import {
	openElection,
	closeElection,
	deleteCandidates,
	goToCandidateForm,
	getPositions,
	approveApplication,
	deleteApplication,
	candidatePlanChanged,
	candidateIdChanged
} from '@/ducks';

const dimension = Dimensions.get('window');
const iteratees = ['level'];
const order = ['asc'];

class ElectionCandidates extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.getPositions();
	}

	render() {
		const {
			content,
			page
		} = styles;
		const {
			positions
		} = this.props;

		const positionsArray = _.orderBy(positions, iteratees, order);

		// alert(positions.title);

		return (
			<SafeAreaView style = { page }>
				<NavBar title = 'Candidates' back onBack = { () => Actions.pop() } />
				<View style = { content }>
					{ this.renderFlatlist(positionsArray) }
				</View>
			</SafeAreaView>
		);
	}

	renderPositions(item) {
		const {
			containerStyle,
			contentContainerStyle,
			textColor
		} = styles;

		const candidatesArray = _.toArray(item.candidates);

		return (
			<View>
				<View style = { contentContainerStyle }>
					<View style = { containerStyle }>
						<Text style = { textColor }>{ item.title }</Text>
					</View>
				</View>
				<FlatList
					data = { candidatesArray }
					extraData = { this.state }
					keyExtractor = { this._keyExtractor }
					renderItem = { ({
						item
					}) =>
						this.renderCandidates(item) }
				/>
			</View>
		);
	}

	renderCandidates(item) {
		const {
			textColor,
			containerTextStyle
		} = styles;

		const color = item.approved ? { backgroundColor: '#ffd70088' } : { backgroundColor: '#2C323988' };

		return (
			<View style = { [styles.candidateContainer, color] }>
				<View style = { containerTextStyle }>
					<Text style = { textColor }>{ item.firstName + ' ' + item.lastName }</Text>
				</View>
				{ this.renderbuttons(item) }
			</View>
		);
	}

	renderbuttons(item) {
		const {
			position,
			id,
			firstName,
			lastName
		} = item;
		const {
			deleteApplication,
			approveApplication
		} = this.props;
		const {
			buttonContainerStyle
		} = styles;

		if (!item.approved) {
			return (
				<View style = { [{ flexDirection: 'row', flex: 1 }] }>
					<View style = { buttonContainerStyle }>
						<TouchableOpacity
							onPress = { () => approveApplication(position, id, firstName, lastName) }>
							<Icon name = 'md-checkmark-circle' size = { 40 } color = '#e0e6ed' />
						</TouchableOpacity>
					</View>
					<View style = { buttonContainerStyle }>
						<TouchableOpacity
							onPress = { () => deleteApplication(position, id) }>
							<Icon name = 'md-close-circle' size = { 40 } color = '#e0e6ed' />
						</TouchableOpacity>
					</View>
				</View>
			);
		}
		else {
			return (
				<View style = { [{ flexDirection: 'row', flex: 1 }] }>
					<View style = { buttonContainerStyle }>
						<TouchableOpacity onPress = { () => this.viewCandidate(item) }>
							<Icon name = 'md-create' size = { 40 } color = '#e0e6ed' />
						</TouchableOpacity>
					</View>
					<View style = { buttonContainerStyle }>
						<TouchableOpacity
							onPress = { () => deleteApplication(position, id) }>
							<Icon name = 'md-remove-circle' size = { 40 } color = '#e0e6ed' />
						</TouchableOpacity>
					</View>
				</View>
			);
		}
	}

	viewCandidate(item) {
		this.props.candidateIdChanged(item.id);
		this.props.candidatePlanChanged(item.plan);
		this.props.goToCandidateForm('EDIT', item.position);
	}

	_keyExtractor = (item, index) => index;

	renderFlatlist(positions) {
		return (
			<FlatList
				data = { positions }
				extraData = { this.state }
				keyExtractor = { this._keyExtractor }
				renderItem = { ({
					item
				}) =>
					this.renderPositions(item) }
			/>
		);
	}
}

const styles = {
	containerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		backgroundColor: 'black',
		paddingVertical: 10,
		paddingHorizontal: 15
	},

	containerTextStyle: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingVertical: 10,
		paddingHorizontal: 15
	},
	textColor: {
		color: '#e0e6ed'
	},
	contentContainerStyle: {
		margin: 1,
		backgroundColor: '#abc',
		height: dimension.height * 0.09
	},
	content: {
		flex: 0.98
	},
	buttonContainerStyle: {
		flex: 0.5,
		justifyContent: 'center'
	},
	page: {
		flex: 1,
		backgroundColor: '#0c0b0b'
	},
	candidateContainer: {
		flex: 0.5,
		marginTop: dimension.height * 0.002,
		flexDirection: 'row',
		justifyContent: 'center',
		height: dimension.height * 0.09
	}
};

const mapStateToProps = ({ elect }) => {
	const {
		election,
		positions
	} = elect;

	return { election, positions };
};

const mapDispatchToProps = {
	openElection,
	closeElection,
	deleteCandidates,
	goToCandidateForm,
	getPositions,
	approveApplication,
	deleteApplication,
	candidatePlanChanged,
	candidateIdChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(ElectionCandidates);
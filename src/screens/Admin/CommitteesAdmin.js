import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Button, NavBar, SortableFlatList, ButtonLayout, Icon } from '@/components';
import _ from 'lodash';
import { Text, View, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import {
	getCommittees,
	deleteCommittee,
	goToCommitteeForm,
	editCommittee,
	getAllMemberAccounts,
	addCommittee,
	chairPersonChanged,
	committeeDescriptionChanged,
	committeeTitleChanged,
	changeLevelsCom
} from '@/ducks';

const dimension = Dimensions.get('screen');
const iteratees = ['level'];
const order = ['asc'];

class CommitteesAdmin extends Component {
	constructor(props) {
		super(props);
		this.renderCommittees = this.renderCommittees.bind(this);
	}

	componentDidMount() {
		this.props.getCommittees();
		this.props.getAllMemberAccounts();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.committeesList !== this.props.committeesList) {
			this.setState({ data: _.orderBy(this.props.committeesList, iteratees, order).map((d, index) => ({
				committee: d,
				key: `item-${index}`,
				label: index,
				backgroundColor: '#fff'
			})) });
		}
	}

	state = {
		data: _.orderBy(this.props.committeesList, iteratees, order).map((d, index) => ({
			committee: d,
			key: `item-${index}`,
			label: index,
			backgroundColor: '#fff'
		}))
	}

	render() {
		const {
			page
		} = styles;
		const {
			committeesList
		} = this.props;

		const committeesArray = _.toArray(committeesList);

		return (
			<SafeAreaView style = { page }>
				<NavBar title = 'Committees' back onBack = { () => Actions.pop() } />
				{ this.renderFlatList(committeesArray) }
				<View>
					<ButtonLayout>
						<Button
							onPress = { () => this.setLevels() }
							title = { 'Set Order' }
						/>
						<Button
							onPress = { () => {
								this.props.committeeTitleChanged('');
								this.props.committeeDescriptionChanged('');
								this.props.chairPersonChanged({});
								this.props.goToCommitteeForm('ADD');
							} }
							title = { 'Add Committees' }
						/>
					</ButtonLayout>
				</View>
			</SafeAreaView>
		);
	}

	_keyExtractor = (item, index) => index;

	renderFlatList() {
		return (
			<View style = {{ flex: 1 }}>
				<SortableFlatList
					data = { this.state.data }
					extraData = { this.state }
					keyExtractor = { (item) => `draggable-item-${item.key}` }
					renderItem = { this.renderCommittees }
					scrollPercent = { 5 }
					onMoveEnd = { ({ data }) => this.setState({ data }) }
				/>
			</View>
		);
	}

	renderCommittees({
		item, move, moveEnd, isActive
	}) {
		const {
			containerStyle,
			contentContainerStyle,
			textColor
		} = styles;

		const color = isActive ? { backgroundColor: '#ffd70066' } : { backgroundColor: 'black' };

		return (
			<TouchableOpacity
				style = { [contentContainerStyle, color] }
				onLongPress = { move }
				onPressOut = { moveEnd }>
				<View style = { containerStyle }>
					<Text style = { textColor }>{ item.committee.title }</Text>
				</View>
				<View style = { styles.buttonContainerStyle }>
					<TouchableOpacity onPress = { () => this.viewCommittee(item.committee) }>
						<Icon style = { textColor } name = 'md-create' size = { 40 } />
					</TouchableOpacity>
				</View>
				<View style = { styles.buttonContainerStyle }>
					<TouchableOpacity onPress = { () => this.delete(item.committee) }>
						<Icon style = { textColor } name = 'md-trash' size = { 40 } />
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		);
	}

	delete(committee) {
		this.setState({
			data: this.state.data.filter(item => item.committee !== committee)
		});

		this.props.deleteCommittee(committee.title, committee.chair);
	}

	viewCommittee(item) {
		this.props.committeeTitleChanged(item.title);
		this.props.committeeDescriptionChanged(item.description);
		this.props.chairPersonChanged(item.chair);
		this.props.goToCommitteeForm('EDIT');
	}

	setLevels() {
		const {
			changeLevelsCom
		} = this.props;

		changeLevelsCom(this.state.data);
	}
}

const styles = {
	containerStyle: {
		flex: 25,
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingVertical: 10,
		paddingHorizontal: 15
	},
	containerTextStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		backgroundColor: '#2C3239',
		paddingVertical: 10,
		paddingHorizontal: 15
	},
	contentContainerStyle: {
		margin: 1,
		height: dimension.height * 0.09,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	textColor: {
		color: '#e0e6ed'
	},
	buttonContainerStyle: {
		flex: 5,
		margin: 5,
		justifyContent: 'center'
	},
	page: {
		flex: 1,
		backgroundColor: '#0c0b0b'
	}
};

const mapStateToProps = ({ committees }) => {
	const {
		committeesList
	} = committees;

	return { committeesList };
};

const mapDispatchToProps = {
	getCommittees,
	goToCommitteeForm,
	deleteCommittee,
	addCommittee,
	editCommittee,
	chairPersonChanged,
	committeeDescriptionChanged,
	committeeTitleChanged,
	changeLevelsCom,
	getAllMemberAccounts
};

export default connect(mapStateToProps, mapDispatchToProps)(CommitteesAdmin);
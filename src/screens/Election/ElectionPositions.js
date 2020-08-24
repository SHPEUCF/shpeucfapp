import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { Button, SortableFlatList, NavBar, ButtonLayout } from '../../components';
import {
	openElection,
	closeElection,
	deletePosition,
	goToPositionForm,
	getPositions,
	positionDescriptionChanged,
	positionTitleChanged,
	changeLevels
} from '../../ducks';

const dimension = Dimensions.get('window');
const iteratees = ['level'];
const order = ['asc'];

class ElectionPosition extends Component {
	constructor(props) {
		super(props);
		this.renderPositions = this.renderPositions.bind(this);
	}

	componentDidMount() {
		this.props.getPositions();
	}

	state = {
		data: _.orderBy(this.props.positions, iteratees, order).map((d, index) => ({
			position: d,
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
			positions
		} = this.props;

		const positionsArray = _.toArray(positions);

		return (
			<SafeAreaView style = { page }>
				<NavBar title = 'Positions' back onBack = { () => Actions.pop() } />
				{ this.renderFlatlist(positionsArray) }
				<ButtonLayout>
					<Button
						onPress = { () => {
							this.props.positionTitleChanged('');
							this.props.positionDescriptionChanged('');
							this.props.goToPositionForm('ADD');
						} }
						title = { 'Add Positions' }
					/>
					<Button
						onPress = { () => this.setLevels() }
						title = { 'Set Order' }
					/>
				</ButtonLayout>
			</SafeAreaView>
		);
	}

	setLevels() {
		const {
			changeLevels
		} = this.props;

		changeLevels(this.state.data);
	}

	renderPositions({
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
					<Text style = { textColor }>{ item.position.title }</Text>
				</View>
				<View style = { styles.buttonContainerStyle }>
					<TouchableOpacity onPress = { () => this.viewPosition(item.position) }>
						<Ionicons style = { textColor } name = 'md-create' size = { 40 } />
					</TouchableOpacity>
				</View>
				<View style = { styles.buttonContainerStyle }>
					<TouchableOpacity onPress = { () => this.delete(item.position) }>
						<Ionicons style = { textColor } name = 'md-trash' size = { 40 } />
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		);
	}

	viewPosition(item) {
		this.props.positionTitleChanged(item.title);
		this.props.positionDescriptionChanged(item.description);
		this.props.goToPositionForm('EDIT');
	}

	delete(position) {
		this.setState({
			data: this.state.data.filter(item => item.position !== position)
		});

		this.props.deletePosition(position.title);
	}

	renderFlatlist() {
		return (
			<View style = {{ flex: 1 }}>
				<SortableFlatList
					data = { this.state.data }
					extraData = { this.state }
					keyExtractor = { (item) => `draggable-item-${item.key}` }
					renderItem = { this.renderPositions }
					scrollPercent = { 5 }
					onMoveEnd = { ({
						data
					}) => this.setState({ data }) }
				/>
			</View>
		);
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
	deletePosition,
	goToPositionForm,
	getPositions,
	positionDescriptionChanged,
	positionTitleChanged,
	changeLevels
};

export default connect(mapStateToProps, mapDispatchToProps)(ElectionPosition);

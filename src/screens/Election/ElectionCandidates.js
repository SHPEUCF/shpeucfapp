import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, Text, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import _ from 'lodash';
import { NavBar, Icon } from '@/components';
import { getPositions } from '@/ducks';
import { approveApplication, deleteApplication } from '@/services/elections';

const dimension = Dimensions.get('screen');

export const ElectionCandidates = () => {
	const { positions } = useSelector(({ elect }) => elect);
	const positionsArray = _.orderBy(positions, ['level'], ['asc']);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPositions());
	}, []);

	const renderPositions = ({ candidates, title }) => {
		const { containerStyle, contentContainerStyle, textColor } = styles;
		const candidatesArray = _.toArray(candidates);

		return (
			<>
				<View style = { contentContainerStyle }>
					<View style = { containerStyle }>
						<Text style = { textColor }>{ title }</Text>
					</View>
				</View>
				<FlatList
					data = { candidatesArray }
					keyExtractor = { (item, index) => index }
					renderItem = { ({ item: candidate }) => renderCandidates(candidate) }
				/>
			</>
		);
	};

	const renderCandidates = ({ approved, firstName, lastName, position, id }) => {
		const { textColor, containerTextStyle, candidateContainer, buttonContainerStyle } = styles;
		const color = approved ? { backgroundColor: '#ffd70088' } : { backgroundColor: '#2C323988' };

		return (
			<View style = { [candidateContainer, color] }>
				<View style = { containerTextStyle }>
					<Text style = { textColor }>{ `${firstName} ${lastName}` }</Text>
				</View>
				<View style = { [{ flexDirection: 'row', flex: 1 }] }>
					{ !approved && <View style = { buttonContainerStyle }>
						<TouchableOpacity
							onPress = { () => approveApplication(position, id, firstName, lastName) }
						>
							<Icon name = 'md-checkmark-circle' size = { 40 } color = '#e0e6ed' />
						</TouchableOpacity>
					</View>
					}
					<View style = { buttonContainerStyle }>
						<TouchableOpacity onPress = { () => deleteApplication(position, id) }>
							<Icon name = 'md-remove-circle' size = { 40 } color = '#e0e6ed' />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	};

	const { content, page } = styles;

	return (
		<SafeAreaView style = { page }>
			<NavBar title = 'Candidates' back />
			<View style = { content }>
				<FlatList
					data = { positionsArray }
					keyExtractor = { (item, index) => index }
					renderItem = { ({ item: position }) => renderPositions(position) }
				/>
			</View>
		</SafeAreaView>
	);
};

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
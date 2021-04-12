import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Text, View, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { Alert, NavBar, Icon } from '@/components';
import { getCommittees } from '@/ducks';
import { editUser } from '@/services/user';

const { height } = Dimensions.get('screen');

export const Committees = ({ route: { params } }) => {
	const { committees: { committeesList }, user: { userCommittees } } = useSelector(state => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCommittees());
	}, []);

	const renderCommittees = ({ title }) => {
		const { containerStyle, contentContainerStyle, textColor } = styles;
		let isFavorite = userCommittees && !!userCommittees[title];
		let favoriteLength = Object.keys(userCommittees || {}).length;

		return (
			<TouchableOpacity onPress = { () => Alert.alert('Coming soon!') } style = { contentContainerStyle }>
				<View style = { containerStyle }>
					<Text style = { [textColor, { fontSize: 16 }] }>{ title }</Text>
				</View>
				{ params && params.prevRoute === 'Dashboard'
					? <View style = {{ backgroundColor: 'black', justifyContent: 'center', flex: 2, alignItems: 'flex-end' }}>
						<Icon
							name = { isFavorite ? 'star' : 'star-outline' }
							size = { height * 0.03 }
							style = {{ color: '#FECB00' }}
							onPress = { () => favoriteLength <= 4 && editUser({ userCommittees: {
								...userCommittees, [title]: !isFavorite || null
							} }) }
						/>
					</View>
					: <>
						<View style = {{ backgroundColor: 'black', justifyContent: 'center', flex: 2, alignItems: 'flex-end' }}>
							<Icon name = 'calendar' size = { height * 0.03 } style = {{ color: 'white' }} />
						</View>
						<View style = {{ flex: 0.6, justifyContent: 'center' }}>
							<Icon
								name = 'chevron-forward-circle-outline'
								size = { height * 0.025 }
								style = {{ color: '#FECB00', backgroundColor: 'transparent', alignSelf: 'center' }}
							/>
						</View>
					</>
				}
			</TouchableOpacity>
		);
	};

	const { content, page } = styles;
	const committeesArray = _.orderBy(committeesList, ['level'], ['asc']);

	return (
		<SafeAreaView style = { page }>
			<NavBar title = 'Committees' back />
			<View style = { content }>
				{ committeesArray.map(renderCommittees) }
			</View>
		</SafeAreaView>
	);
};

const styles = {
	containerStyle: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'flex-start',
		backgroundColor: 'black',
		paddingHorizontal: 15
	},
	textColor: {
		color: 'white'
	},
	contentContainerStyle: {
		backgroundColor: 'black',
		height: height * 0.09,
		flexDirection: 'row'
	},
	content: {
		flex: 0.98
	},
	page: {
		flex: 1,
		backgroundColor: '#0c0b0b'
	}
};
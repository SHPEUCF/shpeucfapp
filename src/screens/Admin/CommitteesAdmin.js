import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import _ from 'lodash';
import { getCommittees, storeMemberAccountsAndRankings } from '@/ducks';
import { deleteCommittee, changeLevelsCommittees } from '@/services/committees';
import { Button, NavBar, SortableFlatList, ButtonLayout, Icon } from '@/components';

const { height } = Dimensions.get('screen');

export const CommitteesAdmin = ({ navigation }) => {
	const mounted = useRef(false);
	const dispatch = useDispatch();
	const [orderedCommittees, setOrderedCommittees] = useState([]);
	const { committeesList } = useSelector(({ committees }) => committees);

	useEffect(() => {
		if (!mounted.current) {
			dispatch(getCommittees());
			dispatch(storeMemberAccountsAndRankings());
			mounted.current = true;
		}
		setOrderedCommittees(_.orderBy(committeesList, ['level'], ['asc']));
	}, [committeesList]);

	const renderCommittees = ({ item: committee, move, moveEnd, isActive }) => {
		const { containerStyle, contentStyle, textColor, buttonStyle } = styles;
		const color = isActive ? { backgroundColor: '#ffd70066' } : { backgroundColor: 'black' };

		return (
			<TouchableOpacity style = { [contentStyle, color] } onLongPress = { move } onPressOut = { moveEnd }>
				<View style = { containerStyle }>
					<Text style = { textColor }>{ committee.title }</Text>
				</View>
				<TouchableOpacity
					onPress = { () => navigation.push('CommitteeForm', { action: 'EDIT', committee }) }
					style = { buttonStyle }
				>
					<Icon style = { textColor } name = 'md-create' size = { 40 } />
				</TouchableOpacity>
				<TouchableOpacity onPress = { () => deleteCommittee(committee) } style = { buttonStyle }>
					<Icon style = { textColor } name = 'md-trash' size = { 40 } />
				</TouchableOpacity>
			</TouchableOpacity>
		);
	};

	return (
		<SafeAreaView style = { styles.page }>
			<NavBar title = 'Committees' back onBack = { () => navigation.pop() } />
			<View style = {{ flex: 1 }}>
				<SortableFlatList
					data = { orderedCommittees }
					keyExtractor = { (item, index) => index }
					renderItem = { renderCommittees }
					scrollPercent = { 5 }
					onMoveEnd = { ({ data }) => setOrderedCommittees(data) }
				/>
			</View>
			<ButtonLayout>
				<Button title = 'Set Order' onPress = { () => changeLevelsCommittees(orderedCommittees) } />
				<Button title = 'Add Committees' onPress = { () => navigation.push('CommitteeForm', { action: 'ADD' }) } />
			</ButtonLayout>
		</SafeAreaView>
	);
};

const styles = {
	containerStyle: {
		flex: 25,
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingVertical: 10,
		paddingHorizontal: 15
	},
	contentStyle: {
		flex: 1,
		height: height * 0.09,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	textColor: {
		color: '#e0e6ed'
	},
	buttonStyle: {
		flex: 5,
		justifyContent: 'center'
	},
	page: {
		flex: 1,
		backgroundColor: '#0c0b0b'
	}
};
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Input, Button, FilterList, ButtonLayout, MemberPanel } from '@/components';
import { assignPosition } from '@/services/members';
import { upsertCommittee } from '@/services/committees';

export const CommitteeForm = ({ navigation, route: { params: { action, committee } } }) => {
	const [error, setError] = useState('');
	const [committeeTitle, setCommitteeTitle] = useState(committee && committee.title);
	const [committeeDesc, setCommitteeDesc] = useState(committee && committee.description);
	const [chair, setChair] = useState(committee && committee.chair || {});
	const { allMemberAccounts, committeesList } = useSelector(({ members, committees }) => (
		{ ...members, ...committees }
	));

	const submitForm = () => {
		let level = Object.keys(committeesList || {}).length;
		let committee = { title: committeeTitle, description: committeeDesc };

		if (!committeeTitle) {
			setError('Please enter a title');
		}
		else if (!committeeDesc) {
			setError('Please enter description');
		}
		else {
			chair.id && assignPosition(committeeTitle, 'board', chair.id, committee.chair);
			upsertCommittee({ ...committee, chair, level });
			navigation.pop();
		}
	};

	const { formContainerStyle, headerStyle, headerTextStyle, scrollView, errorTextStyle } = styles;

	return (
		<SafeAreaView style = { formContainerStyle }>
			<View style = { headerStyle }>
				<Text style = { headerTextStyle }>{ action } COMMITTEE</Text>
			</View>
			<ScrollView style = { scrollView }>
				<Input placeholder = 'Committee Title' value = { committeeTitle } onChangeText = { setCommitteeTitle } />
				<Input placeholder = 'Committee Description' value = { committeeDesc } onChangeText = { setCommitteeDesc } />
				<FilterList
					data = { allMemberAccounts }
					value = { chair.id ? allMemberAccounts[chair.id] : null }
					placeholder = 'Director/Chairperson'
					regexFunc = { ({ firstName, lastName }) => `${firstName} ${lastName}` }
					selectBy = { member => member.id }
					onSelect = { setChair }
					itemJSX = { member => <MemberPanel member = { member } variant = 'General' /> }
				/>
				{ !!error && <Text style = { errorTextStyle }>{ error }</Text> }
			</ScrollView>
			<ButtonLayout>
				<Button title = 'Done' onPress = { submitForm } />
				<Button title = 'Cancel' onPress = { () => navigation.pop() } />
			</ButtonLayout>
		</SafeAreaView>
	);
};

const styles = {
	formContainerStyle: {
		flex: 1,
		backgroundColor: '#0c0b0b'
	},
	headerStyle: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 0.5
	},
	headerTextStyle: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#e0e6ed'
	},
	errorTextStyle: {
		fontSize: 14,
		alignSelf: 'center',
		color: 'red',
		fontWeight: 'bold',
		padding: 10
	},
	scrollView: {
		backgroundColor: 'black',
		height: '50%',
		paddingTop: 0,
		paddingBottom: 0,
		paddingLeft: '5%',
		paddingRight: '5%'
	}
};
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavBar, Button, ButtonLayout } from '@/components';
import _ from 'lodash';
import { Text, SafeAreaView,	Dimensions, View } from 'react-native';
import { getVotes, getPositions } from '@/ducks';
import { toggleElection, toggleApplications } from '@/services/elections';

const { height } = Dimensions.get('screen');

export const ElectionAdmin = ({ navigation }) => {
	const { election, votes, apply, numOfVotes, positions } = useSelector(({ elect }) => elect);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getVotes());
		dispatch(getPositions());
	}, []);

	const renderVotes = ([candidates, positionTitle]) => {
		const candidatesArray = _.orderBy(candidates, ['votes'], ['desc']);
		let winnerString = `${candidatesArray[0].firstName} ${candidatesArray[0].lastName}`;

		for (let i = 0; candidatesArray[i + 1] && candidatesArray[i].votes === candidatesArray[i + 1].votes; i++) {
			let nextCandidate = candidatesArray[i + 1];

			winnerString = `${winnerString}, ${nextCandidate.firstName} ${nextCandidate.lastName}`;
		}

		const { containerStyle, contentContainerStyle, textColor } = styles;

		return (
			<View style = { contentContainerStyle } key = { positionTitle }>
				<View style = { containerStyle }>
					<Text style = { [{ fontWeight: 'bold' }, textColor] }>{ positionTitle }: { winnerString }</Text>
				</View>
			</View>
		);
	};

	const electionActions = [
		<Button
			title = { (election ? 'Close' : 'Open') + ' Election' }
			onPress = { () => toggleElection(!election) }
		/>,
		<Button
			title = { (apply ? 'Close' : 'Open') + ' Applications' }
			onPress = { () => toggleApplications(!apply) }
		/>,
		<Button title = 'Manage Positions' onPress = { () => navigation.push('ElectionPositions') } />,
		<Button title = 'Manage Candidates' onPress = { () => navigation.push('ElectionCandidates') } />
	];

	const { content, buttonContainerStyling, page, textColor } = styles;
	const positionOrder = [];

	Object.entries(votes || {}).forEach(([positionTitle, candidates]) => {
		if (positions[positionTitle])
			positionOrder[positions[positionTitle].level] = [candidates, positionTitle];
	});

	return (
		<SafeAreaView style = { page }>
			<NavBar title = 'Election' back />
			<View style = { content }>
				<Text style = { textColor }>Total Votes: { numOfVotes }</Text>
			</View>
			<View style = {{ flex: 20 }}>
				{ positionOrder.map(position => renderVotes(position)) }
			</View>
			<ButtonLayout>
				{ electionActions.map(ElectionButton =>
					<View style = { buttonContainerStyling }>
						{ ElectionButton }
					</View>
				) }
			</ButtonLayout>
		</SafeAreaView>
	);
};

const styles = {
	content: {
		flex: 1,
		margin: 10
	},
	containerStyle: {
		flex: 25,
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingVertical: 10,
		paddingHorizontal: 15
	},
	contentContainerStyle: {
		margin: 1,
		height: height * 0.09,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	textColor: {
		color: '#e0e6ed'
	},
	page: {
		flex: 1,
		backgroundColor: 'black'
	}
};
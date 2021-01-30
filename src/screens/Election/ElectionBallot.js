import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Alert, Button, NavBar, ButtonLayout, Avatar, Icon } from '@/components';
import { getPositions, getVotes } from '@/ducks';
import { stockImg, truncateNames } from '@/utils/render';
import * as ElectionService from '@/services/elections';

export const ElectionBallot = ({ navigation }) => {
	const mounted = useRef(false);
	const hasVotesLoaded = useRef(false);
	const [selectedCandidates, setSelectedCandidates] = useState({});
	const [focusedCandidate, setFocusedCandidate] = useState({});
	const [isModalVisible, setModalVisibility] = useState(false);
	const dispatch = useDispatch();
	const {
		elect: { positions, votes },
		activeUser: { voted, id }
	} = useSelector(({ elect, user: { activeUser } }) => ({ elect, activeUser }));
	const { flex, mainBackground, secondaryBackground, center, titleStyle, textColor } = styles;
	const positionsArray = _.orderBy(positions, ['level'], ['asc']);

	useEffect(() => {
		if (!mounted.current) {
			dispatch(getVotes());
			dispatch(getPositions());
			mounted.current = true;
		}
		else if (voted && !hasVotesLoaded.current) {
			let votedForCandidates = {};

			Object.entries(votes).forEach(([position, candidates]) => {
				Object.entries(candidates).forEach(([candidate, candidateData]) => {
					if (candidateData[id]) votedForCandidates[position] = candidate;
				});
			});

			setSelectedCandidates(votedForCandidates);
			hasVotesLoaded.current = true;
		}
	}, [votes, voted]);

	const renderCandidatesList = ({ candidates, title }) => {
		const { mainBackground, goldBackground, spacing, positionContent } = styles;
		const candidateList = _.orderBy(candidates, ['lastName', 'firstName'], ['asc', 'asc']);

		if (candidateList.length > 0 && candidateList.some(candidate => candidate.approved)) {
			return (
				<View style = { [positionContent, center, { marginVertical: '5%' }] } key = { title }>
					<View style = { [spacing, goldBackground] }>
						<Text style = { titleStyle }>{ title }</Text>
					</View>
					<View style = { [spacing, mainBackground] }>
						{ candidateList.map(candidate => renderCandidate(candidate)) }
					</View>
				</View>
			);
		}
	};

	const renderCandidate = candidate => {
		const { candidateStyle, flex, centerItems } = styles;
		const [firstName, lastName] = truncateNames(candidate);
		const { id, position, approved, picture } = candidate;
		const isChecked = id === selectedCandidates[position];

		const updateSelection = () => {
			if (voted) {
				Alert.alert('You have already voted!');
			}
			else {
				setSelectedCandidates(isChecked
					? _.omit(selectedCandidates, position)
					: { ...selectedCandidates, position: id }
				);
			}
		};

		if (approved) {
			return (
				<View style = { [candidateStyle, flex] } key = { lastName }>
					<TouchableOpacity style = { center } onPress = { updateSelection }>
						<Icon
							type = 'FontAwesome'
							name = { isChecked ? 'check-circle-o' : 'circle-o' }
							color = { isChecked ? '#FECB00' : '#FFF' }
							size = { 30 }
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style = { [candidateStyle, flex] }
						onPress = { () => { setFocusedCandidate(candidate); setModalVisibility(true) } }
					>
						<View style = { [flex, centerItems] }>
							<Avatar size = { 50 } source = { picture || stockImg } />
						</View>
						<Text style = { [center, textColor, titleStyle, { flex: 1.5 }] }>
							{ firstName } { lastName }
						</Text>
						<View style = { [centerItems, { flex: 0.3 }] }>
							<Icon name = 'chevron-forward-circle-outline' size = { 22 } color = '#FECB00' />
						</View>
					</TouchableOpacity>
				</View>
			);
		}
	};

	const renderModal = () => {
		const { firstName, lastName, picture, plan } = focusedCandidate;
		const { modalBackground, modalContent, planStyle, closeModalBar } = styles;

		return (
			<Modal transparent visible = { isModalVisible } animationType = 'slide'>
				<View style = { modalBackground }>
					<TouchableOpacity
						style = { closeModalBar }
						onPress = { () => { setModalVisibility(false); setFocusedCandidate({}) } }
					>
						<Icon name = 'close-circle' size = { 40 } color = 'white' />
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
	};

	const submitVote = () => {
		if (_.isEmpty(selectedCandidates)) {
			Alert.alert('Please vote for at least one candidate!');
		}
		else {
			ElectionService.vote(selectedCandidates);
			navigation.pop();
		}
	};

	return (
		<SafeAreaView style = { [flex, mainBackground] }>
			<NavBar title = 'Positions' back />
			<ScrollView style = { [secondaryBackground] }>
				{ positionsArray.map(position => renderCandidatesList(position)) }
			</ScrollView>
			{ !voted && <ButtonLayout>
				<Button title = 'Submit' onPress = { submitVote } />
				<Button title = 'Cancel' onPress = { () => navigation.pop() } />
			</ButtonLayout> }
			{ renderModal() }
		</SafeAreaView>
	);
};

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
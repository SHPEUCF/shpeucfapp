import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { FlatList, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Input, NavBar, ButtonLayout, Avatar, Icon } from '@/components';
import { openGallery } from '@/utils/render';
import { getPositions } from '@/ducks';
import * as ElectionService from '@/services/elections';

export const ElectionApplication = ({ navigation }) => {
	const mounted = useRef(false);
	const dispatch = useDispatch();
	const [candidatePicture, setPicture] = useState('');
	const [candidatePosition, setPosition] = useState('');
	const [candidatePlan, setPlan] = useState('');
	const [applying, setApplying] = useState(false);
	const {
		positions,
		activeUser: { id, applied, firstName, lastName, picture }
	} = useSelector(({ elect: { positions }, user: { activeUser } }) => ({ positions, activeUser }));

	useEffect(() => {
		if (!mounted.current) {
			dispatch(getPositions());
			mounted.current = true;
		}
		else if (applied) {
			Object.values(positions || {}).forEach(({ candidates }) => {
				Object.values(candidates || {}).forEach(candidate => {
					if (candidate.id === id) {
						setPlan(candidate.plan);
						setPicture(candidate.picture);
						setPosition(candidate.position);
					}
				});
			});
		}
	}, [positions]);

	const { titleStyle, inputContainer, column } = styles;

	const showApplication = () => (
		<View style = { [fullFlex, column] }>
			<Text style = { [fontLarge, textColor, titleStyle] }>{ candidatePosition }</Text>
			<Avatar
				size = { 200 }
				title = 'Add Image'
				titleStyle = { fontLarge }
				source = { candidatePicture }
				onPress = { () => openGallery(`/election/positions/${candidatePosition}/candidates/${id}`, '', url => setPicture(url)) }
				showEdit
			/>
			<Text style = { [fontLarge, textColor] }>
				{ firstName } { lastName }
			</Text>
			<Input
				value = { candidatePlan }
				placeholder = 'Please write your plan for members to read.'
				onChangeText = { plan => setPlan(plan) }
				style = { inputContainer }
				textAlignVertical = 'top'
				maxLength = { 500 }
				numberOfLines = { 10 }
				blurOnSubmit
				multiline
			/>
		</View>
	);

	const { fontLarge, fontSmall, fontBold, textColor, positionContainer, iconContainer } = styles;

	const renderPositionComponent = ({ title, description }) => (
		<TouchableOpacity
			onPress = { () => { setApplying(true); setPosition(title) } }
			style = { [positionContainer, fullFlex] }
		>
			<View style = { fullFlex }>
				<Text style = { [fontLarge, textColor, fontBold] }>{ title }</Text>
				<Text style = { [fontSmall, textColor] }>{ description }</Text>
			</View>
			<Icon
				type = 'MaterialIcons'
				name = 'assignment'
				color = '#FECB00'
				size = { 35 }
				style = { iconContainer }
			/>
		</TouchableOpacity>
	);

	const { page, fullFlex } = styles;
	const positionsArray = _.orderBy(positions, ['level'], ['asc']);
	const candidate = {
		firstName,
		lastName,
		plan: candidatePlan,
		position: candidatePosition,
		picture: candidatePicture || picture
	};

	return (
		<KeyboardAwareScrollView
			style = {{ backgroundColor: '#0c0b0b' }}
			resetScrollToCoords = {{ x: 0, y: 0 }}
			contentContainerStyle = {{ height: '100%' }}
			scrollEnabled = { false }
			enableOnAndroid = { false }
		>
			<SafeAreaView style = { [page, fullFlex] }>
				<NavBar title = 'Positions' back />
				<View style = { fullFlex }>
					{ (applying || applied)
						? showApplication()
						: <FlatList
							data = { positionsArray }
							keyExtractor = { (item, index) => index }
							renderItem = { ({ item }) => renderPositionComponent(item) }
						/> }
				</View>
				<ButtonLayout>
					{ (applying || applied) && <Button
						title = { 'Submit ' + (applied && 'Changes' || 'Application') }
						onPress = { () => {
							ElectionService.editApplication({ ...candidate, applied });
							navigation.pop();
						} }
					/> }
					<Button title = 'Cancel' onPress = { () => applying ? setApplying(false) : navigation.pop() } />
				</ButtonLayout>
			</SafeAreaView>
		</KeyboardAwareScrollView>
	);
};

const styles = {
	fontLarge: {
		fontSize: 20
	},
	fontSmall: {
		fontSize: 13
	},
	fontBold: {
		fontWeight: 'bold'
	},
	column: {
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	textColor: {
		color: '#e0e6ed'
	},
	page: {
		backgroundColor: 'black',
		paddingLeft: 10,
		paddingRight: 10
	},
	fullFlex: {
		flex: 1
	},
	inputContainer: {
		maxHeight: 250,
		width: '80%'
	},
	positionContainer: {
		paddingTop: '8%',
		paddingBottom: '5%',
		borderBottomColor: '#FFFA',
		borderBottomWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 30
	},
	titleStyle: {
		fontWeight: 'bold',
		fontSize: 30
	},
	iconContainer: {
		flex: 0.15,
		paddingLeft: 20
	}
};
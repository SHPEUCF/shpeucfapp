import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Router from './router/Router';
import { View, LogBox } from 'react-native';
import { Alert } from './components';
import {
	initializeFirebase,
	logoutUser,
	verifyAppVersion,
	userStatus,
	loadUser,
	getAllMemberAccounts,
	getEvents,
	getCommittees,
	getAllMemberPoints,
	updateElection
} from './ducks';

LogBox.ignoreAllLogs(true);

export default () => {
	const { isLoggedIn, hasCorrectVersion } = useSelector(state => state.app);
	const mounted = useRef();
	const store = useStore();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!mounted.current) {
			initializeFirebase();
			dispatch(userStatus());
			dispatch(verifyAppVersion()).then(() => verifyLogin());
			mounted.current = true;
		}
		else {
			verifyLogin();
		}
	}, [dispatch, isLoggedIn]);

	const verifyLogin = () => {
		const { isLoggedIn, hasCorrectVersion } = store.getState().app;

		if (isLoggedIn && hasCorrectVersion) {
			dispatch(loadUser());
			dispatch(getEvents());
			dispatch(getCommittees());
			dispatch(updateElection());
			dispatch(getAllMemberPoints());
			dispatch(getAllMemberAccounts());
		}
		else {
			if (isLoggedIn) logoutUser();
			if (!hasCorrectVersion) Alert.alert('Please update your app');
		}
	};

	return (
		<View style = {{ flex: 1 }}>
			<Router isLoggedIn = { isLoggedIn && hasCorrectVersion } />
			<Alert.AlertBox />
		</View>
	);
};
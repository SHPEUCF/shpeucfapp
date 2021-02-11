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
	storeMemberAccountsandRankings,
	storeAllMemberPoints,
	getEvents,
	getCommittees,
	updateElection
} from './ducks';

LogBox.ignoreAllLogs(true);

console.error = () => null;
console.warn = () => null;

export const App = () => {
	const { isLoggedIn, hasCorrectVersion } = useSelector(state => state.app);
	const mounted = useRef();
	const dispatch = useDispatch();
	const store = useStore();
	const initRoutine = [
		loadUser,
		getEvents,
		getCommittees,
		updateElection,
		storeMemberAccountsandRankings,
		storeAllMemberPoints
	];

	useEffect(() => {
		if (!mounted.current) {
			initializeFirebase();
			dispatch(userStatus());
			dispatch(verifyAppVersion()).then(() => {
				const { isLoggedIn, hasCorrectVersion } = store.getState().app;

				if (isLoggedIn && hasCorrectVersion) initRoutine.forEach(initFunction => dispatch(initFunction()));
				else if (isLoggedIn && !hasCorrectVersion) logoutUser();

				if (!hasCorrectVersion) Alert.alert('Please update your app');
			});
			mounted.current = true;
		}
		else if (hasCorrectVersion && isLoggedIn) {
			initRoutine.forEach(initFunction => dispatch(initFunction()));
		}
	}, [isLoggedIn, hasCorrectVersion]);

	return (
		<View style = {{ flex: 1 }}>
			<Router isLoggedIn = { isLoggedIn } />
			<Alert.AlertBox />
		</View>
	);
};
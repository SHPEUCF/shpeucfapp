import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouterTabs } from './RouterTabs';
import {
	/* General   */ About, Dashboard, Leaderboard, More,
	/* User      */ Login, OtherProfile, PointsBreakDown, Profile, ResetPassword,
	/* Admin     */ AdminHub, CommitteesAdmin, ElectionAdmin, MemberAdmin,
	/* Election  */ ElectionApplication, ElectionBallot, ElectionCandidates, ElectionPositions,
	/* Committee */ Committees,
	/* Events    */ Events, EventDetails,
	/* Forms     */ CommitteeForm, PositionForm
} from '@/screens';

const MainTabs = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const DashboardStack = createStackNavigator();
const EventsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const MoreStack = createStackNavigator();

const DashboardStackNavigator = () => (
	<DashboardStack.Navigator screenOptions = {{ headerShown: false }}>
		<DashboardStack.Screen name = 'Dashboard' component = { Dashboard } />
		<DashboardStack.Screen name = 'Committees' component = { Committees } />
		<DashboardStack.Screen name = 'EventDetails' component = { EventDetails } />
		<DashboardStack.Screen name = 'Leaderboard' component = { Leaderboard } />
		<DashboardStack.Screen name = 'OtherProfile' component = { OtherProfile } />
	</DashboardStack.Navigator>
);

const EventsStackNavigator = () => (
	<EventsStack.Navigator screenOptions = {{ headerShown: false }}>
		<EventsStack.Screen name = 'Events' component = { Events } />
		<EventsStack.Screen name = 'EventDetails' component = { EventDetails } />
		<EventsStack.Screen name = 'OtherProfile' component = { OtherProfile } />
	</EventsStack.Navigator>
);

const ProfileStackNavigator = () => (
	<ProfileStack.Navigator screenOptions = {{ headerShown: false }}>
		<ProfileStack.Screen name = 'Profile' component = { Profile } />
		<ProfileStack.Screen name = 'PointsBreakDown' component = { PointsBreakDown } />
	</ProfileStack.Navigator>
);

const MoreStackNavigator = () => (
	<MoreStack.Navigator screenOptions = {{ headerShown: false }}>
		<MoreStack.Screen name = 'More' component = { More } />
		<MoreStack.Screen name = 'Leaderboard' component = { Leaderboard } />
		<MoreStack.Screen name = 'ElectionApplication' component = { ElectionApplication } />
		<MoreStack.Screen name = 'ElectionBallot' component = { ElectionBallot } />
		<MoreStack.Screen name = 'Committees' component = { Committees } />
		<MoreStack.Screen name = 'CommitteeForm' component = { CommitteeForm } />
		<MoreStack.Screen name = 'PositionForm' component = { PositionForm } />
		<MoreStack.Screen name = 'About' component = { About } />
		<MoreStack.Screen name = 'AdminHub' component = { AdminHub } />
		<MoreStack.Screen name = 'CommitteesAdmin' component = { CommitteesAdmin } />
		<MoreStack.Screen name = 'MemberAdmin' component = { MemberAdmin } />
		<MoreStack.Screen name = 'ElectionAdmin' component = { ElectionAdmin } />
		<MoreStack.Screen name = 'ElectionCandidates' component = { ElectionCandidates } />
		<MoreStack.Screen name = 'ElectionPositions' component = { ElectionPositions } />
		<MoreStack.Screen name = 'OtherProfile' component = { OtherProfile } />
	</MoreStack.Navigator>
);

export default ({ isLoggedIn }) => (
	<NavigationContainer>
		{ !isLoggedIn
			? <AuthStack.Navigator screenOptions = {{ headerShown: false }}>
				<AuthStack.Screen name = 'Login' component = { Login } />
				<AuthStack.Screen name = 'ResetPassword' component = { ResetPassword } />
			</AuthStack.Navigator>
			: <MainTabs.Navigator tabBar = { props => <RouterTabs { ...props } /> }>
				<MainTabs.Screen name = 'Dashboard' component = { DashboardStackNavigator } />
				<MainTabs.Screen name = 'Events' component = { EventsStackNavigator } />
				<MainTabs.Screen name = 'Profile' component = { ProfileStackNavigator } />
				<MainTabs.Screen name = 'More' component = { MoreStackNavigator } />
			</MainTabs.Navigator>
		}
	</NavigationContainer>
);
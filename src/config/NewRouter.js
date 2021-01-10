import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
	/* General   */ About, Dashboard, Leaderboard, More,
	/* User      */ Login, OtherProfile, PointsBreakDown, Profile, ResetPassword,
	/* Admin     */ AdminHub, CommitteesAdmin, ElectionAdmin, MemberAdmin,
	/* Election  */ ElectionApplication, ElectionBallot, ElectionCandidates, ElectionPositions,
	/* Committee */ CommitteePage, Committees,
	/* Events    */ Events, EventDetails
} from '@/screens';

const Stack = createStackNavigator();

export default () => (
	<NavigationContainer>
		<Stack.Navigator>
			<Stack.Screen name = 'Home' component = { Login } />
		</Stack.Navigator>
	</NavigationContainer>
);
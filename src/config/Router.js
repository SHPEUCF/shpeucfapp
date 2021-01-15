/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Router, Scene, Stack, ActionConst } from 'react-native-router-flux';
import { Spinner, Icon } from '@/components/general';
import CandidateForm from '@/components/elect/CandidateForm';
import PositionForm from '@/components/elect/PositionForm';
import CommitteeForm from '@/components/general/CommitteeForm';

/** All Screen Imports grouped by folder **/

/** Import Admin **/
import {
	AdminHub,
	CommitteesAdmin,
	ElectionAdmin,
	MemberAdmin
} from '@/screens';

/** Import Committees **/
import {
	CommitteePage,
	Committees
} from '@/screens';

/** Import Election **/
import {
	ElectionApplication,
	ElectionBallot,
	ElectionCandidates,
	ElectionPositions
} from '@/screens';

/** Import Events **/
import {
	Events,
	EventDetails
} from '@/screens';

/** Import General  **/
import {
	About,
	Dashboard,
	Leaderboard,
	More,
	Splash,
	Welcome
} from '@/screens';

/** Import User **/
import {
	Login,
	OtherProfile,
	PointsBreakDown,
	Profile,
	ResetPassword
} from '@/screens';

import { Dimensions } from 'react-native';

const dimension = Dimensions.get('screen');

const RouterComponent = () => {
	return (
		<Router>
			<Stack key = "root" hideNavBar>
				<Scene
					key = "splash"
					component = { Splash }
					title = "Splash"
					type = { ActionConst.REPLACE }
					hideNavBar
				/>
				<Scene
					key = "welcome"
					component = { Welcome }
					title = "Welcome"
					type = { ActionConst.REPLACE }
					hideNavBar
				/>
				<Stack key = "auth">
					<Scene
						key = 'loading'
						component = { Spinner }
						type = { ActionConst.REPLACE }
						hideNavBar
					/>
					<Scene
						key = 'login'
						component = { Login }
						title = 'Login'
						type = { ActionConst.REPLACE }
						hideNavBar
					/>
					<Scene
						key = 'resetPassword'
						component = { ResetPassword }
						title = 'Reset Password'
						type = { ActionConst.REPLACE }
						hideNavBar
					/>
				</Stack>
				<Stack key = 'election' hideNavBar>
					<Scene
						key = 'ElectionCandidates'
						component = { ElectionCandidates }
						title = 'Election Candidates'
						type = { ActionConst.REPLACE }
						hideNavBar
					/>
					<Scene
						key = 'CandidateForm'
						component = { CandidateForm }
						title = 'Candidate Forms'
						type = { ActionConst.REPLACE }
						hideNavBar
					/>
					<Scene
						key = 'ElectionPositions'
						component = { ElectionPositions }
						title = 'Election Positions'
						type = { ActionConst.REPLACE }
						hideNavBar
					/>
					<Scene
						key = 'PositionForm'
						component = { PositionForm }
						title = 'Position Forms'
						type = { ActionConst.REPLACE }
						hideNavBar
					/>
					<Scene
						key = 'CommitteeForm'
						component = { CommitteeForm }
						title = 'Committee Forms'
						type = { ActionConst.REPLACE }
						hideNavBar
					/>
				</Stack>
				<Stack
					key = 'main'
					tabs
					tabBarPosition = 'bottom'
					type = { ActionConst.RESET }
					activeTintColor = { '#E0E6ED' }
					inactiveTintColor = { '#C0CCDA' }
					tabBarStyle = {{ backgroundColor: '#21252b', height: dimension.height * 0.08 }}
				>
					<Stack
						hideNavBar
						key = 'dashboard'
						title = 'Dashboard'
						tabBarIcon = { ({	focused	}) =>
							<Icon
								name = { 'newspaper' }
								size = { 30 }
								style = { focused ? { color: '#FFC107' } : { color: 'white' } }
							/> }
					>
						<Scene
							key = 'dashboard'
							component = { Dashboard }
							title = 'dashboard'
							leftTitle = 'Back'
						/>
						<Stack
							hideNavBar
							key = 'CommitteePageD'
							title = 'CommitteesPage'
						>
							<Scene
								key = 'CommitteePageD'
								component = { CommitteePage }
								title = 'CommitteePage'
								hideTabBar
							/>
							<Stack
								key = 'eventDetailsCPD'
								title = 'EventDetails'
								hideNavBar
								hideTabBar = { true }
							>
								<Scene
									key = 'eventDetailsCPD'
									component = { EventDetails }
									title = 'Event Details'
								/>
								<Scene
									key = 'OtherProfileCPD'
									component = { OtherProfile }
								/>
							</Stack>
						</Stack>
						<Stack
							hideNavBar
							key = 'LeaderboardD'
							title = 'Leaderboard'
						>
							<Scene
								key = 'LeaderboardD'
								component = { Leaderboard }
								title = 'leaderboard'
								hideTabBar
							/>
							<Scene
								key = 'OtherProfileD'
								component = { OtherProfile }
								hideTabBar
								hideNavBar
							/>
						</Stack>
						<Stack
							key = 'CommitteesD'
							title = 'Committees'
						>
							<Scene
								key = 'CommitteesD'
								component = { Committees }
								title = 'Committees'
								hideTabBar
								hideNavBar
							/>
						</Stack>
						<Stack
							key = 'eventDetailsD'
							title = 'EventDetails'
							hideNavBar
							hideTabBar = { true }
						>
							<Scene
								key = 'eventDetailsD'
								component = { EventDetails }
								title = 'Event Details'
							/>
							<Scene
								key = 'OtherProfileD'
								component = { OtherProfile }
							/>
						</Stack>
					</Stack>
					<Stack
						key = 'event'
						hideNavBar
						title = 'Events'
						tabBarIcon = { ({ focused }) =>
							<Icon
								name = { 'calendar' }
								size = { 30 }
								style = { focused ? { color: '#FFC107' } : { color: 'white' } }
							/> }
					>
						<Scene
							key = 'event'
							component = { Events }
							title = 'Profile'
							leftTitle = 'Back'
						/>
						<Stack
							key = 'eventDetails'
							hideNavBar
							title = 'EventDetails'
							hideTabBar
						>
							<Scene
								key = 'eventDetails'
								component = { EventDetails }
								title = 'Event Details'
							/>
							<Scene
								key = 'OtherProfileE'
								component = { OtherProfile }
								hideTabBar
								hideNavBar
							/>
						</Stack>
					</Stack>
					<Stack
						hideNavBar
						key = 'profile'
						title = 'Profile'
						tabBarIcon = { ({ focused	}) =>
							<Icon
								name = { 'person' }
								size = { 30 }
								style = { focused ? { color: '#FFC107' } : { color: 'white' } }
							/> }
					>
						<Scene
							key = 'profile'
							component = { Profile }
							title = 'Profile'
							leftTitle = 'Back'
						/>
						<Scene
							key = 'pointsBreakDown'
							component = { PointsBreakDown }
							title = 'Points'
							hideNavBar
						/>
					</Stack>
					<Stack
						hideNavBar
						key = 'more'
						title = 'More'
						tabBarIcon = { ({ focused	}) =>
							<Icon
								name = { 'menu' }
								size = { 30 }
								style = { focused ? { color: '#FFC107' } : { color: 'white' } }
							/> }
					>
						<Scene
							key = 'more'
							component = { More }
							title = 'More'
							leftTitle = 'Back'
						/>
						<Scene
							key = 'Leaderboard'
							component = { Leaderboard }
							title = 'leaderboard'
							hideTabBar
						/>
						<Stack
							hideNavBar
							key = 'LeaderboardM'
							title = 'Leaderboard'
						>
							<Scene
								key = 'LeaderboardM'
								component = { Leaderboard }
								title = 'leaderboard'
								hideTabBar
							/>
							<Scene
								key = 'OtherProfileM'
								component = { OtherProfile }
								hideTabBar
								hideNavBar
							/>
						</Stack>
						<Stack
							key = 'AdminHub'
							title = 'AdminHub'
							hideNavBar
							hideTabBar
						>
							<Scene
								key = 'AdminHub'
								component = { AdminHub }
							/>
							<Scene
								key = 'ElectionAdmin'
								component = { ElectionAdmin }
								title = 'Election'
								hideTabBar
							/>
							<Scene
								key = 'CommitteesAdmin'
								component = { CommitteesAdmin }
								title = 'Committees'
								hideTabBar
							/>
							<Scene
								key = 'MemberAdmin'
								component = { MemberAdmin }
								title = 'Members'
								hideTabBar
							/>
						</Stack>
						<Scene
							key = 'ElectionApplication'
							component = { ElectionApplication }
							hideTabBar
							hideNavBar
						/>
						<Scene
							key = 'ElectionBallot'
							component = { ElectionBallot }
							title = 'Ballot'
							hideTabBar
							hideNavBar
						/>
						<Stack
							hideNavBar
							key = 'Committees'
							title = 'Committees'
						>
							<Scene
								key = 'Committees'
								component = { Committees }
								title = 'Committees'
								hideTabBar
							/>
							<Stack
								hideNavBar
								key = 'CommitteePageC'
								title = 'CommitteesPage'
							>
								<Scene
									key = 'CommitteePageC'
									component = { CommitteePage }
									title = 'CommitteePage'
									hideTabBar
								/>
								<Stack
									key = 'eventDetailsC'
									title = 'EventDetails'
									hideNavBar
									hideTabBar = { true }
								>
									<Scene
										key = 'eventDetailsC'
										component = { EventDetails }
										title = 'Event Details'
									/>
									<Scene
										key = 'OtherProfileC'
										component = { OtherProfile }
									/>
								</Stack>
							</Stack>
						</Stack>
						<Scene
							hideTabBar
							key = 'About'
							component = { About }
							title = 'About'
						/>
					</Stack>
				</Stack>
			</Stack>
		</Router>
	);
};

export default RouterComponent;
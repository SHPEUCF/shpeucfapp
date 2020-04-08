/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Router, Scene, Stack, ActionConst } from "react-native-router-flux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Spinner } from "../components/general";
import RegistrationForm from "../components/auth/RegistrationForm";
import EditProfileForm from "../components/auth/EditProfileForm";
import LoginForm from "../components/auth/LoginForm";
import CreateEvent from "../components/event/CreateEvent";
import EventDetailsForm from "../components/event/EventDetails";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";
import CandidateForm from "../components/elect/CandidateForm";
import PositionForm from "../components/elect/PositionForm";
import CommitteeForm from "../components/general/CommitteeForm";

/** All Screen Imports grouped by folder **/

/** Import Admin **/
import {
	AdminHub,
	CommitteesAdmin,
	ElectionAdmin
} from "../screens";

/** Import Committees **/
import {
	CommitteePage,
	Committees
} from "../screens";

/** Import Election **/
import {
	Election,
	ElectionApplication,
	ElectionBallot,
	ElectionCandidates,
	ElectionPositions
} from "../screens";

/** Import Events **/
import {
	Events
} from "../screens";

/** Import General  **/
import {
	About,
	Dashboard,
	Leaderboard,
	More
} from "../screens";

/** Import User **/
import {
	OtherProfile,
	PointsBreakDown,
	Profile
} from "../screens";

import { Dimensions } from "react-native";

const dimension = Dimensions.get("window");

const RouterComponent = () => {
	return (
		<Router>
			<Stack key = "root" hideNavBar>
				<Stack key = "auth">
					<Scene
						key = "loading"
						component = { Spinner }
						type = { ActionConst.REPLACE }
						hideNavBar
					/>
					<Scene
						key = "login"
						component = { LoginForm }
						title = "Login"
						type = { ActionConst.REPLACE }
						hideNavBar
					/>
					<Scene
						key = "registration"
						component = { RegistrationForm }
						title = "Create Account"
						type = { ActionConst.REPLACE }
						hideNavBar
					/>
					<Scene
						key = "resetPassword"
						component = { ResetPasswordForm }
						title = "Reset Password"
						type = { ActionConst.REPLACE }
						hideNavBar
					/>
				</Stack>
				<Stack key = "election" hideNavBar>
					<Scene
						key = "ElectionCandidates"
						component = { ElectionCandidates }
						title = "Election Candidates"
						type = { ActionConst.REPLACE }
						hideNavBar
					/>
					<Scene
						key = "CandidateForm"
						component = { CandidateForm }
						title = "Candidate Forms"
						type = { ActionConst.REPLACE }
						hideNavBar
					/>
					<Scene
						key = "ElectionPositions"
						component = { ElectionPositions }
						title = "Election Positions"
						type = { ActionConst.REPLACE }
						hideNavBar
					/>
					<Scene
						key = "PositionForm"
						component = { PositionForm }
						title = "Position Forms"
						type = { ActionConst.REPLACE }
						hideNavBar
					/>
					<Scene
						key = "CommitteeForm"
						component = { CommitteeForm }
						title = "Committee Forms"
						type = { ActionConst.REPLACE }
						hideNavBar
					/>
				</Stack>
				<Stack
					key = "main"
					tabs
					tabBarPosition = "bottom"
					type = { ActionConst.RESET }
					activeTintColor = { "#E0E6ED" }
					inactiveTintColor = { "#C0CCDA" }
					tabBarStyle = {{ backgroundColor: "#21252b", height: dimension.height * 0.08 }}
				>
					<Stack
						hideNavBar
						key = "dashboard"
						title = "Dashboard"
						tabBarIcon = { ({	focused	}) =>
							<Ionicons
								name = { "ios-paper" }
								size = { 30 }
								style = { focused ? { color: "#FFC107" } : { color: "white" } }
							/> }
					>
						<Scene
							key = "dashboard"
							component = { Dashboard }
							title = "dashboard"
							leftTitle = "Back"
						/>
						<Stack
							hideNavBar
							key = "CommitteePageD"
							title = "CommitteesPage"
						>
							<Scene
								key = "CommitteePageD"
								component = { CommitteePage }
								title = "CommitteePage"
								hideTabBar
							/>
							<Scene
								key = "createEventCPD"
								component = { CreateEvent }
								title = "Event Creation"
							/>
							<Stack
								key = "eventDetailsCPD"
								title = "EventDetails"
								hideNavBar
								hideTabBar = { true }
							>
								<Scene
									key = "eventDetailsCPD"
									component = { EventDetailsForm }
									title = "Event Details"
								/>
								<Scene
									key = "OtherProfileCPD"
									component = { OtherProfile }
								/>
							</Stack>
						</Stack>
						<Stack
							hideNavBar
							key = "LeaderboardD"
							title = "Leaderboard"
						>
							<Scene
								key = "LeaderboardD"
								component = { Leaderboard }
								title = "leaderboard"
								hideTabBar
							/>
							<Scene
								key = "OtherProfileD"
								component = { OtherProfile }
								hideTabBar
								hideNavBar
							/>
						</Stack>
						<Stack
							key = "CommitteesD"
							title = "Committees"
						>
							<Scene
								key = "CommitteesD"
								component = { Committees }
								title = "Committees"
								hideTabBar
								hideNavBar
							/>
						</Stack>
						<Stack
							key = "eventDetailsD"
							title = "EventDetails"
							hideNavBar
							hideTabBar = { true }
						>
							<Scene
								key = "eventDetailsD"
								component = { EventDetailsForm }
								title = "Event Details"
							/>
							<Scene
								key = "OtherProfileD"
								component = { OtherProfile }
							/>
							<Scene
								key = "createEventD"
								component = { CreateEvent }
								title = "Event Creation"
							/>
						</Stack>
					</Stack>
					<Stack
						key = "event"
						hideNavBar
						title = "Events"
						tabBarIcon = { ({ focused }) =>
							<Ionicons
								name = { "ios-calendar" }
								size = { 30 }
								style = { focused ? { color: "#FFC107" } : { color: "white" } }
							/> }
					>
						<Scene
							key = "event"
							component = { Events }
							title = "Profile"
							leftTitle = "Back"
						/>
						<Scene
							key = "createEventE"
							component = { CreateEvent }
							title = "Event Creation"
							hideNavBar
							hideTabBar
						/>
						<Stack
							key = "eventDetails"
							hideNavBar
							title = "EventDetails"
						>
							<Scene
								key = "eventDetails"
								component = { EventDetailsForm }
								title = "Event Details"
							/>
							<Scene
								key = "OtherProfileE"
								component = { OtherProfile }
								hideTabBar
								hideNavBar
							/>
						</Stack>
					</Stack>
					<Stack
						hideNavBar
						key = "profile"
						title = "Profile"
						tabBarIcon = { ({ focused	}) =>
							<Ionicons
								name = { "ios-person" }
								size = { 30 }
								style = { focused ? { color: "#FFC107" } : { color: "white" } }
							/> }
					>
						<Scene
							key = "profile"
							component = { Profile }
							title = "Profile"
							leftTitle = "Back"
						/>
						<Scene
							key = "EditProfileForm"
							component = { EditProfileForm }
							hideNavBar
							hideTabBar
						/>
						<Scene
							key = "pointsBreakDown"
							component = { PointsBreakDown }
							title = "Points"
							hideNavBar
						/>
					</Stack>
					<Stack
						hideNavBar
						key = "more"
						title = "More"
						tabBarIcon = { ({ focused	}) =>
							<Ionicons
								name = { "ios-menu" }
								size = { 30 }
								style = { focused ? { color: "#FFC107" } : { color: "white" } }
							/> }
					>
						<Scene
							key = "more"
							component = { More }
							title = "More"
							leftTitle = "Back"
						/>
						<Scene
							key = "Leaderboard"
							component = { Leaderboard }
							title = "leaderboard"
							hideTabBar
						/>
						<Stack
							hideNavBar
							key = "LeaderboardM"
							title = "Leaderboard"
						>
							<Scene
								key = "LeaderboardM"
								component = { Leaderboard }
								title = "leaderboard"
								hideTabBar
							/>
							<Scene
								key = "OtherProfileM"
								component = { OtherProfile }
								hideTabBar
								hideNavBar
							/>
						</Stack>
						<Stack
							key = "AdminHub"
							title = "AdminHub"
							hideNavBar
							hideTabBar
						>
							<Scene
								key = "AdminHub"
								component = { AdminHub }
							/>
							<Scene
								key = "ElectionAdmin"
								component = { ElectionAdmin }
								title = "Election"
								hideTabBar
							/>
							<Scene
								key = "CommitteesAdmin"
								component = { CommitteesAdmin }
								title = "Committees"
								hideTabBar
							/>
						</Stack>
						<Scene
							key = "ElectionApplication"
							component = { ElectionApplication }
							hideTabBar
							hideNavBar
						/>
						<Scene
							key = "ElectionBallot"
							component = { ElectionBallot }
							title = "Ballot"
							hideTabBar
							hideNavBar
						/>
						<Scene
							key = "Election"
							component = { Election }
							title = "Election"
							hideTabBar
						/>
						<Stack
							hideNavBar
							key = "Committees"
							title = "Committees"
						>
							<Scene
								key = "Committees"
								component = { Committees }
								title = "Committees"
								hideTabBar
							/>
							<Stack
								hideNavBar
								key = "CommitteePageC"
								title = "CommitteesPage"
							>
								<Scene
									key = "CommitteePageC"
									component = { CommitteePage }
									title = "CommitteePage"
									hideTabBar
								/>
								<Scene
									key = "createEventC"
									component = { CreateEvent }
									title = "Event Creation"
								/>
								<Stack
									key = "eventDetailsC"
									title = "EventDetails"
									hideNavBar
									hideTabBar = { true }
								>
									<Scene
										key = "eventDetailsC"
										component = { EventDetailsForm }
										title = "Event Details"
									/>
									<Scene
										key = "OtherProfileC"
										component = { OtherProfile }
									/>
								</Stack>
							</Stack>
						</Stack>
						<Scene
							hideTabBar
							key = "About"
							component = { About }
							title = "About"
						/>
					</Stack>
				</Stack>
			</Stack>
		</Router>
	);
};

export default RouterComponent;
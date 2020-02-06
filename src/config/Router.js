/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Router, Scene, Stack, ActionConst } from "react-native-router-flux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Spinner } from "../components/general";
import RegistrationForm from "../components/auth/RegistrationForm";
import EditProfileForm from "../components/auth/EditProfileForm";
import EditOtherProfileForm from "../components/auth/EditOtherProfileForm";
import LoginForm from "../components/auth/LoginForm";
import CreateEvent from "../components/event/CreateEvent";
import EventDetailsForm from "../components/event/EventDetails";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";
import CandidateForm from "../components/elect/CandidateForm";
import PositionForm from "../components/elect/PositionForm";
import CommitteeForm from "../components/general/CommitteeForm";
import { WebPageShow } from "../components/general";

// Screens
// Profile is separate temporarily due to default export from redux connect

/* look at this page https://github.com/aksonov/react-native-router-flux/issues/2121
to set button on the navBar */
import Events from "../screens/Events";
import Profile from "../screens/Profile";
import OtherProfile from "../screens/OtherProfile";
import Leaderboard from "../screens/Leaderboard";
import CommitteesBackEnd from "../screens/CommitteesBackEnd";
import CommitteePage from "../screens/CommitteePage";
import Election from "../screens/Election";
import Committees from "../screens/Committees";
import ElectionApplication from "../screens/ElectionApplication";
import BackEnd from "../screens/BackEnd";
import ElectionBallot from "../screens/ElectionBallot";
import ElectionBackEnd from "../screens/ElectionBackEnd";
import ElectionPositions from "../screens/ElectionPositions";
import ElectionCandidates from "../screens/ElectionCandidates";
import More from "../screens/More";
import PointsBreakDown from "../screens/PointsBreakDown";
import Dashboard from "../screens/Dashboard";
import { Dimensions } from "react-native";
import { Resources, Forms, About, EBoard, Version } from "../screens/";

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
							key = "BackEnd"
							title = "BackEnd"
							hideNavBar
							hideTabBar
						>
							<Scene
								key = "BackEnd"
								component = { BackEnd }
							/>
							<Scene
								key = "ElectionBackEnd"
								component = { ElectionBackEnd }
								title = "Election"
								hideTabBar
							/>
							<Scene
								key = "CommitteesBackEnd"
								component = { CommitteesBackEnd }
								title = "Committees"
								hideTabBar
							/>
						</Stack>
						<Scene
							key = "EditOtherProfileForm"
							component = { EditOtherProfileForm }
							hideNavBar
						/>
						<Scene
							key = "Resources"
							component = { Resources }
							title = "Resources"
						/>
						<Scene
							key = "WebPageShow"
							component = { WebPageShow }
						/>
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
							key = "Forms"
							component = { Forms }
							title = "Forms"
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
							key = "About"
							component = { About }
							title = "About"
						/>
						<Scene
							key = "EBoard"
							component = { EBoard }
						/>
						<Scene
							key = "Version"
							component = { Version }
						/>
					</Stack>
				</Stack>
			</Stack>
		</Router>
	);
};

export default RouterComponent;
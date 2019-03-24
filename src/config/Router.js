import React, {Button, View} from 'react';
import { Router, Scene, Stack, ActionConst, Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Spinner } from '../components/general';
import RegistrationForm from '../components/auth/RegistrationForm';
import EditProfileForm from '../components/auth/EditProfileForm';
import EditOtherProfileForm from '../components/auth/EditOtherProfileForm';
import LoginForm from '../components/auth/LoginForm';
import CreateEvent from '../components/event/CreateEvent';
import EventDetailsForm from '../components/event/EventDetails';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import CandidateForm from '../components/elect/CandidateForm'
import PositionForm from '../components/elect/PositionForm'
import CreateStatistics from '../components/stats/CreateStatistics'

import { WebPageShow, PostShow, ComingSoon } from '../components/general';

// Screens
// Profile is separate temporarily due to default export from redux connect

/* look at this page https://github.com/aksonov/react-native-router-flux/issues/2121
to set button on the navBar */
import Events from '../screens/Events';
import Profile from '../screens/Profile';
import OtherProfile from '../screens/OtherProfile';
import Leaderboard from '../screens/Leaderboard';
import Election from '../screens/Election';
import BackEnd from '../screens/BackEnd'
import ElectionBackEnd from '../screens/ElectionBackEnd'
import ElectionPositions from '../screens/ElectionPositions'
import ElectionCandidates from '../screens/ElectionCandidates'
import Statistics from '../screens/Statistics'
import More from '../screens/More'
import PointsBreakDown from '../screens/PointsBreakDown'
import Dashboard from '../screens/Dashboard'

import {
  Feed,
  Resources,
  CheckIn,
  Forms,
  About,
  EBoard,
  Version
} from '../screens/';

const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root" hideNavBar>
        <Stack key="auth">
          <Scene
            key="loading"
            component={Spinner}
            type={ActionConst.REPLACE}
            hideNavBar
          />
          <Scene
            key="login"
            component={LoginForm}
            title="Login"
            type={ActionConst.REPLACE}
            hideNavBar
          />
          <Scene
            key="registration"
            component={RegistrationForm}
            title="Create Account"
            type={ActionConst.REPLACE}
            hideNavBar
          />
          <Scene
            key="resetPassword"
            component={ResetPasswordForm}
            title="Reset Password"
            type={ActionConst.REPLACE}
            hideNavBar
          />
          <Scene
            key="pointsBreakDown"
            component={PointsBreakDown}
            title="Points"
            type={ActionConst.REPLACE}
            showNavBar
          />        
        </Stack>
        <Stack key = "events">
          <Scene
            key="createEvent"
            component={CreateEvent}
            title="Event Creation"
            type={ActionConst.REPLACE}
            hideNavBar
          />
          <Scene
            key="eventDetails"
            component={EventDetailsForm}
            title="Event Details"
            type={ActionConst.REPLACE}
            hideNavBar
          />
        </Stack>
        <Stack key = "stats" hideNavBar>
          <Scene
            key="Statistics"
            component={Statistics}
            title="Statistics"
          />
          <Scene
            key="createStatistics"
            component={CreateStatistics}
            title="Statistics"
          />
        </Stack>
        <Stack key = "election">
        <Scene
           key="ElectionCandidates"
            component={ElectionCandidates}
            title="Election Candidates"
            type={ActionConst.REPLACE}
            hideNavBar
        />
        <Scene
           key="CandidateForm"
            component={CandidateForm}
            title="Candidate Forms"
            type={ActionConst.REPLACE}
            hideNavBar
        />
        <Scene
           key="ElectionPositions"
            component={ElectionPositions}
            title="Election Positions"
            type={ActionConst.REPLACE}
            hideNavBar
        />
        <Scene
           key="PositionForm"
            component={PositionForm}
            title="Position Forms"
            type={ActionConst.REPLACE}
            hideNavBar
        />
        </Stack>
        <Stack key = "Profiles">
        <Scene
          key="EditProfileForm"
          component={EditProfileForm}
          hideNavBar
        />
        </Stack>
        <Stack key="main"
          tabs
          tabBarPosition="bottom"
          type={ActionConst.RESET}
          activeTintColor={'black'}
          inactiveTintColor={'gray'}
        >
          <Scene hideNavBar
            key="dashboard"
            component={Dashboard}
            tabBarLabel="Dashboard"
            title="Dashboard"
            tabBarIcon={ ({ tintColor, focused }) =>
              <Ionicons
                name={focused ? 'ios-paper' : 'ios-paper-outline'}
                size ={30}
                style={{ color: 'black' }}
              />
            }
          />


          <Scene
            key="event"
            component={Events}
            title="Events"
            rightTitle="Today"
            tabBarIcon={ ({ tintColor, focused }) =>
              <Ionicons
                name={focused ? 'ios-calendar' : 'ios-calendar-outline'}
                size ={30}
                style={{ color: 'black' }}
              />
            }
          />
          <Scene
            key="profile"
            component={Profile}
            title="Profile"
            tabBarIcon={ ({ tintColor, focused }) =>
              <Ionicons
                name={focused ? 'ios-person' : 'ios-person-outline'}
                size ={30}
                style={{ color: 'black' }}
              />
            }
          />
          <Stack
            key="more"
            title="More"
            tabBarIcon={ ({ tintColor, focused }) =>
              <Ionicons
                name={focused ? 'ios-menu' : 'ios-menu-outline'}
                size ={30}
                style={{ color: 'black' }}
              />
            }>
            <Scene
              key="more"
              component={More}
              title="More Options"
              leftTitle="Back"
            />
            <Scene key="Leaderboard"
              component={Leaderboard}
              title="Leaderboard"
              hideTabBar
            />
            <Stack
            key="BackEnd"
            title="BackEnd"
            hideNavBar
           >
              <Scene key="BackEnd"
                component={BackEnd}
              />
              <Scene key = "ElectionBackEnd"
                component={ElectionBackEnd}
                title="Election"
                hideTabBar
              />
            </Stack>
            <Scene
              key="OtherProfile"
              component={OtherProfile}
              hideTabBar
              hideNavBar
            />
            <Scene
              key="EditOtherProfileForm"
              component={EditOtherProfileForm}
              hideNavBar
            />
            <Scene key="Resources"
              component={Resources}
              title="Resources"
            />
            <Scene key="WebPageShow"
              component={WebPageShow}
            />
            <Scene key="CheckIn"
              component={CheckIn}
              title="Check In"
            />
            <Scene key="Forms"
              component={Forms}
              title="Forms"
            />
            <Scene key="Election"
             component={Election}
             title="Election"
            />
            <Scene key="About"
              component={About}
              title="About"
            />
            <Scene key="EBoard"
              component={EBoard}
            />
            <Scene key="Version"
              component={Version}
            />
          </Stack>
        </Stack>
      </Stack>
    </Router>
  );
};

export default RouterComponent;

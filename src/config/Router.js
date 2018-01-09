import React from 'react';
import { Router, Scene, Stack, ActionConst, Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import RegistrationForm from '../components/auth/RegistrationForm';
import LoginForm from '../components/auth/LoginForm'

// Screens
import {
  Feed,
  Profile,
  Events,
  More,
  JobBoard,
  Leaderboard,
  Resources,
  CheckIn,
  About,
  WebPage1,
  WebPage2
} from '../screens/';

const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root" hideNavBar>
        <Stack key="auth">
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
         </Stack>
        <Stack key="main"
          tabs={true}
          rightTitle="Log Out"
          onRight={() => firebase.auth().signOut().then(function() {
          Actions.login()})} >
          <Scene
            key="feed"
            initial
            component={Feed}
            title="Feed"
            />
          <Scene
            key="events"
            component={Events}
            title="Events"
            />
          <Scene
            key="profile"
            component={Profile}
            title="Profile"
            rightTitle="Edit"
            onRight={() => {}}
            />
          <Stack key="more" tabBarLabel="More">
            <Scene
              key="more"
              component={More}
              title="More Options"
              leftTitle="Back"
              />
            <Scene key="JobBoard"
              component={JobBoard}
              title="Job Board"
              />
            <Scene key="Leaderboard"
                component={Leaderboard}
                title="Leaderboard"
                />
            <Scene key="Resources"
              component={Resources}
              title="Resources"
              />
              <Scene key="WebPage1"
                component={WebPage1}
                title="SHPE UCF Website"
                />
              <Scene key="WebPage2"
                component={WebPage2}
                title="SHPE UCF Facebook page"
                />
            <Scene key="CheckIn"
                component={CheckIn}
                title="Check In"
            />
            <Scene key="About"
                component={About}
                title="About Us"
            />
          </Stack>
        </Stack>
      </Stack>
    </Router>
  );
};

export default RouterComponent;

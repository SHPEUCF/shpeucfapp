import React from 'react';
import { Router, Scene, Stack, ActionConst, Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import RootTab from '../navigation/RootTab';
import RegistrationForm from '../components/auth/RegistrationForm';
import LoginForm from '../components/auth/LoginForm'

// Screens
import {
  Home,
  Profile,
  Events,
  JobBoard,
  Leaderboard,
  Resources,
  CheckIn,
  About,
  More,
  WebPage1,
  WebPage2
} from '../screens/';
import MoreMenu from '../navigation/MoreMenu';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
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
         </Scene>
        <Scene key="main" tabs={true}>
          <Scene
            key="home"
            component={Home}
            title="Feed"
            initial
            rightTitle="Log Out"
            onRight={() => firebase.auth().signOut().then(function() {
              Actions.login()})}/>
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

          <Stack key="more">
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
                  title="SHPE UCF Facbook page"
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

        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;

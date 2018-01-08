import React from 'react';
import { Router, Scene, Stack, ActionConst, Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import TabIcon from '../navigation/TabIcon';
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
  About
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
        <Scene key="main">
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
          <Scene
            key="more"
            component={MoreMenu}
            title="More Options"
            />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;

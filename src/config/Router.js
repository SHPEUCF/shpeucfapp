import React from 'react';
import { Router, Scene, Stack, ActionConst, Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RegistrationForm from '../components/auth/RegistrationForm';
import LoginForm from '../components/auth/LoginForm'
import { WebPageShow, ComingSoon } from '../components/general';

// Screens
import {
  Feed,
  Profile,
  Events,
  More,
  Leaderboard,
  JobBoard,
  Resources,
  CheckIn,
  Forms,
  About,
  EBoard,
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
          tabs
          tabBarPosition="bottom"
          rightTitle="Log Out"
          onRight={() => firebase.auth().signOut().then(function() {
          Actions.login()})} >
          <Scene
            key="feed"
            initial
            component={Feed}
            title="Feed"
            tabBarIcon={ ({ tintColor, focused }) =>
              <Ionicons
                name={focused ? 'ios-paper' : 'ios-paper-outline'}
                size ={28}
                style={{ color: tintColor }}
              />
            }
          />
          <Scene
            key="events"
            component={Events}
            title="Events"
            tabBarIcon={ ({ tintColor, focused }) =>
              <Ionicons
                name={focused ? 'ios-calendar' : 'ios-calendar-outline'}
                size ={28}
                style={{ color: tintColor }}
              />
            }
          />
          <Scene
            key="profile"
            component={Profile}
            title="Profile"
            rightTitle="Edit"
            onRight={()=>alert("Coming soon!")}
            tabBarIcon={ ({ tintColor, focused }) =>
              <Ionicons
                name={focused ? 'ios-person' : 'ios-person-outline'}
                size ={28}
                style={{ color: tintColor }}
              />
            }
          />
          <Stack
            key="more"
            tabBarLabel="More"
            tabBarIcon={ ({ tintColor, focused }) =>
              <Ionicons
                name={focused ? 'ios-menu' : 'ios-menu-outline'}
                size ={28}
                style={{ color: tintColor }}
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
            />
            <Scene key="JobBoard"
              component={JobBoard}
              title="Job Board"
            />
            <Scene key="Resources"
              component={Resources}
              title="Resources"
            />
              <Scene key="WebPageShow"
                    component={WebPageShow}
                    passProps
                  />
            <Scene key="CheckIn"
              component={CheckIn}
              title="Check In"
            />
            <Scene key="Forms"
                component={Forms}
                title="Forms"
              />
            <Scene key="About"
              component={About}
              title="About"
            />
              <Scene key="EBoard"
                        component={EBoard}
                        passProps
                      />
              <Scene key="ComingSoon"
                    component={ComingSoon}
                    passProps
                  />
          </Stack>
        </Stack>
      </Stack>
    </Router>
  );
};

export default RouterComponent;

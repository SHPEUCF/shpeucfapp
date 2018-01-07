import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { RegistrationForm } from './components/auth';
import LoginForm from './components/auth/LoginForm'

// Screens
import {
  Home,
  Profile,
  Events
} from './screens/';
import MoreMenu from './navigation/MoreMenu';

const RouterComponent = () => {
  return (
    <Router>
      <Stack hideNavBar>
        <Stack key="auth">
          <Scene
            key="login"
            component={LoginForm}
            title="Please Login" />
          <Scene
            key="registration"
            component={RegistrationForm}
            title="Create Account" />
        </Stack>
        <Stack key="main">
          <Scene
            key="home"
            component={Home}
            title="Home"
            rightTitle="Log Out"
            onRight={() => {}} />
          <Scene
            key="events"
            component={Events}
            title="Events" />
          <Scene
            key="profile"
            component={Profile}
            title="Profile" />
          <Scene
            key="more"
            component={MoreMenu}
            title="More Options" />
        </Stack>
      </Stack>
    </Router>
  );
};

export default RouterComponent;

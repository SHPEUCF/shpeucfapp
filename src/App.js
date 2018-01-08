import React, { Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Router from './config/Router';

export default class App extends Component {

  componentWillMount() {
    // Initialize firebase
    const config = {
      apiKey: 'AIzaSyA_XfvvcvuAXanbBASf_ZOlWOAnieIvWKs',
      authDomain: 'authentication-d9d53.firebaseapp.com',
      databaseURL: 'https://authentication-d9d53.firebaseio.com',
      projectId: 'authentication-d9d53',
      storageBucket: 'authentication-d9d53.appspot.com',
      messagingSenderId: '60634673791'
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(thunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

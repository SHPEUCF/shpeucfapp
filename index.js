import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/ducks';
import App from './src/App';

export default class Main extends Component {
    render() {
        const store = createStore(reducers, {}, applyMiddleware(thunk));

        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('shpeucfapp', () => Main);

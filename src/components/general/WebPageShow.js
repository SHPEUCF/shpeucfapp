import React, { Component } from 'react';
import { WebView, View } from 'react-native';
import { Spinner } from './Spinner';
import { NavBar }  from './NavBar';
import { Actions } from 'react-native-router-flux';

class WebPageShow extends Component {
  render() {
    const { uri } = this.props;
    return (
      <View style={{flex: 1}}>
        <NavBar back onBack={() => Actions.pop()} />
        <WebView
          source={{ uri }}
          renderLoading={() => <Spinner /> }
          startInLoadingState
        />
      </View>
    );
  }
}

export { WebPageShow };

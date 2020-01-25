import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview'
import { Spinner } from './Spinner';
import { NavBar }  from './NavBar';
import { Actions } from 'react-native-router-flux';

class WebPageShow extends Component {
  render() {
    const { uri, title} = this.props;
    return (
    <SafeAreaView style={{backgroundColor: '#0c0b0b', flex: 1}}>
      <View style={{flex: 1, backgroundColor: "black"}}>
        <NavBar title={this.props.title} back onBack={() => Actions.pop()} />
        <WebView
          source={{ uri }}
          renderLoading={() => <Spinner /> }
          startInLoadingState
        />
      </View>
    </SafeAreaView>
    );
  }
}

export { WebPageShow };

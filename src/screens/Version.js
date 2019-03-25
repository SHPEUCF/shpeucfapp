import React, { Component } from 'react';
import { GeneralContent, NavBar } from '../components/general'
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Version extends Component {
  render() {
    const { title, content, footer } = this.props;
    return (
      <View style={{flex: 1}}>
        <NavBar title="Version" back onBack={() => Actions.pop()} />
        <GeneralContent
          title={title}
          content={content}
          footer={footer}
        />
      </View>
    );
  }
}

export { Version };

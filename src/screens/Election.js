import React, { Component } from 'react';
import {Text, View }from 'react-native';

class Election extends Component {

  render(){
    return(
      <View style={{alignItems:'center',
                    justifyContent:'center',
                    flex: 1,
                    backgroundColor:'white'}}>

        <Text style={{fontSize: 30,
                      fontWeight: 'bold',
                      color: 'grey'}}>
              {'Coming Soon'}
        </Text>

      </View>
    );
  };
}

export { Election };

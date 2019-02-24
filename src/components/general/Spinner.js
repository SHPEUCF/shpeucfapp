import React from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';

const Spinner = ({ 
  style,
  size,
  color,
  width,
  height
 }) => {
  return (
    <View style={[style, {height}, {width}]}>
      <ActivityIndicator 
      size={size}
      color={color}
      />
    </View>
  );
};



const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

Spinner.defaultProps = {
  style: styles.spinnerStyle,
  width: Dimensions.get("screen").width,
  height: Dimensions.get("screen").height,
  size: 'large',
}

export { Spinner };

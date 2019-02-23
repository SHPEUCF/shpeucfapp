import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ 
  style,
  size,
  color,
 }) => {
  return (
    <View style={style}>
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
  size: 'large',
}

export { Spinner };

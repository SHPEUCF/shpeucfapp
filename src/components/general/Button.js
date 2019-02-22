import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const Button = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
  accessibilityLabel,
  numberOfLines,
  disabled,
  testID,
}) =>{
  const {bStyle, tStyle} = styles;

  return (
    <TouchableOpacity 
      onPress={onPress}>
      <View style={[bStyle,buttonStyle]}>
        <Text 
          style={[tStyle,textStyle]}
          accessibilityLabel={accessibilityLabel}
          numberOfLines={numberOfLines}
          disabled={disabled}
          testID={testID}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
};


const styles = {
  tStyle: {
    color: "#000",
    textAlign: 'center',
    fontSize: 18,
  },
  bStyle: {
    alignSelf: 'center',
    backgroundColor: '#FECB00',
    borderRadius: 32,
    borderColor: '#0000',
    borderWidth: 1,
    marginTop: 10,
    padding:3,
    width: 300,
    height: 35
  }
};

Button.defaultProps = {
  buttonStyle: styles.bStyle,
  textStyle: styles.tStyle,
  numberOfLines:1,
  title: "Put a Title!"
  
}

export { Button };

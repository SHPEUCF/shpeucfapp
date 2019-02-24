import React from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';


const Button = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
  accessibilityLabel,
  numberOfLines,
  disabled,
  testID,
  height,
  width
}) =>{
  const {bStyle, tStyle} = styles;

  return (
    <TouchableOpacity
      onPress={onPress}>
      <View style={[bStyle,buttonStyle, {height}, {width}]}>
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
    padding:5
  }
};

Button.defaultProps = {
  buttonStyle: styles.bStyle,
  textStyle: styles.tStyle,
  numberOfLines:1,
  title: "Put a Title!",
  width: Dimensions.get("screen").width / 1.1,
  height: Dimensions.get("screen").height / 17

}

export { Button };

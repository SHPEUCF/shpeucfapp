import React from 'react';
import { TextInput, View, Text, ScrollView } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) =>  {
  const { inputStyle, labelStyle, containerStyle} = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <ScrollView scrollEnabled={false}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={inputStyle}
          autoCorrect={false}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          />
      </ScrollView>
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 16,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 16,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
};
export { Input };

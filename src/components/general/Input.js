import React from 'react';
import { TextInput, View, Text, ScrollView } from 'react-native';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  autoCapitalize,
  maxLength,
  secureTextEntry,
  numberOfLines,
  multiline,
  textAlignVertical,
  keyboardType,
  editable,
  style }) =>  {
  const { inputStyle } = styles;

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={[inputStyle, style]}
      autoCorrect={false}
      autoCapitalize={autoCapitalize}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      maxLength={maxLength}
      numberOfLines={numberOfLines}
      multiline={multiline}
      textAlignVertical={textAlignVertical}
      keyboardType={keyboardType}
      editable={editable}
      underlineColorAndroid='transparent'
      />
  );
};

Input.defaultProps = {
  maxLength: 45,
  autoCapitalize: 'words',
  placeholder: 'Enter text here'
}

const styles = {
  inputStyle: {
    color: '#000',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 25
  }
};
export { Input };

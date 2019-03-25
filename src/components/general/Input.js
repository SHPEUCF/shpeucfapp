import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { TextInput, View, Text, ScrollView } from 'react-native';

class Input extends Component {

  constructor(props) {
    super(props)
  }
  static propTypes = {
    children: PropTypes.any,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    blurOnSubmit: PropTypes.bool,
    autoCorrect: PropTypes.any,
    autoCapitalize: PropTypes.any,
    maxLength: PropTypes.number,
    secureTextEntry: PropTypes.any,
    numberOfLines: PropTypes.number,
    multiline: PropTypes.any,
    textAlignVertical: PropTypes.any,
    keyboardType: PropTypes.any,
    editable: PropTypes.bool,
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.shape({}),
    ])
  }
  render() {
    const { inputStyle } = styles;
    const {
      children,
      value,
      onChangeText,
      placeholder,
      autoCorrect,
      autoCapitalize,
      blurOnSubmit,
      maxLength,
      secureTextEntry,
      numberOfLines,
      multiline,
      textAlignVertical,
      keyboardType,
      editable,
      style,
      onFocus
    } = this.props

    return (
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[inputStyle, style]}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        blurOnSubmit={blurOnSubmit}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        numberOfLines={numberOfLines}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        keyboardType={keyboardType}
        editable={editable}
        onFocus={onFocus}
        underlineColorAndroid='transparent'
      >
      {children}
      </TextInput>
    );
  };
}
Input.defaultProps = {
  maxLength: 45,
  autoCapitalize: 'sentences',
  autoCorrect: false,
  placeholder: 'Enter text here'
}

const styles = {
  inputStyle: {
    flex: 1,
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

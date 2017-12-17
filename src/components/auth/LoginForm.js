import React, { Component} from 'react';
import { View, Text, } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from '../general';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email , password } = this.state;

    this.setState({ error: '', loading: true});

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSucces.bind(this))
      .catch((error) => this.onLoginFail(error));
  }

  onLoginSucces() {
    this.setState({
      email: '',
      password: '',
      loading: false
    });
  }

  onLoginFail(error) {
    const errorCode = error.code;
    let errorMessage;

    switch (errorCode) {
      case 'auth/wrong-password':
        errorMessage = 'Your credentials do not match our records';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Enter a valid email';
        break;
      default:
      errorMessage = error.message;
    }

    this.setState({
      error: errorMessage,
      loading: false
    });
    console.log(error);
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />
    };

    return (
      <Button
        onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }

  render() {
    return (
      <View style={styles.formContainerStyle}>

        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}>Welcome! Please Log In or Create Account</Text>
        </View>

        <View style={styles.formFieldsContainer}>
          <View style={styles.formField}>
            <Input
              label="Email"
              placeholder="user@knights.ucf.com"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              />
          </View>

          <View style={styles.formField}>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              />
          </View>
        </View>

        <View>
          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>
        </View>

        <View style={styles.formButton}>
          {this.renderButton()}
        </View>

      </View>
    );
  }
}

const styles = {
  formContainerStyle: {
    marginLeft: 30,
    marginRight: 30,
  },
  headerStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  headerTextStyle: {
    fontSize: 14,
  },
  formFieldsContainer: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 5,
  },
  formField: {
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: '#ddd',
    position: 'relative',
  },
  errorTextStyle: {
    fontSize: 14,
    alignSelf: 'center',
    color: 'red',
    paddingTop: 10,
  },
  formButton: {
    flexDirection: 'row',
    marginRight: 70,
    marginLeft: 70,
    marginTop: 10,
    marginBottom: 10
  },
};

export { LoginForm };

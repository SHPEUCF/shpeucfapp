import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import {
  Text,
  View, StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity } from 'react-native';
import { Avatar, Divider, Button } from 'react-native-elements';

class Profile extends Component {

  render() {
    const {
      containerStyle,
      headerInfoContainer,
      avatarContainerStyle,
      taglineContainer,
      taglineTextStyle,
      contentContainerStyle,
      contentItemsContainerStyle,
      itemLabelContainerStyle,
      itemLabelText,
      itemValueContainerStyle,
      itemValueText,
      buttonsContainerStyle,
      editButtonContainer,
      logOutButtonContainer } = styles;

    return (
      <View style={containerStyle}>
        <ScrollView>

          <View style={headerInfoContainer}>
            <View style={avatarContainerStyle}>
              <Avatar
                large
                rounded
                title="FL"
                onPress={() => alert("Coming Soon")}
                activeOpacity={0.7}
                />
            </View>
            <View style={taglineContainer}>
               <Text style={taglineTextStyle}>Turn up!</Text>
            </View>
          </View>
          <Divider style={{ backgroundColor: '#D9D7CE' }} />

          <View style={contentContainerStyle}>

            <View style={contentItemsContainerStyle}>
              <View style={itemLabelContainerStyle}>
                <Text style={itemLabelText}>Name:</Text>
              </View>
              <View style={itemValueContainerStyle}>
                <Text style={itemValueText}>John Doe</Text>
              </View>
            </View>

            <View style={contentItemsContainerStyle}>
              <View style={itemLabelContainerStyle}>
                <Text style={itemLabelText}>Email:</Text>
              </View>
              <View style={itemValueContainerStyle}>
                <Text style={itemValueText}>user@knights.ucf.edu</Text>
              </View>
            </View>

            <View style={contentItemsContainerStyle}>
              <View style={itemLabelContainerStyle}>
                <Text style={itemLabelText}>Major:</Text>
              </View>
              <View style={itemValueContainerStyle}>
                <Text style={itemValueText}>Computer Engineering</Text>
              </View>
            </View>

          </View>

          <Divider style={{ backgroundColor: '#D9D7CE' }} />

          <View style={buttonsContainerStyle}>
            <View style={editButtonContainer}>
              <Button
                title='Edit Profile'
                raised
                backgroundColor='#FECB00'
                color='#000'
                fontSize={15}
                icon={{color: '#000', name: 'mode-edit' }}
                onPress={() => alert("Coming Soon")}
              />
            </View>
            <View style={logOutButtonContainer}>
              <Button
                title='Log Out'
                raised
                backgroundColor='#FECB00'
                color='#000'
                fontSize={15}
                icon={{color: '#000', name: 'exit-to-app'}}
                onPress={() => this.props.logoutUser()}
              />
            </View>
          </View>

        </ScrollView>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  headerInfoContainer: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#D9D7CE'
  },
  avatarContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  taglineContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  taglineTextStyle:{
    fontSize: 16,
    fontWeight: '600'
  },
  contentContainerStyle: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
  },
  contentItemsContainerStyle: {
    flexDirection: 'row',
    padding: 10,
  },
  itemLabelContainerStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  itemLabelText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  itemValueContainerStyle: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  itemValueText: {
    fontSize: 15,
    fontWeight: '500',
  },
  buttonsContainerStyle: {
    marginTop: 50,
    marginRight: 10,
    marginBottom: 20,
    marginLeft: 10,
    justifyContent: 'flex-end',
  },
  editButtonContainer: {
    flex: 1,
    marginBottom: 10,
  },
  logOutButtonContainer: {
    flex: 1,
  },
});

const mapStateToProps = ({ auth }) => {
  const { loggedIn } = auth;

  return { loggedIn };
};

const mapDispatchToProps = { logoutUser };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

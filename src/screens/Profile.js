import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import {
  Text,
  View, StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { RkButton } from 'react-native-ui-kitten';


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

          <View style={{ backgroundColor: '#FFF'}}>
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

          <View style={buttonsContainerStyle}>
            <View style={editButtonContainer}>
              <RkButton rkType='rounded stretch'
                style={{backgroundColor: '#FECB00'}}
                contentStyle={{color: '#000', fontWeight: 'bold'}}
                onPress={() => alert("Coming Soon")}>
                Edit Profile
              </RkButton>
            </View>
            <View style={logOutButtonContainer}>
              <RkButton rkType='rounded stretch'
                style={{backgroundColor: '#FECB00'}}
                contentStyle={{color: '#000', fontWeight: 'bold'}}
                onPress={() => this.props.logoutUser()}>
                Log Out
              </RkButton>
            </View>
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
    backgroundColor: '#E1E1E1'
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
    marginTop: 20,
    marginBottom: 20,
  },
  contentItemsContainerStyle: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  itemLabelContainerStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  itemLabelText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemValueContainerStyle: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  itemValueText: {
    fontSize: 16,
    fontWeight: '500',
  },
  buttonsContainerStyle: {
    marginTop: 60,
    marginRight: 10,
    marginLeft: 10,
  },
  editButtonContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  logOutButtonContainer: {
    marginTop: 10,
    marginBottom: 10
  },
});

const mapStateToProps = ({ auth }) => {
  const { loggedIn } = auth;

  return { loggedIn };
};

const mapDispatchToProps = { logoutUser };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

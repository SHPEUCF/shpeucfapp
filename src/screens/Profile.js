import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { loadUser, logoutUser, goToEditProfileForm,} from '../actions';
import {
  Text,
  View, StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { RkButton } from 'react-native-ui-kitten';


class Profile extends Component {
  componentWillMount() {
    if(this.props.firstName === '')
      this.props.loadUser();
  }

  render() {
    const { firstName, lastName, email, major, points, picture, quote } = this.props;

    const {
      bottomHalfContainerStyle,
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
			editLogoContainer,
      logOutButtonContainer } = styles;

    return (
        <ScrollView>
          <View style={headerInfoContainer}>
            <View style={avatarContainerStyle}>
              <Avatar
                large
                rounded
                source={{uri: picture}}
                title={`${firstName[0]}${lastName[0]}`}
                onPress={() => alert("Coming Soon") }
                activeOpacity={0.7}
                />
            </View>
            <View style={taglineContainer}>
               <Text style={taglineTextStyle}>Turn up!</Text>
               <Text style={taglineTextStyle}>{quote}</Text>
            </View>
				<View style={editLogoContainer}>
						<View style={editLogoContainer}>
							<RkButton rkType='rounded'
								style={{ backgroundColor: '#fff0', width: 60}}
								contentStyle={{color: '#000', fontWeight: 'bold'}}
								onPress={() => Actions.PostShow({ title: 'Linkedin', uri: 'https://www.linkedin.com/'})}>
								<Ionicons
								name="logo-linkedin"
								size={30}
								/>
							</RkButton>
						</View>
						<View style={editLogoContainer}>
							<RkButton rkType='rounded'
								style={{backgroundColor: '#fff0', width: 60}}
								contentStyle={{color: '#000', fontWeight: 'bold'}}
								onPress={() => Actions.PostShow({ title: 'Github', uri: 'https://github.com/'})}>
								<Ionicons
								name="logo-github"
								size={30}
								/>
							</RkButton>
						</View>
						</View>
          </View>

         <View style={bottomHalfContainerStyle}>

          <View style={contentContainerStyle}>

            <View style={contentItemsContainerStyle}>
              <View style={itemLabelContainerStyle}>
                <Text style={itemLabelText}>Name:</Text>
              </View>
              <View style={itemValueContainerStyle}>
                <Text style={itemValueText}>{firstName + ' ' + lastName}</Text>
              </View>
            </View>

            <View style={contentItemsContainerStyle}>
              <View style={itemLabelContainerStyle}>
                <Text style={itemLabelText}>Email:</Text>
              </View>
              <View style={itemValueContainerStyle}>
                <Text style={itemValueText}>{email}</Text>
              </View>
            </View>

            <View style={contentItemsContainerStyle}>
              <View style={itemLabelContainerStyle}>
                <Text style={itemLabelText}>Major:</Text>
              </View>
              <View style={itemValueContainerStyle}>
                <Text style={itemValueText}>{major}</Text>
              </View>
            </View>
            <View style={contentItemsContainerStyle}>
              <View style={itemLabelContainerStyle}>
                <Text style={itemLabelText}>Points:</Text>
              </View>
              <View style={itemValueContainerStyle}>
                <Text style={itemValueText}>{points}</Text>
              </View>
            </View>

          </View>

					<View style={buttonsContainerStyle}>

          <View style={buttonsContainerStyle}>
            <View style={editButtonContainer}>
              <RkButton rkType='rounded stretch'
                style={{backgroundColor: '#FECB00'}}
                contentStyle={{color: '#000', fontWeight: 'bold'}}
                onPress = {
                  () => this.props.goToEditProfileForm()
                } >
                Edit Profile
              </RkButton>
            </View>
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
    )
  }
}

const styles = StyleSheet.create({
  bottomHalfContainerStyle: {
    backgroundColor: 'rgb(240,240,240)'
  },
  headerInfoContainer: {
    flex: 1,
		//flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#FFF'
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
    marginRight: 10,
    marginLeft: 10,
  },
  editButtonContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
	editLogoContainer: {
		marginTop: 3,
		flexDirection: 'row',
		justifyContent: 'center'
	},
  logOutButtonContainer: {
    marginTop: 10,
    marginBottom: 60
  },
});

const mapStateToProps = ({ auth }) => {
  const { firstName, lastName, email, major, points, picture, quote } = auth;

  return { firstName, lastName, email, major, points, picture, quote };
};

const mapDispatchToProps = {
  loadUser,
  logoutUser,
  goToEditProfileForm
 };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

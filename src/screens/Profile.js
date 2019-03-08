import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {Button, Spinner} from '../components/general'
import { loadUser, logoutUser, goToEditProfileForm, pageLoad} from '../actions';
import {
  Text,
  View, StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
 	Dimensions
	} from 'react-native';
import { Avatar, Divider } from 'react-native-elements';

const dimension = Dimensions.get('window');
class Profile extends Component {

  renderContent(){
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
      logOutButtonContainer } = styles

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
					</View>
					<View style={styles.bioContainer}>
            <View style={taglineContainer}>
               <Text
							 		style={{
										color: '#b4b7ba',
										fontSize: 20,
										fontWeight: 'bold',
										textAlign: 'center'}}
										>{firstName + ' ' + lastName}</Text>
               <Text
							 		style={{
										color: '#b4b7ba',
										fontSize: 16,
										textAlign: 'center',
										lineHeight: 25,
										marginTop: 5,
										width: dimension.width *.9}}
										>{quote}</Text>
            </View>
					</View>
         <View style={{backgroundColor: '#0c0b0b'}}>
          <View style={contentContainerStyle}>
            <View style={contentItemsContainerStyle}>
              <View style={{ height: dimension.height *.01, backgroundColor: '#0c0b0b'}}>
                <Text style={itemLabelText}></Text>
              </View>

              <View style={itemValueContainerStyle}>
                <Text style={itemValueText}>{/*firstName + ' ' + lastName*/}</Text>
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
          <View style={styles.socialmediarow}>
					{this.renderSocialMedia()}
					</View>
				<View style={styles.buttonEdit}>
					<View style={buttonsContainerStyle}>
              <Button
                title = "EDIT PROFILE"
                onPress={this.props.goToEditProfileForm.bind(this)}
              />
              <Button
                title = "LOG OUT"
                onPress={this.props.logoutUser.bind(this)}
              />
          </View>
				</View>
        </View>
        </ScrollView>
    )

  }
  renderSocialMedia(){
    return (
			<View>
			<Text style={styles.socialmediatext}> Social Media</Text>
			<View style={styles.editLogoContainer}>
        <View style= {styles.editLogoContainer}>
          <TouchableOpacity
            onPress={() => Actions.PostShow({ title: 'Linkedin', uri: 'https://www.linkedin.com/'})}>
            <Ionicons name="logo-linkedin" size={40} color='#000000'/>
          </TouchableOpacity>
        </View>
        <View style={styles.editLogoContainer}>
          <TouchableOpacity
            onPress={() => Actions.PostShow({ title: 'Github', uri: 'https://www.github.com/'})}>
            <Ionicons name="logo-github" size={40} color='#000000'/>
          </TouchableOpacity>
        </View>
      </View>
			</View>
    )
  }

  render() {
    // alert(this.props.loading)
     if(this.props.loading){
      return <Spinner>{this.renderContent}</Spinner>
    }
    else return (
      <View>
        {this.renderContent()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bottomHalfContainerStyle: {
    backgroundColor: 'rgb(240,240,240)'
  },
  headerInfoContainer: {
    flex: 1,
    paddingTop: dimension.height * .02,
    paddingBottom: dimension.height * .02,
    backgroundColor: '#2C3239'
  },
  avatarContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor: '#2C3239',
		paddingTop: dimension.height * .03,
  },
  taglineContainer: {
    alignItems: 'center',
		marginTop: dimension.height * .02,
  },
  taglineTextStyle:{
    fontSize: 16,
    fontWeight: '600'
  },
  contentContainerStyle: {
		height: dimension.height *.27,
    flex: 1,
		paddingTop: dimension.height *.01,
	  paddingBottom: dimension.height *.01,
  },
  contentItemsContainerStyle: {
    flexDirection: 'row',
    paddingHorizontal: dimension.height *.015,
    paddingVertical: dimension.height * .015,
  },
  itemLabelContainerStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  itemLabelText: {
    fontSize: 18,
    fontWeight: 'bold',
		color: '#fff',
		lineHeight: dimension.height * .03
  },
  itemValueContainerStyle: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  itemValueText: {
    fontSize: 16,
    fontWeight: '500',
		color: '#fff',
		lineHeight: dimension.height *.03,
  },
  buttonsContainerStyle: {
    marginRight: dimension.height * .015,
    marginLeft: dimension.height * .015,
  },
	buttonEdit: {
		backgroundColor: '#8b95a5',
		paddingTop: dimension.height * .015,
		paddingBottom: dimension.height * .015,
	},
  editButtonContainer: {
    marginTop: dimension.height * .015,
    marginBottom: dimension.height * .015,
  },
	editLogoContainer: {
    flex: 2,
		marginTop: dimension.height * .002,
		flexDirection: 'row',
		justifyContent: 'center'
	},
  logOutButtonContainer: {
    marginTop: dimension.height * .015,
    marginBottom: dimension.height * .006,
  },
	socialmediarow: {
		paddingTop: dimension.height * .015,
		paddingBottom: dimension.height * .015,
		backgroundColor: '#dee0e2',
	},
	bioContainer: {
		backgroundColor: '#000000'
	},
	socialmediatext: {
		flex:1,
		alignSelf: 'center'
	},
});

const mapStateToProps = ({ auth, general }) => {
  const { firstName, lastName, email, major, points, picture, quote } = auth;
  const { loading } = general;

  return { firstName, lastName, email, major, points, picture, quote, loading };
};

const mapDispatchToProps = {
  loadUser,
  logoutUser,
  goToEditProfileForm,
  pageLoad
 };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

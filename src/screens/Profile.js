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
  componentDidMount() {
    this.props.pageLoad();
    this.props.loadUser();
  }

  renderPicture() {
    const {
      headerInfoContainer,
    } = styles

    const {
      firstName,
      lastName,
      picture
    } = this.props

    return (
      <View style={headerInfoContainer}>
        <Avatar
          large
          rounded
          source={{uri: picture}}
          title={`${firstName[0]}${lastName[0]}`}
          onPress={() => alert("Coming Soon") }
          activeOpacity={0.7}
          />
      </View>
    )
  }


  renderButtons(){
    const {
      buttonsContainerStyle
    } = styles
    return (
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
    )
  }

    renderSocialMedia(){
    const {
      LogoContainer,
      socialmediarow
    } = styles
    return (
      <View style={socialmediarow}>
			<Text style={{fontSize: 17, alignSelf:"center"}}> Social Media</Text>
			<View style={{flexDirection: 'row'}}>
        <View style= {LogoContainer}>
          <TouchableOpacity
            onPress={() => Actions.PostShow({ title: 'Linkedin', uri: 'https://www.linkedin.com/'})}>
            <Ionicons name="logo-linkedin" size={40} color='#000000'/>
          </TouchableOpacity>
        </View>
        <View style={LogoContainer}>
          <TouchableOpacity
            onPress={() => Actions.PostShow({ title: 'Github', uri: 'https://www.github.com/'})}>
            <Ionicons name="logo-github" size={40} color='#000000'/>
          </TouchableOpacity>
        </View>
      </View>
			</View>
    )
  }

  renderContent(){
    const { firstName, lastName, email, major, points, quote } = this.props;

    const {
      bioContainer,
      taglineContainer,
      fieldContainerStyle,
      contentStyle,
      itemLabelText,
      itemValueText,
      socialmediarow,
      } = styles

    return (
      <View style={{flex: 1}}>
        {this.renderPicture()}
        <View style={bioContainer}>
          <View style={taglineContainer}>
              <Text style={[itemLabelText, {flex: 1}]}>{firstName + ' ' + lastName}</Text>
          </View>
          <View style={fieldContainerStyle}>
            <Text style={itemLabelText}>Email:</Text>
            <Text style={itemValueText}>{email}</Text>
          </View>
          <View style={fieldContainerStyle}>
            <Text style={itemLabelText}>Major:</Text>
            <Text style={itemValueText}>{major}</Text>
          </View>
          <TouchableOpacity style = {fieldContainerStyle} onPress={() => {
            this.props.pageLoad()
            Actions.pointsBreakDown()}}
          >
            <Text style={itemLabelText}>Points:</Text>
            <Text style={itemValueText}>{points}</Text>
          </TouchableOpacity>
        </View>
        {this.renderSocialMedia()}
        {this.renderButtons()}
      </View>
  )

  }

  render() {
    // alert(this.props.loading)
     if(this.props.loading){
      return <Spinner>{this.renderContent}</Spinner>
    }
    else return (
        this.renderContent()
    )
  }
}

const styles = StyleSheet.create({
  headerInfoContainer: {
    flex: .6,
    backgroundColor: '#2C3239',
    alignItems: 'center',
    justifyContent: 'center'
  },
  taglineContainer: {
    flex: .2,
    alignItems: 'center',
		marginTop: dimension.height * .02,
  },
  fieldContainerStyle: {
    flex: .2,
    flexDirection: 'row',
  },
  itemLabelText: {
    flex: .25,
    fontSize: 18,
    fontWeight: 'bold',
		color: '#fff',
		lineHeight: dimension.height * .03
  },
  itemValueContainerStyle: {
    flex: 4,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  itemValueText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
		color: '#fff',
  },
  buttonsContainerStyle: {
    flex: .4,
    marginRight: dimension.height * .015,
    marginLeft: dimension.height * .015,
    height: dimension.height * .145,
  },
	LogoContainer: {
    flex: 1,
    marginTop: dimension.height * .002,
    alignItems: 'center',
		justifyContent: 'center'
	},
	socialmediarow: {
    flex: .25,
		paddingTop: dimension.height * .015,
		paddingBottom: dimension.height * .015,
		backgroundColor: '#dee0e2',
	},
	bioContainer: {
    flex: 1,
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

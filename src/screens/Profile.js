import React, { Component } from 'react';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Button, Spinner, NavBar } from '../components/general'
import { loadUser, logoutUser, goToEditProfileForm, pageLoad, pictureChanged} from '../ducks';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, SafeAreaView} from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';

const dimension = Dimensions.get('window');
class Profile extends Component {

  render() {
    return (
          this.renderContent()
      )
    }

  renderContent(){
    const { firstName, lastName, email, major, points, quote } = this.props;

    const {
      bioContainer,
      taglineContainer,
      fieldContainerStyle,
      itemLabelText,
      itemValueText,
      textColor
      } = styles

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: "black"}}>
        {this.renderPicture()}
        
          <View style={bioContainer}>
            <View style={{flexDirection: "row", flex: 1, justifyContent: "space-evenly", alignItems: "flex-start"}}>
              <View style={[fieldContainerStyle]}>
                <View>
                  <Text style={[itemLabelText, textColor]}>Email:</Text>
                </View>
                <View>
                  <Text style={[itemLabelText, textColor]}>Major:</Text>
                </View>
                <View>
                <Text style={[itemLabelText, textColor]}>Points:</Text>
                </View>
              </View>
              <View style={[fieldContainerStyle]}>
                <View >
                <Text style={[itemValueText, textColor]}>{email}</Text>
                </View>
                <View>
                <Text style={[itemValueText, textColor]}>{major}</Text>
                </View>
                <View>
                <Text style={[itemValueText, textColor]}>{points}</Text>
                </View>
              </View>
              </View>
          </View>
          {this.renderSocialMedia()}
          {this.renderButtons()}
      </SafeAreaView>
  )

  }

  renderPicture() {
    const {
      headerInfoContainer,
      taglineContainer,
      itemLabelText,
      textColor
    } = styles

    const {
      firstName,
      lastName,
      picture
    } = this.props

    return (
      <View style={[headerInfoContainer]}>
        <Avatar
          size = {220}
          containerStyle = {{borderWidth: 5, borderColor: this.props.dashColor}}
          rounded
          source={{uri: picture}}
          onPress={() => this.openGallery()}
          />
          <View style={taglineContainer}>
                <Text style={[itemLabelText, textColor]}>{firstName + ' ' + lastName}</Text>
            </View>
      </View>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      dp: null
     }
   }

  openGallery(){

    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
    
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      includeBase64: true,
      compressImageQuality: 0.8,
      mediaType: 'photo',
      cropping: true,
      cropperCircleOverlay: true
    }).then(image => {

      const imagePath = image.path

      let uploadBlob = null

      const imageRef = firebase.storage().ref("users/profile").child(this.props.id)
      let mime = 'image/jpg'
      fs.readFile(imagePath, 'base64')
        .then((data) => {
          //console.log(data);
          return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {

          let userData = {}
          this.props.pictureChanged(url);
          let obj = {}
          obj["dp"] = url
          this.setState(obj)

        })
        .catch((error) => {
          console.log(error)
        })

    })

  }

  renderButtons(){
    const {
      buttonsContainerStyle
    } = styles
    return (
      <View style={{flex: .3, flexDirection: "row"}}>
      <TouchableOpacity onPress={this.props.goToEditProfileForm.bind(this)} style={{backgroundColor: "#FECB00", borderWidth: 1, borderColor: "#0000",flex: 1, alignItems: "center", justifyContent: "center"}}>
      <View style={{justifyContent: "center"}}>
        <Text style={{fontSize: 18}}> Edit Profile </Text>
      </View>
      </TouchableOpacity>
      <View style={{flex: .01}}></View>
      <TouchableOpacity onPress={this.props.logoutUser.bind(this)} style={{backgroundColor: "#FECB00", borderWidth: 1, borderColor: "#0000",flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text style={{fontSize: 18}}> Logout </Text>
      </TouchableOpacity>

      
      {/*<View style={buttonsContainerStyle}>
          <Button
            title = "EDIT PROFILE"
            onPress={this.props.goToEditProfileForm.bind(this)}
          />
          <Button
            title = "LOG OUT"
            onPress={this.props.logoutUser.bind(this)}
          />
    </View>*/}
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
			
			<View style={{flexDirection: 'row'}}>
        <View style= {LogoContainer}>
          <TouchableOpacity
            onPress={() => {
              alert("Coming Soon")
              // Actions.PostShow({ title: 'Linkedin', uri: 'https://www.linkedin.com/'})
            }
            }>
            <Ionicons name="logo-linkedin" size={40} color='#000000'/>
          </TouchableOpacity>
        </View>
        <View style={LogoContainer}>
          <TouchableOpacity
            onPress={() => {
              alert("Coming Soon")
            // Actions.PostShow({ title: 'Github', uri: 'https://www.github.com/'})
            }
          }>
            <Ionicons name="logo-github" size={40} color='#000000'/>
          </TouchableOpacity>
        </View>
      </View>
			</View>
    )
  }
}

const styles = StyleSheet.create({
  headerInfoContainer: {
    flex: 1.4,
    backgroundColor: '#2C3239',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomColor: '#e0e6ed22',
    borderBottomWidth: 1,
    padding: 1,
  },
  textColor: {
    color: '#e0e6ed'
  },
  taglineContainer: {
    flex: .3,
    alignItems: 'center',
    justifyContent: "flex-end",
  },
  fieldContainerStyle: {
    height: "100%",
    flexDirection: 'column',
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
  itemLabelText: {
    fontSize: 18,
    fontWeight: 'bold',
		color: '#fff',
		lineHeight: dimension.height * .03
  },
  itemValueContainerStyle: {
    flexDirection:'row',
    justifyContent: 'center',
  },
  itemValueText: {
    fontSize: 16,
    fontWeight: '500',
		color: '#fff',
  },
  buttonsContainerStyle: {
    flex: .4,
    backgroundColor: "white",
    paddingRight: dimension.height * .015,
    paddingLeft: dimension.height * .015,
    height: dimension.height * .145,
  },
	LogoContainer: {
    flex: 1,
    marginTop: dimension.height * .002,
    alignItems: 'center',
		justifyContent: 'center'
	},
	socialmediarow: {
    flex: .2,
		paddingTop: dimension.height * .015,
		paddingBottom: dimension.height * .015,
		backgroundColor: '#dee0e2',
	},
	bioContainer: {
    flex: .7,
    backgroundColor: '#2C3239',
	},
	socialmediatext: {
		flex:1,
    alignSelf: 'center'
	},
});

const mapStateToProps = ({ user, general }) => {
  const { firstName, lastName, email, major, points, picture, quote, id, dashColor } = user;
  const { loading } = general;

  return { firstName, lastName, email, major, points, picture, quote, loading, id, dashColor};
};

const mapDispatchToProps = {
  loadUser,
  logoutUser,
  goToEditProfileForm,
  pageLoad,
  pictureChanged
 };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

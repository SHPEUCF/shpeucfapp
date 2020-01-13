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
import Flag from 'react-native-flags'

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
        
          <View style={[bioContainer]}>
            <View style= {{flex:.2}}></View>
            <View style={{flexDirection: "row", flex: 1.5, justifyContent: "space-evenly", alignItems: "flex-start"}}>
              <View style={[fieldContainerStyle]}>
                <View style={{flex: 1, justifyContent: "center"}}>
                  <Text style={[itemLabelText, textColor]}>Email:</Text>
                </View>
                <View style={{flex: 1, justifyContent: "center"}}>
                  <Text style={[itemLabelText, textColor]}>Major:</Text>
                </View>
                <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={[itemLabelText, textColor]}>Points:</Text>
                </View>
              </View>
              <View style={[fieldContainerStyle]}>
                <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={[itemValueText, textColor]}>{email}</Text>
                </View>
                <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={[itemValueText, textColor]}>{major}</Text>
                </View>
                <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={[itemValueText, textColor]}>{points}</Text>
                </View>
              </View>
              </View>
              <View style= {{flex:.2}}></View>
          </View>
          {this.renderSocialMedia()}
          <View style={{flex: .3}}></View>
          {this.renderButtons()}
      </SafeAreaView>
  )

  }

  renderPicture() {
    const {
      headerInfoContainer,
      taglineContainer,
      itemLabelText,
      nameLabelText,
      textColor
    } = styles

    const {
      firstName,
      lastName,
      picture
    } = this.props

    return (
      <View style={[headerInfoContainer]}>
        <View style={{backgroundColor: 'black', flex: 1}}>
        <View style={{flex: .05, backgroundColor: 'black'}}></View>
          <View style={{flex: 1, paddingTop: "3%", paddingLeft: "5%", paddingRight: "5%"}}>
            {(picture === '') && (
               <Avatar
               size = {dimension.height*.32}
               rounded
               titleStyle={{backgroundColor: this.props.dashColor}}
               overlayContainerStyle={{backgroundColor: this.props.dashColor}}
               title={firstName[0].concat(lastName[0])}
               onPress={() => this.openGallery()}
               />
            )}
            {(picture !== '') && (
               <Avatar
               size = {dimension.height*.32}
               rounded
               source= {{uri: picture}}
               onPress={() => this.openGallery()}
               />
            )}
          </View>
          
          <View style={[taglineContainer]}>
              <View  style={{flexDirection: "row", alignItems: "center"}}>
                <View style={{flex: 1,alignItems: "center"}}>
                  <Text style={[nameLabelText, textColor]}>{firstName + ' ' + lastName}</Text>
                </View>
              </View>
          </View>
          <View style={{flex: .05, backgroundColor: "black"}}></View>
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
      
      <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", position: "absolute", bottom: dimension.height * .032, width:"100%"}}>
      {/*<TouchableOpacity onPress={this.props.goToEditProfileForm.bind(this)} style={{backgroundColor: "#FECB00", borderWidth: 1, borderColor: "#0000",flex: 1, alignItems: "center", justifyContent: "center"}}>
      <View style={{justifyContent: "center"}}>
        <Text style={{fontSize: 18}}> Edit Profile </Text>
      </View>
      </TouchableOpacity>
      <View style={{flex: .01}}></View>
      <TouchableOpacity onPress={this.props.logoutUser.bind(this)} style={{backgroundColor: "#FECB00", borderWidth: 1, borderColor: "#0000",flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text style={{fontSize: 18}}> Logout </Text>
    </TouchableOpacity>*/}

      
    <View style={buttonsContainerStyle}>
          <Button
            title = "Edit profile"
            onPress={this.props.goToEditProfileForm.bind(this)}
          />
    </View>
    {(this.props.flag !== '' && this.props.flag !== undefined ) && (<View style={{}}>
              <Flag
                type="flat"
                code={this.props.flag}
                size={32}
              />
              </View>)}
    <View style={buttonsContainerStyle}>
      <Button
            title = "Logout"
            onPress={this.props.logoutUser.bind(this)}
          />
    </View>

    </View>
    )
  }

    renderSocialMedia(){
    const {
      LogoContainer,
      socialmediarow
    } = styles
    return (
      <View style={{flex: .2}}>
        <View style={{flex:.03}}></View>
        <View style={socialmediarow}>
          <View style= {[LogoContainer, {backgroundColor: this.props.dashColor, flex: 1}]}>
            <TouchableOpacity
              onPress={() => {
                alert("Coming Soon")
                // Actions.PostShow({ title: 'Linkedin', uri: 'https://www.linkedin.com/'})
              }
              }>
              <Ionicons name="logo-linkedin" size={dimension.height*.045} color='white'/>
            </TouchableOpacity>
          </View>
          <View style={{flex:.01}}></View>
          <View style= {[LogoContainer, {backgroundColor: this.props.dashColor, flex :1}]}>
            <TouchableOpacity
              onPress={() => {
                alert("Coming Soon")
              // Actions.PostShow({ title: 'Github', uri: 'https://www.github.com/'})
              }
            }>
              <Ionicons name="ios-mail" size={dimension.height*.045} color='white'/>
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
    backgroundColor: 'black',
    alignItems: 'center',
    borderBottomColor: '#e0e6ed22',
  },
  textColor: {
    color: '#e0e6ed'
  },
  taglineContainer: {
    flex: .4,
    paddingBottom: "3%",
    alignItems: 'center',
    justifyContent: "flex-end",
  },
  fieldContainerStyle: {
    height: "100%",
    flexDirection: 'column',
    alignItems: "flex-start",
  },
  nameLabelText: {
    fontSize: dimension.height*.03,
    fontWeight: 'bold',
		color: '#fff',
		lineHeight: dimension.height * .03
  },
  itemLabelText: {
    fontSize: dimension.height*.02,
    fontWeight: 'bold',
		color: '#fff',
		lineHeight: dimension.height * .03
  },
  itemValueContainerStyle: {
    flexDirection:'row',
    justifyContent: 'center',
  },
  itemValueText: {
    fontSize: dimension.height*.019,
    fontWeight: '500',
		color: '#fff',
  },
  buttonsContainerStyle: {
    flex: .4,
  },
	LogoContainer: {
    flex: 1,
    alignItems: 'center',
		justifyContent: 'center',
	},
	socialmediarow: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "black"
	},
	bioContainer: {
    flex: .7,
    backgroundColor: '#21252b',
	},
	socialmediatext: {
		flex:1,
    alignSelf: 'center'
	},
});

const mapStateToProps = ({ user, general }) => {
  const { firstName, lastName, email, major, points, picture, quote, id, dashColor, flag} = user;
  const { loading } = general;

  return { firstName, lastName, email, major, points, picture, quote, loading, id, dashColor, flag};
};

const mapDispatchToProps = {
  loadUser,
  logoutUser,
  goToEditProfileForm,
  pageLoad,
  pictureChanged
 };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

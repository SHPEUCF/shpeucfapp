import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {Button, Spinner} from '../components/general'
import { goToEditOtherProfileForm, pageLoad } from '../actions';
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

class OtherProfile extends Component {
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
      logOutButtonContainer } = styles,
			dimension = Dimensions.get('window');
      const {goBack} = this.props.navigation;

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
               <Text
							 		style={{
										color: 'white',
										fontSize: 20,
										fontWeight: 'bold',
										textAlign: 'center'}}
										>{firstName + ' ' + lastName}</Text>
               <Text
							 		style={{
										color: 'white',
										fontSize: 16,
										textAlign: 'center',
										lineHeight: 25,
										width: dimension.width *.9}}
										>{quote}</Text>
            </View>
              {this.renderSocialMedia()}
          </View>
         <View style={{backgroundColor: '#0c0b0b'}}>
          <View style={contentContainerStyle}>
            <View style={contentItemsContainerStyle}>
              <View style={{ height: dimension.height *.1, backgroundColor: '#0c0b0b'}}>
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
					<View style={buttonsContainerStyle}>
              <Button
                title = "EDIT PROFILE"
                onPress={this.props.goToEditOtherProfileForm.bind(this)}
              />
              <Button
                title = "BACK TO LEADERBOARD"
                onPress={() => goBack()}
              />
          </View>
        </View>
        </ScrollView>
    )

  }
  renderSocialMedia(){
    return (
			<View style={styles.editLogoContainer}>
        <View style= {styles.editLogoContainer}>
          <TouchableOpacity
            onPress={() => Actions.PostShow({ title: 'Linkedin', uri: 'https://www.linkedin.com/'})}>
            <Ionicons name="logo-linkedin" size={40} color='#fff'/>
          </TouchableOpacity>
        </View>
        <View style={styles.editLogoContainer}>
          <TouchableOpacity
            onPress={() => Actions.PostShow({ title: 'Github', uri: 'https://www.github.com/'})}>
            <Ionicons name="logo-github" size={40} color='#fff'/>
          </TouchableOpacity>
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
    paddingTop: 30,
    paddingBottom: 50,
    backgroundColor: '#2C3239'
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
		height: 350,
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
    fontSize: 18,
    fontWeight: 'bold',
		color: '#fff',
		lineHeight: 26
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
		lineHeight: 26
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
    flex: 1,
		marginTop: 3,
		flexDirection: 'row',
		justifyContent: 'center'
	},
  logOutButtonContainer: {
    marginTop: 10,
    marginBottom: 60
  },
});

const mapStateToProps = ({ members, general }) => {
  const { firstName, lastName, email, major, points, picture, quote } = members;
  const { loading } = general;

  return { firstName, lastName, email, major, points, picture, quote, loading };
};

const mapDispatchToProps = {
  goToEditOtherProfileForm,
  pageLoad
 };

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);

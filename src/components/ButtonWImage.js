import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

const ButtonImage = ({ onPress, text, backgroundColor, image }) => {
  return (
<View style={{
    borderBottomWidth:2,
    flexDirection:'row',
    borderBottomColor:'rgba(60,60,61,0.25)',
    flex:1,
    height:40,
    justifyContent:'center',
    backgroundColor:backgroundColor
  }}>
  <TouchableOpacity style={{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      marginLeft:10,
      marginRight:10,
      }}
      onPress={onPress}>
    <View style={{
        flex:1,
        flexDirection:'row',
        alignItems:'center'}}>
      <View style={{
          flex:2,
          flexDirection:'row',
          marginLeft:10,}}>
          <View style={{
              flex:0,
              padding:5,
              backgroundColor:'#fdf7ff',
              borderRadius:50,
              borderWidth:3,
              borderColor:'rgba(0,0,0,0.1)',
          }}>
          <Image source={image}
            style={{
            flex:0,
            height:40,
            width:40
          }}/></View></View>
    <View style={{flex:1,
      flexDirection:'row',
      justifyContent:'flex-start'}}>
      <Text style={{
        textAlign:'left',
        fontSize:18,
        fontWeight:'600'}}>{text}</Text>
    </View>
    </View>
  </TouchableOpacity>
</View>
)
};
export default ButtonImage;

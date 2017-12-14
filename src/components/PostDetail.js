import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';

const PostDetail = ({ post }) => {
  const { title, description, imageurl } = post;
  const { postImageStyle,
          postImageContainerStyle,
          postContentStyle,
          postTitleStyle
           } = styles;

  return (
    <Card>
      <CardSection>
        <Image
          style={postImageStyle}
          source={{ uri: imageurl }} />
      </CardSection>
      <CardSection>
        <View style={postContentStyle}>
          <Text style={postTitleStyle}>{title}</Text>
          <Text>{description}</Text>
        </View>
      </CardSection>
    </Card>
  );
};

const styles = {
  postImageStyle: {
    height: 150,
    flex: 1,
    width: null
  },
  postImageContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  postContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  postTitleStyle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
}

export default PostDetail;

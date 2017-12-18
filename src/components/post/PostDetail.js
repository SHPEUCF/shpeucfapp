import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Card, CardSection } from '../general';

const PostDetail = ({ post }) => {
  const { title, description, imageurl } = post;
  const { postHeaderStyle,
          postSourceStyle,
          postSourceTextStyle,
          postMenuStyle,
          postImageStyle,
          postImageContainerStyle,
          postContentStyle,
          postTitleStyle
           } = styles;

  return (
    <Card>
      <CardSection>
        <View style={postHeaderStyle}>
          <View style={postSourceStyle}>
            <Text style={postSourceTextStyle}>Source:</Text>
            <Text>[SHPE UCF]</Text>
          </View>
          <View style={postMenuStyle}>
            <Text>...</Text>
          </View>
        </View>
      </CardSection>
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

const styles = StyleSheet.create({
  postHeaderStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    height: 45,
  },
  postSourceStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  postSourceTextStyle: {
    fontSize: 12,
    color: '#666',
    paddingRight: 5,
  },
  postMenuStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  postImageStyle: {
    flex: 1,
    height: 200,
    width: null
  },
  postContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 5,
  },
  postTitleStyle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export { PostDetail };

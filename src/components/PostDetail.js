import React, { Component } from 'react';
import { View, Text } from 'react-native';

const PostDetail = (props) => {
  return (
    <View>
      <Text>{props.post.title}</Text>
    </View>
  );
};

export default PostDetail;

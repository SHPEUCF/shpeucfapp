import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';

const PostDetail = ({ post }) => {
  const { title, description, imageurl } = post;

  return (
    <Card>
      <CardSection>
        <View>
          <Image source={{ uri: imageurl }} />
        </View>
        <View style={styles.headerContentStyle}>
          <Text>{title}</Text>
          <Text>{description}</Text>
        </View>
      </CardSection>
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
}

export default PostDetail;

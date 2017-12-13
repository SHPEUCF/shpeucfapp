import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';

const PostDetail = (props) => {
  return (
    <Card>
      <CardSection>
        <View>
        </View>
        <View style={styles.headerContentStyle}>
          <Text>{props.post.title}</Text>
          <Text>{props.post.body}</Text>
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

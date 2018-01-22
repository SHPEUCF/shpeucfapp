
import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {RkTheme, RkButton} from 'react-native-ui-kitten';
import { Card, CardSection, Button } from '../general';

const PostDetail = ({ post }) => {
  const { title, description, urlToImage, source, url, publishedAt } = post;

  return (
    <Card>
      <CardSection>
        <View style={styles.postHeaderStyle}>
          <View style={styles.postSourceStyle}>
            <Text style={styles.postSourceTextStyle}>Source:</Text>
            <Text>{source.name}</Text>
          </View>
          <View style={styles.postMenuStyle}>
            <Text>{publishedAt}</Text>
          </View>
        </View>
      </CardSection>
      <CardSection>
        <Image
          style={styles.postImageStyle}
          source={{ uri: urlToImage }}
          />
      </CardSection>
      <CardSection>
        <View style={styles.postContentStyle}>
          <Text style={styles.postTitleStyle}>{title}</Text>
          <Text>{description}</Text>
          <RkButton rkType='stretch outline'
            style={{ marginTop: 10, marginBottom: 10}}
            contentStyle={{fontWeight: 'bold'}}
            onPress={() => Actions.PostShow({ title: source.name, uri: url })}>
            Open
          </RkButton>
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
    marginBottom: 8,
  },
  postTitleStyle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export { PostDetail };

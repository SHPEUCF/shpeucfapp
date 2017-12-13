import React, { Component } from 'react';
import { View } from 'react-native';
import axios from 'axios';

import PostDetail from './PostDetail';


export default class PostList extends Component {
  state = { posts: [] };

  componentWillMount() {
      axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => this.setState({ posts: response.data}));
  }

  renderPosts() {
    return this.state.posts.map(post =>
      <PostDetail key={post.id} post={post} />
  );
}

  render() {
    console.log(this.state);
    return (
      <View>
        {this.renderPosts()}
      </View>
    );
  }
}

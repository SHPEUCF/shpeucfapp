import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';

import { PostDetail } from './PostDetail';

class PostList extends Component {
  state = { posts: [] };

  componentDidMount() {
    const url = 'https://newsapi.org/v2/everything?' +
              'q=tech&' +
              'sortBy=popularity&' +
              'language=en&' +
              'apiKey=c7fc6bd31a9b4ddd8c617c2bf9e82ebd';

    axios.get(url)
    .then(response => Promise.resolve(response))
    .then(response => new Promise(resolve => {
      setTimeout(() => {
        resolve(response);
        this.setState({posts: response.data.articles})
      }, 3000)
    }))
    .catch((error) => {console.log(error)});
  }

  renderPosts() {
    return this.state.posts.map((post, i) =>
      <PostDetail key={i} post={post} />
    );
  }

  render() {
    return (
      <ScrollView>
        {this.renderPosts()}
      </ScrollView>
    );
  }
}

export { PostList };

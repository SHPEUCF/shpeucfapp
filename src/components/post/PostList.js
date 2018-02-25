import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';

import { PostDetail } from './PostDetail';

class PostList extends Component {
  state = { posts: [] };

  componentDidMount() {
    const url = 'https://newsapi.org/v2/everything?' +
              'q=nasa,engineering&' +
              'sortBy=popularity&' +
              'language=en&' +
              'apiKey=4d7dea8dc4e24d7f98e8912afea15a49';

    axios.get(url)
    .then((response) => {this.setState({posts: response.data.articles})})
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

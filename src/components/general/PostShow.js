import React, { Component } from "react";
import { WebView } from "react-native";
import { Spinner } from "./Spinner";

class PostShow extends Component {
  render() {
    const { uri } = this.props;
    return <WebView source={{ uri }} renderLoading={() => <Spinner />} startInLoadingState />;
  }
}

export { PostShow };

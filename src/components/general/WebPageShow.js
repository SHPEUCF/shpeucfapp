import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { Spinner } from "./Spinner";
import { NavBar } from "./NavBar";
import { Actions } from "react-native-router-flux";

const WebPageShow = props => {
  const { uri } = props;
  return (
    <View style={{ flex: 1 }}>
      <NavBar back onBack={() => Actions.pop()} />
      <WebView source={{ uri }} renderLoading={() => <Spinner />} startInLoadingState />
    </View>
  );
};

export { WebPageShow };

import React, { Component } from "react";
import { Dimensions, View, Text, TouchableOpacity } from "react-native";

const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get("window");

class SegmentBtn extends Component {
  state = { toggle: true };

  renderScreenView() {
    if (this.state.toggle) {
      if (this.props.screen1 != null) 
        return <View style={{ flex: 1 }}>{this.props.screen1}</View>;
      else
        return (
          <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#96e4ff" }}>
            <Text style={{ textAlign: "center", padding: 50 }}>
              Please use the tag screen1 to pass a view for this screen.
            </Text>
          </View>
        );
    } else {
      if (this.props.screen2 != null) 
        return <View style={{ flex: 1 }}>{this.props.screen2}</View>;
      else
        return (
          <View style={{ flex: 1, backgroundColor: "#ffc196", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ textAlign: "center", padding: 50 }}>
              Please use the tag screen2 to pass a view for this screen.
            </Text>
          </View>
        );
    }
  }

  render() {
    const textColorLeft = this.state.toggle ? "white" : this.props.color != null ? this.props.color : "blue";
    const textColorRight = this.state.toggle ? (this.props.color != null ? this.props.color : "blue") : "white";
    const btnBackColorLeft = this.state.toggle ? (this.props.color != null ? this.props.color : "blue") : "white";
    const btnBackColorRight = this.state.toggle ? "white" : this.props.color != null ? this.props.color : "blue";

    return (
      <View style={{ flex: 1, width: D_WIDTH }}>
        <View style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ toggle: !this.state.toggle });
            }}
            style={{
              flex: 0,
              borderWidth: 2,
              borderColor: this.props.borderColor != null ? this.props.borderColor : "blue",
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              width: D_WIDTH / 4,
              height: D_HEIGHT / 20,
              backgroundColor: btnBackColorLeft,
              justifyContent: "center"
            }}>
            <Text style={{ fontWeight: "900", color: textColorLeft, textAlign: "center" }}>
              {this.props.leftText != null ? this.props.leftText : "Screen 1"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ toggle: !this.state.toggle });
            }}
            style={{
              flex: 0,
              borderWidth: 2,
              borderColor: this.props.borderColor != null ? this.props.borderColor : "blue",
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              width: D_WIDTH / 4,
              height: D_HEIGHT / 20,
              backgroundColor: btnBackColorRight,
              justifyContent: "center"
            }}>
            <Text style={{ fontWeight: "900", color: textColorRight, textAlign: "center" }}>
              {this.props.rightText != null ? this.props.rightText : "Screen 2"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>{this.renderScreenView()}</View>
      </View>
    );
  }
}

export { SegmentBtn };

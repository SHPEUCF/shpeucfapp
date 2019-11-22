import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  LayoutAnimation,
  DeviceEventEmitter,
  Alert
} from "react-native";
import { Card, Button, Divider } from "react-native-elements";
import Beacons from "react-native-beacons-manager";

const identity = "SHPEUCF_RadBeacon_Dot";
const uid = "2F234454-CF6D-4A0F-ADF2-F4911BA9FFA6";

class CheckIn extends Component {
  state = { beacons: [] };

  componentWillMount() {
    const region = { identifier: identity, uuid: uid };

    // Request for authorization while the app is open
    // Checking for both ios/android in case the app is ran on another OS
    if (Platform.OS === "android") Beacons.detectIBeacons();
    else if (Platform.OS === "ios") {
      Beacons.requestWhenInUseAuthorization();
      Beacons.startUpdatingLocation();
    }
    Beacons.startRangingBeaconsInRegion(region);
  }

  componentDidMount() {
    // Listen for beacon changes every time beacon emits (every second)
    this.subscription = DeviceEventEmitter.addListener("beaconsDidRange", data => {
      this.setState({ beacons: data.beacons });
    });
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  componentWillUnmount() {
    const region = { identifier: identity, uuid: uid };
    if (Platform.OS === "ios") {
      Beacons.requestWhenInUseAuthorization();
      Beacons.stopUpdatingLocation(region);
    }
    Beacons.stopRangingBeaconsInRegion(region);
    this.subscription.remove();
  }

  render() {
    const {
      cardContainer,
      eventInfoContainer,
      eventInfoRow,
      infoLabel,
      infoValue,
      signalInfoLabel
    } = styles;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Card title="First GBM" containerStyle={cardContainer}>
            <View style={eventInfoContainer}>
              <View style={eventInfoRow}>
                <Text style={infoLabel}>{"Event Date: "}</Text>
                <Text style={infoValue}>01/22/2018</Text>
              </View>
              <View style={eventInfoRow}>
                <Text style={infoLabel}>{"Location: "}</Text>
                <Text style={infoValue}>HEC-101</Text>
              </View>
            </View>

            {this.state.beacons.map((beacon, i) => (
              <View key={i} style={{ marginBottom: 10 }}>
                <Divider style={{ marginBottom: 10 }} />
                <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>
                  Beacon Information
                </Text>
                <Text style={signalInfoLabel}>Proximity: {beacon.proximity}</Text>
                <Text style={signalInfoLabel}>RSSI (signal strength): {beacon.rssi}</Text>
              </View>
            ))}

            <Button
              title="Check In"
              icon={{ name: "tap-and-play", color: "#000" }}
              backgroundColor="#FECB00"
              color="#000"
              fontSize={15}
              padding={10}
              onPress={() =>
                Alert.alert(
                  "Event Signal Not Found",
                  "Must be in event to check in or please talk to SHPE representative."
                )
              }
            />
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  cardContainer: { marginRight: 5, marginLeft: 5, marginTop: 5 },
  eventInfoContainer: { marginBottom: 10 },
  eventInfoRow: { marginBottom: 10, flexDirection: "row" },
  infoLabel: { fontSize: 15, fontWeight: "bold" },
  infoValue: { fontSize: 15, fontWeight: "normal" },
  signalInfoLabel: { marginBottom: 10, marginLeft: 10, color: "#666", fontWeight: "bold" }
});

export { CheckIn };

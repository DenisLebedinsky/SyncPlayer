import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Slider,
  Dimensions
} from "react-native";

import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

const soundObject = new Audio.Sound();

soundObject.loadAsync(require("../assets/music/metallica.mp3"));

let interval;

export default function Player() {
  const [status, setStatus] = useState(0);
  const [maxDuration, setMaxDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const changeStatusPlay = async () => {
    if (isPlaying) {
      //STOP
      try {
        setIsPlaying(false);
        clearInterval(interval);
        await soundObject.stopAsync();
      } catch (error) {
        // An error occurred!
      }
    } else {
      //PLAY
      try {
        await soundObject.playAsync();
        setIsPlaying(true);
        interval = setInterval(getStatus, 500);
      } catch (error) {
        // An error occurred!
      }
    }
  };

  const getStatus = async () => {
    const currentStatus = await soundObject.getStatusAsync();

    if (currentStatus.isLoaded) {
      setStatus(currentStatus.positionMillis);
      setMaxDuration(currentStatus.durationMillis);
    }
  };

  const changePosition = millis => {
    try {
      soundObject.setPositionAsync(millis);
    } catch (error) {
      // An error occurred!
    }
  };

  useEffect(() => {
    getStatus();
  });

  return (
    <View style={styles.container}>
      <View style={styles.player}>
        <View style={styles.controllGroup}>
          <View style={styles.btn}>
            <TouchableOpacity>
              <MaterialIcons
                name="fast-rewind"
                size={40}
                color="#56D5FA"
                style={styles.btnPlay}
              />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={changeStatusPlay}>
              {isPlaying ? (
                <MaterialIcons name="pause" size={40} color="#56D5FA" />
              ) : (
                <MaterialIcons name="play-arrow" size={40} color="#56D5FA" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.btn}>
            <TouchableOpacity>
              <MaterialIcons name="fast-forward" size={40} color="#56D5FA" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Slider
            style={styles.progress}
            minimumValue={0}
            maximumValue={maxDuration}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
            value={status}
            onValueChange={changePosition}
          />
        </View>

        <View />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  player: {},
  controllGroup: {
    flex: 0,
    flexDirection: "row",
    height: 70,
    alignItems: "center"
  },
  btn: {
    marginHorizontal: 50
  },
  btnPlay: {},
  progressBar: {
    width: 200
  },
  progress: {
    width: DEVICE_WIDTH - 80
  }
});

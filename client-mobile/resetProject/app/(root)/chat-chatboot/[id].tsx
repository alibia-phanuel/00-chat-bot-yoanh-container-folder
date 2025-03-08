import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
const ChatBoot = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>ChatBoot {id} </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ChatBoot;

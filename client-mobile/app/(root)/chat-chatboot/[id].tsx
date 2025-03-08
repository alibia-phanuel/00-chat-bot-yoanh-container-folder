import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
const Useris = () => {
  const { id } = useLocalSearchParams();
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Details of user new {id} </Text>
    </View>
  );
};

export default Useris;

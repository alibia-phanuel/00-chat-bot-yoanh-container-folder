import React, { useState, useCallback, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";

import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { icons } from "@/constants/index";

const ChatMessage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-red-400">
      {/** Render Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomColor: "#c3c3c3",
          borderBottomWidth: 0.2,
        }}
        className="bg-white px-10 py-10 border-b-2 border-gray-200 shadow-md"
      >
        {/**leftContent */}
        <View className="flex flex-row justify-center items-center gap-2">
          <TouchableOpacity
            onPress={() => router.push(`/(root)/(tabs)/home`)}
            style={{ marginHorizontal: 12 }}
          >
            <Image
              style={{ width: 25, height: 25 }}
              source={icons.backArrow}
            ></Image>
          </TouchableOpacity>
          <View className="flex flex-row justify-center items-center gap-2">
            {/**profil */}
            <View className="relative">
              <Image
                source={require("@/assets/images/user2.jpeg")}
                style={{ height: 40, width: 40, borderRadius: 40 / 2 }}
              />
              <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></View>
            </View>
            <View>
              <Text className="text-lg font-JakartaBold text-gray-600">
                {id}
              </Text>
              <Text className="text-sm text-gray-600">En ligne</Text>
            </View>
          </View>
        </View>
        {/**RightContent */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={{ marginHorizontal: 16 }}>
            <Feather name="video" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="phone" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      {/**Render nput bar */}

      {/**Render */}

      <ImageBackground
        source={require("@/assets/images/background.jpeg")} // Remplace par ton image locale ou une URL
        style={styles.backgroundImage}
        resizeMode="cover" // "cover" permet d'adapter l'image à la taille de l'écran >
      ></ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center", // Centrer le contenu dans l'image de fond
  },
  inputContainer: {
    backgroundColor: "#fff",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(128,128,128,.4)",
  },
  inputMesageContainer: {
    height: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    color: "#000",
    flex: 1,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 999,
    marginHorizontal: 6,
  },
});

export default ChatMessage;

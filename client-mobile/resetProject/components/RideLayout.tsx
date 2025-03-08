import { icons } from "@/constants";
import React, { ReactNode, useRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Map from "./Map";

type RideLayoutProps = {
  children: ReactNode;
  title: string;
  snapPoints?: string[];
};
const RideLayout = ({ children, title, snapPoints }: RideLayoutProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  // variables

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-white">
        <View className="flex flex-col h-screen bg-blue-500">
          <View className="flex flex-row absolute z-10  top-16 items-center justify-start px-5">
            <TouchableOpacity>
              <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                <Image
                  source={icons.backArrow}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            <Text className="text-xl font-semibold ml-5">
              {title || "Go Back"}
            </Text>
          </View>
          <Map></Map>
        </View>
        <BottomSheet
          snapPoints={snapPoints || ["40%", "85%"]}
          ref={bottomSheetRef}
          index={1}
        >
          <BottomSheetView
            style={{
              flex: 1,
              padding: 20,
            }}
          >
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;

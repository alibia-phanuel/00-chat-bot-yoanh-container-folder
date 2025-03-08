import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="text-red-900">Welcome!</Text>
    </SafeAreaView>
  );
}

import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import { router } from "expo-router";
import { icons } from "@/constants";
const handleSignOut = () => {
  router.replace("/(auth)/sign-in");
};
const Profile = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="text-2xl font-JakartaBold my-5">Mon profil</Text>

        <View className="flex items-center justify-center my-5">
          <Image
            source={require("@/assets/images/utilisateur.png")}
            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
            className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
          />
        </View>

        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <View className="flex flex-col items-start justify-start w-full">
            <InputField
              label="Prénom"
              placeholder={"yoanh"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Email"
              placeholder={"hamedsoumahorofbk@gmail.com"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
          </View>

          <TouchableOpacity
            onPress={handleSignOut}
            className="  items-center flex-row gap-2 my-4 py-3 justify-center px-5  rounded-full bg-[#F47040] w-full"
          >
            <Image source={icons.out} className="w-4 h-4" />

            <Text className="text-white font-JakartaSemiBold">
              Se déconnecter
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

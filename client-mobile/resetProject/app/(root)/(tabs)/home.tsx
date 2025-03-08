import {
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { messsagesData } from "@/data/index";
import { useState } from "react";

const Home = () => {
  const router = useRouter();
  const [search, setSeach] = useState("");
  const [filterUsers, setFilterUsers] = useState(messsagesData);
  const handleSearch = (text: string) => {
    setSeach(text);
    const filteredUsers = messsagesData.filter((user) =>
      user.fullName.toLowerCase().includes(text.toLowerCase())
    );
    setFilterUsers(filteredUsers);
  };
  /***
   * @Render Chat Content
   */
  const renderContent = () => {
    return (
      <View>
        <View className="relative ">
          <View>
            <Text className="text-xl font-JakartaBold  relative top-4">
              Messageries interne
            </Text>
          </View>
          <TouchableOpacity className="flex flex-row items-center  bg-[#fff] shadow-md rounded-[10px] w-full h-[50px] my-[22px] px-[10px]">
            <Ionicons name="search" size={24} className="text-gray-600" />
            <TextInput
              className="flex-1 h-full mx-[12px] "
              placeholder="Rechercher un contact...."
              value={search}
              onChangeText={handleSearch}
            />
            <TouchableOpacity>
              <Image
                source={require("@/assets/icons/edit.png")}
                className="text-gray-600 h-8 w-8"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        {/**Render FlatList for chats */}
        <View className="mb-[400px] relative top-[1%]">
          <FlatList
            data={filterUsers}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                onPress={() => router.push(`/chat-message/${item.fullName}`)}
                style={[
                  styles.userContainer,
                  index % 2 !== 0 && styles.oddBackground, // Alterne le style pour les lignes impaires
                ]}
                className="py-[25px] px-2 relative"
              >
                <View style={styles.userContainer}>
                  {item.isOnline === true && (
                    <View style={styles.onlineIndicator} />
                  )}
                  <Image source={item.userImg} style={styles.userImage} />
                </View>
                <View style={{ flexDirection: "row", width: "100%" }}>
                  <View className="w-full relative right-[85%]">
                    <Text style={styles.userName}>{item.fullName}</Text>
                    <Text style={styles.lastSeen}>{item.lastMessage}</Text>
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      right: 4,
                      alignItems: "center",
                      backgroundColor: "#E2E8F0",
                    }}
                  >
                    <Text style={styles.lastMessageTime}>
                      {item.lastMessageTime}
                    </Text>
                    <View>
                      <TouchableOpacity
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 20 / 2,
                          backgroundColor: item.messageInQueue
                            ? "#E2E8F0"
                            : "Transparent",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 12,
                        }}
                      >
                        <Text style={styles.messageInQueue}>
                          {item.messageInQueue}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-gray-100  flex-1">
      <StatusBar hidden />
      <View className="flex-1 p-[16px] ">{renderContent()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#fff",
  },
  // style du listing de contact chat
  oddBackground: {
    backgroundColor: "#fff",
  },

  onlineIndicator: {
    height: 14,
    width: 14,
    borderRadius: 14 / 2,
    backgroundColor: "#07B4FF",
    position: "absolute",
    top: 14,
    right: 2,
    zIndex: 999,
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  },
  userInfoContainer: {
    flexDirection: "column",
  },
  userName: {
    fontSize: 14,
    fontFamily: "semibold",
    color: "#000",
  },
  lastSeen: {
    fontSize: 12,
    color: "#c4c4c4",
  },
  lastMessageTime: {
    fontSize: 12,
    color: "#000",
  },
  messageInQueue: {
    fontSize: 12,
    fontFamily: "regular",
  },
});

export default Home;

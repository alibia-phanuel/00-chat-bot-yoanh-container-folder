import { Stack } from "expo-router";
import React from "react";
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="chat-chatboot/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="chat-message/[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;

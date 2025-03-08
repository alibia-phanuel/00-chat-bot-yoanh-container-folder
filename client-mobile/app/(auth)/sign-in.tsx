import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
// import axios from "axios";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!form.email || !form.password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return false;
    }
    // Vérifier si l'email est valide
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      Alert.alert("Erreur", "Veuillez entrer une adresse e-mail valide.");
      return false;
    }
    return true;
  };

  const onSignInPress = useCallback(async () => {
    // console.log("Bouton pressé !");
    if (!validateForm()) return;
    setLoading(true);
    try {
      Alert.alert("Succès", "Connexion réussie !");
      router.replace("/(root)/(tabs)/chats");
    } catch (error) {
      console.log("Erreur API:", error);
      Alert.alert("Erreur", "Échec de la connexion.");
    } finally {
      setLoading(false);
    }
  }, [form]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // Ajuste la valeur en fonction de ton header ou de ton layout
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        className="flex-1 bg-white"
      >
        <View className="flex-1 bg-white">
          <View className="relative w-full h-[250px]">
            <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
            <Text className="text-2xl text-white font-JakartaSemiBold absolute bottom-5 left-[25%]">
              Bienvenue à vous ! 👋
            </Text>
          </View>

          <View className="p-5 relative top-20">
            <InputField
              label="E-mail"
              placeholder="Saisir l'adresse électronique"
              icon={icons.email}
              textContentType="emailAddress"
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
            />

            <InputField
              label="Mot de passe"
              placeholder="Saisir le mot de passe"
              icon={icons.lock}
              secureTextEntry={true}
              textContentType="password"
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
            />

            <CustomButton
              title={loading ? "Connexion..." : "Se connecter"}
              onPress={onSignInPress}
              className="mt-6"
              disabled={loading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

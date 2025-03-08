import { Pressable, Text, StyleSheet, View } from "react-native";
import React from "react";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return styles.secondary;
    case "danger":
      return styles.danger;
    case "success":
      return styles.success;
    case "outline":
      return styles.outline;
    default:
      return styles.primary;
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return styles.textPrimary;
    case "secondary":
      return styles.textSecondary;
    case "danger":
      return styles.textDanger;
    case "success":
      return styles.textSuccess;
    default:
      return styles.textDefault;
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  style,
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, getBgVariantStyle(bgVariant), style]}
      {...props}
    >
      {IconLeft && <View style={styles.icon}>{<IconLeft />}</View>}
      <Text style={[styles.text, getTextVariantStyle(textVariant)]}>
        {title}
      </Text>
      {IconRight && <View style={styles.icon}>{<IconRight />}</View>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 999,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  primary: { backgroundColor: "#0286FF" },
  secondary: { backgroundColor: "#6b7280" },
  danger: { backgroundColor: "#ef4444" },
  success: { backgroundColor: "#10b981" },
  outline: {
    backgroundColor: "transparent",
    borderColor: "#d1d5db",
    borderWidth: 0.5,
  },
  text: { fontSize: 18, fontWeight: "bold" },
  textDefault: { color: "#fff" },
  textPrimary: { color: "#000" },
  textSecondary: { color: "#f3f4f6" },
  textDanger: { color: "#fee2e2" },
  textSuccess: { color: "#d1fae5" },
  icon: { marginHorizontal: 5 },
});

export default CustomButton;

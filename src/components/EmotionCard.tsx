
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type EmotionCardProps = {
  emotion: string;
  description: string;
};

const EmotionCard: React.FC<EmotionCardProps> = ({ emotion, description }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.emotion}>{emotion}</Text>
      <Text>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#AFB7E5",
    opacity: 0.5,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  emotion: {
    fontWeight: "bold",
  },
});

export default EmotionCard;

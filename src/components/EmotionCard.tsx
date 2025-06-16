import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type EmotionCardProps = {
  id: number;
  emotion: string;
  description: string;
  date: string;
  showActions?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
};

const EmotionCard: React.FC<EmotionCardProps> = ({
  id,
  emotion,
  description,
  date,
  showActions = false,
  onDelete,
  onEdit,
}) => {
  const handleDelete = () => {
    Alert.alert("Confirmação", "Deseja excluir essa entrada?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => onDelete?.(id) },
    ]);
  };

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.emotion}>{emotion}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      {showActions && (
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit?.(id)}>
            <Ionicons name="create-outline" size={24} color="#7F7F9A" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={{ marginLeft: 12 }}>
            <Ionicons name="trash-outline" size={24} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#DADCF4",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  emotion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3C3C50",
  },
  description: {
    fontSize: 14,
    color: "#3C3C50",
  },
  date: {
    fontSize: 12,
    color: "#7F7F9A",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default EmotionCard;

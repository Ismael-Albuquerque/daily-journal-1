import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import EmotionCard from "../components/EmotionCard";
import EmotionsRepository from "../database/EmotionsRepository";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "expo-router";
import { Emotions } from "../types/Emotions";

export default function Historico() {
  const [entries, setEntries] = useState<Emotions[]>([]);
  const { user, logout } = useAuthStore();
  const emotionsRepository = new EmotionsRepository();
  const router = useRouter();

  useEffect(() => {
    loadEntries();
  }, [user]);

  const loadEntries = async () => {
    if (!user) return;
    const allEntries = await emotionsRepository.all();
    const userEntries = allEntries.filter((e) => e.user_id === user.id);
    const ordered = userEntries.sort(
      (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
    );
    setEntries(ordered);
  };

  const handleDelete = async (id: number) => {
    Alert.alert("Confirmação", "Deseja excluir esta entrada?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await emotionsRepository.delete(id);
          await loadEntries();
        },
      },
    ]);
  };

  const handleEdit = (id: number) => {
    router.push(`/editar-entrada/${id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>HISTÓRICO</Text>
      </View>

      {entries.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma entrada encontrada.</Text>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id!.toString()}
          renderItem={({ item }) => (
            <EmotionCard
              id={item.id!}
              emotion={item.emocao}
              description={item.descricao}
              date={item.data}
              showActions
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backText}>VOLTAR</Text>
      </TouchableOpacity>

      <Image
        source={require("../../assets/Logotipo_journal.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    justifyContent: "space-between",

    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8896E1",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  backText: {
    color: "#8896E1",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  logoutText: {
    color: "#8896E1",
    fontWeight: "bold",
  },
  emptyText: {
    color: "#9DB3C6",
    marginBottom: 10,
    textAlign: "center",
  },
  listContent: {
    gap: 16,
    paddingBottom: 60,
  },
  logo: {
    marginTop: 10,
    width: 100,
    height: 100,
    marginBottom: 40,
    alignSelf: "center",
    opacity: 1,
  },
});

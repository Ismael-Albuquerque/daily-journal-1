import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { addDays, format, startOfWeek } from "date-fns";
import { Ionicons } from "@expo/vector-icons";

import EmotionsRepository from "../database/EmotionsRepository";
import { Emotions } from "../types/Emotions";
import { useAuthStore } from "../store/useAuthStore";

import EmotionCard from "../components/EmotionCard";
import WeekDaySelector from "../components/WeekDaySelector";

const HomeScreen = () => {
  const router = useRouter();
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(format(today, "yyyy-MM-dd"));
  const [entries, setEntries] = useState<Emotions[]>([]);

  const { user, logout } = useAuthStore();
  const emotionsRepository = new EmotionsRepository();

  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  useEffect(() => {
    const fetchEntries = async () => {
      if (!user) return;
      const allEntries = await emotionsRepository.all();
      const userEntries = allEntries.filter((e) => e.user_id === user.id);
      const lastThree = userEntries.slice(-3).reverse();
      setEntries(lastThree);
    };

    fetchEntries();
  }, [user]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
     <View style={styles.header}>
  <Text style={styles.greeting}>OLÁ, {user?.nome?.toUpperCase() || "USUÁRIO"}!</Text>
  <TouchableOpacity
    onPress={() => {
      logout();
      router.replace("/");
    }}
  >
    <Ionicons name="log-out-outline" size={30} color="#8896E1" />
  </TouchableOpacity>
</View>

      <WeekDaySelector
        dates={weekDates}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <Text style={styles.subtitle}>COMO VOCÊ ESTÁ SE SENTINDO HOJE?</Text>

      <TouchableOpacity
        style={styles.newEntryButton}
        onPress={() => router.push("/nova-entrada")}
      >
        <Text style={styles.newEntryButtonText}>NOVA ENTRADA</Text>
      </TouchableOpacity>

      <Text style={styles.historyTitle}>HISTÓRICO RECENTE</Text>

      {entries.length === 0 ? (
        <Text style={{ color: "#9DB3C6", marginBottom: 10 }}>
          Nenhuma entrada.
        </Text>
      ) : (
        entries.map((entry) => (
          <EmotionCard
            key={entry.id}
            emotion={entry.emocao}
            description={entry.descricao}
          />
        ))
      )}

      <TouchableOpacity onPress={() => router.push("/historico")}>
        <Text style={styles.seeMore}>VER MAIS</Text>
      </TouchableOpacity>

      <Image
        source={require("../../assets/Logotipo_journal.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
  marginTop: 40,
},
  greeting: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8896E1",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
   logoutIcon: {
    position: "absolute",
  top: 40,
  right: 30,
},
  subtitle: {
    color: "#8896E1",
    fontWeight: "bold",
    marginBottom: 30,
  },
  newEntryButton: {
    backgroundColor: "#82C0D1",
    width: 200,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#82C0D1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  newEntryButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
  historyTitle: {
    color: "#8896E1",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  seeMore: {
    color: "#8896E1",
    alignSelf: "flex-end",
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    marginTop: 10,
    width: 100,
    height: 100,
    marginBottom:40,
    opacity: 1,
  },
});

export default HomeScreen;

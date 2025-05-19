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
import { ptBR } from "date-fns/locale";
import { LocaleConfig } from "react-native-calendars";


import EmotionsRepository from "../database/EmotionsRepository";
import { useAuthStore } from "../store/useAuthStore";
import { Emotions } from "../types/Emotions";


// Configuração de idioma para calendário
LocaleConfig.locales["pt"] = {
  monthNames: [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ],
  monthNamesShort: [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez",
  ],
  dayNames: [
    "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado",
  ],
  dayNamesShort: ["D", "S", "T", "Q", "Q", "S", "S"],
  today: "Hoje",
};
LocaleConfig.defaultLocale = "pt";


const HomeScreen = () => {
  const router = useRouter();
  const today = new Date();


  const { user, logout } = useAuthStore();
  const userId = user?.id;


  const [selectedDate, setSelectedDate] = useState(format(today, "yyyy-MM-dd"));
  const [entries, setEntries] = useState<Emotions[]>([]);


  const emotionsRepository = new EmotionsRepository();


  useEffect(() => {
    const fetchEntries = async () => {
      if (!userId) return;


      const allEntries = await emotionsRepository.all();
      const filtered = allEntries
        .filter((entry) => entry.user_id === userId)
        .slice(-3)
        .reverse();
      setEntries(filtered);
    };


    fetchEntries();
  }, [userId]);


  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>OLÁ, {user?.nome.toUpperCase() || "USUÁRIO"}!</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            logout();
            router.replace("/");
          }}
        >
          <Text style={styles.logoutText}>SAIR</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.weekContainer}>
        {weekDates.map((date, index) => {
          const dateStr = format(date, "yyyy-MM-dd");
          const isSelected = selectedDate === dateStr;


          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayContainer,
                isSelected && styles.selectedDayContainer,
              ]}
              onPress={() => setSelectedDate(dateStr)}
            >
              <Text style={styles.dayLabel}>
                {format(date, "EEEEE", { locale: ptBR })}
              </Text>
              <Text
                style={[styles.dayNumber, isSelected && styles.selectedDayText]}
              >
                {format(date, "d")}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>


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
          <View key={entry.id} style={styles.historyBox}>
            <Text style={{ fontWeight: "bold" }}>{entry.emocao}</Text>
            <Text>{entry.descricao}</Text>
          </View>
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
    marginBottom: 30,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8896E1",
  },
  logoutButton: {
    backgroundColor: "#B49EFE",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    shadowColor: "#B49EFE",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  logoutText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 40,
  },
  dayContainer: {
    alignItems: "center",
    width: 35,
    padding: 5,
    borderRadius: 20,
  },
  selectedDayContainer: {
    backgroundColor: "#B49EFE",
  },
  dayLabel: {
    color: "#B4C7DD",
    fontSize: 12,
    marginBottom: 2,
  },
  dayNumber: {
    fontSize: 14,
    color: "#9DB3C6",
    fontWeight: "bold",
  },
  selectedDayText: {
    color: "#ffffff",
  },
  subtitle: {
    color: "#8896E1",
    fontWeight: "bold",
    marginBottom: 40,
  },
  newEntryButton: {
    backgroundColor: "#82C0D1",
    width: 200,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 40,
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
  historyBox: {
    width: "100%",
    backgroundColor: "#AFB7E5",
    opacity: 0.5,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  seeMore: {
    color: "#8896E1",
    alignSelf: "flex-end",
    marginTop: 10,
    marginBottom: 30,
  },
  logo: {
    marginTop: 30,
    marginBottom:50,
    width: 100,
    height: 100,
    opacity: 1,
  },
});


export default HomeScreen;




// app/editar-entrada/[id].tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { format, startOfWeek, addDays } from "date-fns";

import { useAuthStore } from "../../store/useAuthStore";
import EmotionsRepository from "../../database/EmotionsRepository";
import WeekDaySelector from "../../components/WeekDaySelector";
import { Emotions } from "../../types/Emotions";

const emotionOptions = ["😀", "😍", "🙂", "☹️", "😡"];

export default function EditarEntrada() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuthStore();
  const emotionsRepository = new EmotionsRepository();

  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const entries = await emotionsRepository.all();
      const current = entries.find((e) => e.id === Number(id));

      if (!current) {
        Alert.alert("Erro", "Entrada não encontrada.");
        router.back();
        return;
      }

      setSelectedEmotion(current.emocao);
      setDescription(current.descricao);
      setSelectedDate(current.data);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleUpdate = async () => {
    if (!user) return;

    if (!selectedEmotion || !description) {
      Alert.alert(
        "Erro",
        "Por favor, selecione uma emoção e escreva uma descrição."
      );
      return;
    }

    try {
      await emotionsRepository.update({
        id: Number(id),
        user_id: user.id!,
        data: selectedDate,
        emocao: selectedEmotion,
        descricao: description,
      });

      Alert.alert("Sucesso", "Entrada atualizada com sucesso!");
      router.replace("/historico");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a entrada.");
    }
  };

  if (loading) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>EDITAR ENTRADA</Text>

      <WeekDaySelector
        dates={weekDates}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <Text style={styles.label}>SELECIONE UMA EMOÇÃO:</Text>
      <View style={styles.emotionsContainer}>
        {emotionOptions.map((emo) => (
          <TouchableOpacity
            key={emo}
            style={[
              styles.emojiButton,
              selectedEmotion === emo && styles.emojiSelected,
            ]}
            onPress={() => setSelectedEmotion(emo)}
          >
            <Text style={styles.emoji}>{emo}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>DESCREVA SEU DIA:</Text>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={5}
        placeholder="Escreva aqui..."
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.saveButtonText}>ATUALIZAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.cancelText}>CANCELAR</Text>
      </TouchableOpacity>

      <Image
        source={require("../../../assets/Logotipo_journal.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#8896E1",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 30,
    alignSelf: "flex-start",
    marginTop: 40,
  },
  label: {
    color: "#8896E1",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: 30,
    marginBottom: 10,
  },
  emotionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  emojiButton: {
    padding: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "transparent",
  },
  emojiSelected: {
    borderColor: "#8896E1",
  },
  emoji: {
    fontSize: 30,
  },
  textArea: {
    width: "100%",
    minHeight: 120,
    borderRadius: 10,
    backgroundColor: "#E4E8FC",
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#82C0D1",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    shadowColor: "#82C0D1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
  cancelText: {
    color: "#8896E1",
    alignSelf: "flex-end",
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    marginTop: 10,
    width: 100,
    height: 100,
    marginBottom: 40,
    opacity: 1,
  },
});

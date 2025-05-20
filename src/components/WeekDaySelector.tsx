
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type WeekDaySelectorProps = {
  dates: Date[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

const WeekDaySelector: React.FC<WeekDaySelectorProps> = ({
  dates,
  selectedDate,
  onSelectDate,
}) => {
  return (
    <View style={styles.container}>
      {dates.map((date, index) => {
        const dateStr = format(date, "yyyy-MM-dd");
        const isSelected = selectedDate === dateStr;

        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayContainer,
              isSelected && styles.selectedDayContainer,
            ]}
            onPress={() => onSelectDate(dateStr)}
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
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default WeekDaySelector;

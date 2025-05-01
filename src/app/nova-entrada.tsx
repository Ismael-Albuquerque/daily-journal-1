import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function NovaEntrada() {
  return (
    <View>
      <Text>Tela de Nova Entrada</Text>
      <Link href={"/home"}>Voltar para tela inicial</Link>
      <Link href={"/historico"}>Ver mais</Link>
    </View>
  );
}

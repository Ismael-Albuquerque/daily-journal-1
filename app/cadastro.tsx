import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Cadastro() {
  return (
    <View>
      <Text>Tela de Cadastro</Text>
      <Link href={"/home"}>ir para home</Link>
    </View>
  );
}

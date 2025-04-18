import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View>
      <Text>Tela Inicial</Text>
      <Link href={"/nova-entrada"}>Adicionar nova-entrada</Link>
    </View>
  );
}

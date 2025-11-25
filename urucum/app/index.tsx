import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BarraDePesquisa from "./components/BarraDePesquisa";


export default function TelaPrincipal() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BarraDePesquisa />
    </SafeAreaView>
  );
}

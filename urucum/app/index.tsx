import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BarraDePesquisa from "./components/barraDePesquisa";


export default function TelaPrincipal() {
  return (
    <SafeAreaView>
      <BarraDePesquisa />
    </SafeAreaView>
  );
}

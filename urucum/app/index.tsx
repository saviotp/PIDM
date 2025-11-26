import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BarraDePesquisa from "./components/BarraDePesquisa";
import BarraDeInput from "./components/BarraDeInput";


export default function TelaPrincipal() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BarraDeInput value={undefined} onChangeText={undefined} />
      <BarraDeInput value={undefined} onChangeText={undefined} />
    </SafeAreaView>
  );
}

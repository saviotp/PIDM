import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BarraDePesquisa from "./components/BarraDePesquisa";
import BarraDeInput from "./components/BarraDeInput";
import Botao from "./components/Botao";


export default function TelaPrincipal() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Botao titulo={"Entrar"} aoPressionar={() => {}} />
    </SafeAreaView>
  );
}

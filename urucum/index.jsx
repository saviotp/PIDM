import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BarraDePesquisa from "./componentes/BarraDeNavegacao";
import BarraDeInput from "./componentes/BarraDeInput";
import Botao from "./componentes/Botao";
import PaginaLogin from "./telas/PaginaLogin";
import PaginaCadastro from "./telas/PaginaCadastro";
import PaginaEditarPerfil from "./telas/PaginaEditarPerfil";
import AdicionarObraOuColecao from "./componentes/AdicionarObraOuColecao";
import Perfil from "./componentes/Perfil";
import PaginaInicial from "./telas/PaginaInicial";


export default function TelaPrincipal() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaginaLogin />
    </SafeAreaView>
  );
}

import { View } from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons as Icon} from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import BarraDePesquisa from "./componentes/BarraDeNavegacao";
import PaginaInicial from "./telas/PaginaInicial";
import PaginaEditarPerfil from "./telas/PaginaEditarPerfil";
import PaginaPerfil from "./telas/PaginaPerfil";
import VisualizarObraOuColecao from "./telas/VisualizarObra";
import VisualizarColecao from "./telas/VisualizarColecao";
import VisualizarObra from "./telas/VisualizarObra";
import PaginaCadastro from "./telas/PaginaCadastro";
import PaginaLogin from "./telas/PaginaLogin";

function InicioStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PaginaInicial" component={PaginaInicial} />
      <Stack.Screen name="PaginaPerfil" component={PaginaPerfil} />
      <Stack.Screen name="VisualizarObraOuColecao" component={VisualizarObraOuColecao} />
      <Stack.Screen name="VisualizarColecao" component={VisualizarColecao} />
      <Stack.Screen name="VisualizarObra" component={VisualizarObra} />
      <Stack.Screen name="PaginaCadastro" component={PaginaCadastro} />
      <Stack.Screen name="PaginaLogin" component={PaginaLogin} />
      <Stack.Screen name="PaginaEditarPerfil" component={PaginaEditarPerfil} />
    </Stack.Navigator>
  );
}

export default function TelaPrincipal() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Inicio"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#FFD2B3",
            borderTopWidth: 0,
          },
          tabBarItemStyle: {
            paddingVertical: 6,
            gap: 4,
          },
          tabBarActiveTintColor: "#AA0000",
          tabBarInactiveTintColor: "#9e6464ff",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;

            if (route.name === "Inicio") {
              iconName = "home";
            } else if (route.name === "Buscar") {
              iconName = "search";
            } else if (route.name === "Perfil") {
              iconName = "account-circle";
            }

            return (
              <View style={{ alignItems: "center" }}>
                {focused && (
                  <View
                    style={{
                      width: 100,
                      height: 4,
                      backgroundColor: "#AA0000",
                      borderRadius: 4,
                      marginBottom: 4,
                    }}
                  />
                )}
                <Icon name={iconName} size={size} color={color} />
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Inicio" component={InicioStack} />
        <Tab.Screen name="Buscar" component={BarraDePesquisa} />
        <Tab.Screen name="Perfil" component={PaginaEditarPerfil} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
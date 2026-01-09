import { View } from "react-native";
import { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Contexts
import { useTema } from '../contexts/TemaContext';
import { useUsuario } from '../contexts/UsuarioContext';

// Screens
import { PaginaInicial, VisualizarObra, VisualizarColecao } from '../screens/home';
import { PaginaPerfil, PaginaEditarPerfil } from '../screens/profile';
import { PaginaLogin, PaginaCadastro } from '../screens/auth';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

// Stack para telas dentro da aba Início
function InicioStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PaginaInicial" component={PaginaInicial} />
            <Stack.Screen name="PaginaPerfil" component={PaginaPerfil} />
            <Stack.Screen name="VisualizarObraOuColecao" component={VisualizarObra} />
            <Stack.Screen name="VisualizarColecao" component={VisualizarColecao} />
            <Stack.Screen name="VisualizarObra" component={VisualizarObra} />
        </Stack.Navigator>
    );
}

// Componente wrapper que verifica se o usuário está logado
function PerfilComVerificacao({ navigation }) {
    const { usuario } = useUsuario();

    useEffect(() => {
        if (!usuario) {
            navigation.getParent()?.reset({
                index: 0,
                routes: [{ name: 'PaginaCadastro' }],
            });
        }
    }, [usuario, navigation]);

    if (!usuario) {
        return null;
    }

    return <PaginaEditarPerfil />;
}

// Tab Navigator principal do app
export function TabNavigator() {
    const { cores } = useTema();
    const insets = useSafeAreaInsets();

    const tabBarHeight = 70 + insets.bottom;

    return (
        <Tab.Navigator
            initialRouteName="Inicio"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: cores.fundoNavegacao,
                    borderTopWidth: 0,
                    height: tabBarHeight,
                    paddingBottom: insets.bottom + 10,
                },
                tabBarItemStyle: {
                    paddingVertical: 6,
                    gap: 4,
                },
                tabBarActiveTintColor: cores.primaria,
                tabBarInactiveTintColor: cores.textoSecundario,
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
                                        backgroundColor: cores.primaria,
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
            screenListeners={({ navigation, route }) => ({
                tabPress: (e) => {
                    if (route.name === 'Inicio') {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Inicio' }],
                        });
                    }
                },
            })}
        >
            <Tab.Screen name="Inicio" component={InicioStack} />
            <Tab.Screen name="Perfil" component={PerfilComVerificacao} />
        </Tab.Navigator>
    );
}

// Navegador de autenticação (root navigator)
export function AuthNavigator() {
    return (
        <AuthStack.Navigator
            initialRouteName="App"
            screenOptions={{ headerShown: false }}
        >
            <AuthStack.Screen name="PaginaLogin" component={PaginaLogin} />
            <AuthStack.Screen name="PaginaCadastro" component={PaginaCadastro} />
            <AuthStack.Screen name="App" component={TabNavigator} />
        </AuthStack.Navigator>
    );
}

export default AuthNavigator;

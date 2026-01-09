/**
 * App.js - Ponto de entrada do aplicativo Urucum
 * 
 * Este arquivo configura os providers globais e inicializa a navegação.
 * A estrutura do projeto foi reorganizada em:
 * 
 * src/
 * ├── assets/          - Imagens e ícones
 * ├── components/      - Componentes reutilizáveis
 * ├── contexts/        - Contextos React (tema, usuário)
 * ├── hooks/           - Hooks personalizados
 * ├── navigation/      - Configuração de navegação
 * ├── screens/         - Telas do app
 * ├── services/        - Serviços (Firebase, Cloudinary)
 * ├── styles/          - Estilos e cores
 * └── utils/           - Funções utilitárias
 */

import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Providers
import { TemaProvider } from "./src/contexts/TemaContext";
import { UsuarioProvider } from "./src/contexts/UsuarioContext";

// Navigation
import { AuthNavigator } from "./src/navigation";

export default function App() {
    return (
        <SafeAreaProvider>
            <TemaProvider>
                <UsuarioProvider>
                    <StatusBar 
                        barStyle="dark-content" 
                        backgroundColor="transparent" 
                        translucent 
                    />
                    <NavigationContainer>
                        <AuthNavigator />
                    </NavigationContainer>
                </UsuarioProvider>
            </TemaProvider>
        </SafeAreaProvider>
    );
}

import { Image, Pressable, Text, View, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import BarraDeInput from '../componentes/BarraDeInput';
import Botao from '../componentes/Botao';
import Titulo from '../componentes/Titulo';
import estilosGlobais from '../estilos/estilosGlobais';

export default function PaginaLogin({ navigation }) {
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return (
        <KeyboardAvoidingView
            style={estilosGlobais.paginaLogin_container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={estilosGlobais.paginaLogin_scrollContent}>
                <Image 
                    source={require('../assets/images/logotipo.webp')} 
                    style={estilosGlobais.paginaLogin_logo} 
                />
                <View style={[
                    estilosGlobais.paginaLogin_conteudo,
                    keyboardVisible ? estilosGlobais.paginaLogin_conteudoComTeclado : estilosGlobais.paginaLogin_conteudoSemTeclado
                ]}>
                    <Titulo color="#AA0000">ENTRAR</Titulo>
                    <BarraDeInput label="Usuário ou Email" />
                    <BarraDeInput label="Senha" />
                    <Botao onPress={() => navigation.navigate('PaginaEditarPerfil')}>Entrar</Botao>
                    <Pressable>
                        <Text style={estilosGlobais.paginaLogin_link}>Esqueceu a senha?</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('PaginaCadastro')}>
                        <Text style={estilosGlobais.paginaLogin_link}>Não possui um login? Cadastre-se</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}



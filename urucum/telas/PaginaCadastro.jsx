import { Image, Pressable, Text, View, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import BarraDeInput from '../componentes/BarraDeInput';
import Botao from '../componentes/Botao';
import Titulo from '../componentes/Titulo';
import estilosGlobais from '../estilos/estilosGlobais';

export default function PaginaCadastro({ navigation }) {
    const [keyboardVisible, setKeyboardVisible] = useState(false); //Checo se o teclado está visível para alterar seu estilo

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true)); // Quando o teclado aparece, atualiza o estado
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false)); // Quando o teclado desaparece, atualiza o estado

        return () => {
            showSubscription.remove(); // Retira o listener anterior para ser usado novamente
            hideSubscription.remove();
        };
    }, []);

    return (
        <KeyboardAvoidingView
            style={estilosGlobais.paginaCadastro_container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={estilosGlobais.paginaCadastro_scrollContent}>
                <Image 
                    source={require('../assets/images/logotipo.webp')} 
                    style={estilosGlobais.paginaCadastro_logo} 
                />
                <View style={[
                    estilosGlobais.paginaCadastro_conteudo,
                    keyboardVisible ? estilosGlobais.paginaCadastro_conteudoComTeclado : estilosGlobais.paginaCadastro_conteudoSemTeclado // aqui é onde tem os estilos condicionais
                ]}>
                    <Titulo color="#AA0000">CADASTRO</Titulo>
                    <BarraDeInput label="Nome Artístico" />
                    <BarraDeInput label="E-mail" />
                    <BarraDeInput label="Senha" />
                    <BarraDeInput label="Confirme sua Senha" />
                    <Botao onPress={() => navigation.navigate('PaginaEditarPerfil')}>Cadastrar</Botao>
                    <Pressable>
                        <Text style={estilosGlobais.paginaCadastro_link}>Esqueceu a senha?</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('PaginaLogin')}>
                        <Text style={estilosGlobais.paginaCadastro_link}>Já possui uma conta? Faça Login</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
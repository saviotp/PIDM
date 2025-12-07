import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import BarraDeInput from '../componentes/BarraDeInput';
import Botao from '../componentes/Botao';
import Titulo from '../componentes/Titulo';

export default function PaginaLogin() {
    return (
        <View style={estilos.container}>
            <Image 
                source={require('../../assets/images/logotipo.webp')} 
                style={estilos.logo} 
            />
            <View style={estilos.conteudo}>
                <Titulo color="#AA0000">ENTRAR</Titulo>
                <BarraDeInput label="Usuário ou Email" />
                <BarraDeInput label="Senha" />
                <Botao>Entrar</Botao>
                <Pressable onPress={() => console.log('Esqueceu a senha pressed')}>
                    <Text style={estilos.link}>Esqueceu a senha?</Text>
                </Pressable>
                <Pressable onPress={() => console.log('Cadastre-se pressed')}>
                    <Text style={estilos.link}>Não possui um login? Cadastre-se</Text>
                </Pressable>
            </View>
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        backgroundColor: '#FFD2B3',
        flex: 1,
    },
    conteudo: {
        backgroundColor: '#F6F6F6',
        height: '55%',
        width: '90%',
        borderRadius: 20,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 50,
    },
    link: {
        color: '#004AAD',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});

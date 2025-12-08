import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AdicionarObraOuColecao from '../componentes/AdicionarObraOuColecao';
import BarraDeInput from '../componentes/BarraDeInput';
import BarraDeNavegacao from '../componentes/BarraDeNavegacao';
import Botao from '../componentes/Botao';
import Titulo from '../componentes/Titulo';

export default function PaginaCadastro() {
    return (
        <View style={estilos.container}>
            <ScrollView contentContainerStyle={estilos.scrollContainer}>
                <Image
                    source={require('../assets/images/logotipo.webp')}
                    style={estilos.logo}
                />

                <View style={estilos.conteudo}>
                    <Pressable
                        style={estilos.adicionarFotoCapa}
                        onPress={() => console.log('Adicionar foto de capa pressed')}
                    >
                        <Text style={estilos.link}>Adicionar foto de capa</Text>
                    </Pressable>

                    <Pressable
                        style={estilos.adicionarFotoPerfil}
                        onPress={() => console.log('Adicionar foto de perfil pressed')}
                    >
                        <Text style={estilos.link}>Adicionar foto de perfil</Text>
                    </Pressable>

                    <Titulo color="#134313" style={estilos.titulo}>Luísa Gabriela Nome Gigante</Titulo>

                    <Botao 
                        backgroundColor="#AB8368" 
                        pressedBackgroundColor="#8B5E4E" 
                        style={estilos.adicionarTags}
                    >
                        Adicionar Tags
                    </Botao>

                    <BarraDeInput label="Escreva sua mini biografia" />
                    <BarraDeInput label="Número para contato" />
                    <BarraDeInput label="@ do Instagram" />

                    <Titulo style={estilos.titulo}>Obras</Titulo>
                    <AdicionarObraOuColecao style={estilos.adicionarObraOuColecao} />

                    <Titulo style={estilos.titulo}>Coleções</Titulo>
                    <AdicionarObraOuColecao style={estilos.adicionarObraOuColecao} />
                </View>
            </ScrollView>
            <BarraDeNavegacao ativo="perfil" />
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#F5F5F5',
        paddingBottom: 80, // Adds space to prevent content from overlapping the navigation bar
    },
    conteudo: {
        backgroundColor: '#F6F6F6',
        width: '100%',
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
    link: {
        color: '#004AAD',
        marginTop: 10,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    adicionarFotoCapa: {
        backgroundColor: '#E5E5E5',
        width: '100%',
        height: 200,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    adicionarFotoPerfil: {
        backgroundColor: '#E5E5E5',
        width: '35%',
        aspectRatio: 1, // Garante um círculo perfeito
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#134313',
        borderWidth: 3,
        position: 'absolute',
        top: '15%',
        right: '5%',
    },
    titulo: {
        alignSelf: 'flex-start',
        width: '60%',
    },
    adicionarTags: {
        marginTop: 10,
        width: '50%',
        alignSelf: 'flex-start',
    },
    adicionarObraOuColecao: {
        marginTop: 10,
        alignSelf: 'flex-start',
    },
});
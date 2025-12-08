import { Image, ScrollView, StyleSheet, View } from "react-native";
import BarraDeNavegacao from "../componentes/BarraDeNavegacao";
import Perfil from "../componentes/Perfil";
import Titulo from "../componentes/Titulo";

export default function PaginaInicial() {
    return (
        <View style={estilos.container}>
            <View style={estilos.menu}>
                <Image
                    source={require('../assets/images/logotipo.webp')}
                    style={estilos.logo}
                />
                <Titulo style={estilos.titulo}>Página Inicial</Titulo>
                <View
                    style={estilos.adicionarFotoPerfil}
                    onPress={() => console.log('Adicionar foto de perfil pressed')}
                >
                    <Image
                        source={{ uri: 'https://uploads-eu-west-1.insided.com/deezer-pt/attachment/c1d92fc7-efe7-45c2-9838-6aa3d2efeaa6.jpg' }}
                        style={estilos.imagemPerfil}
                    />
                </View>
            </View>
            <ScrollView contentContainerStyle={estilos.scrollContainer}>
                <Perfil />
                <Perfil />
                <Perfil />
            </ScrollView>
            <BarraDeNavegacao ativo="inicio" />
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        flex: 1,
    },
    menu: {
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#F5F5F5',
        paddingBottom: 80,
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'flex-start',
    },
    titulo: {
        flex: 1,
        textAlign: 'center', 
        left: "10%",
    },
    adicionarFotoPerfil: {
        backgroundColor: '#E5E5E5',
        width: '25%',
        aspectRatio: 1, // Garante um círculo perfeito
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#134313',
        borderWidth: 3,
    },
    imagemPerfil: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },
});
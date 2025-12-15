import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import Titulo from "../componentes/Titulo";
import BotaoVoltar from "../componentes/BotaoVoltar";

//Pega a altura da tela
const alturaTela = Dimensions.get("window").height;

export default function VisualizarObraOuColecao({ titulo }) {
    return (
        <View style={estilos.container}>
            <BotaoVoltar onPress={() => console.log('Voltar pressed')} />
            <ScrollView style={estilos.scrollView}>
                <View style={estilos.content}>
                    <Titulo style={estilos.titulo}>Flor {titulo}</Titulo>
                    <Image
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCnThD8kRYwIOmCt8wDNh5uK3UIM8TfW6AdQ&s' }}
                        style={estilos.imagem}
                    />
                    <Text style={estilos.texto}>
                        Descrição da obra ou coleção. Aqui você pode adicionar detalhes sobre a obra, seu autor, ano de criação, e outras informações relevantes.
                    </Text>

                    <Titulo style={estilos.titulo}>Flor {titulo}</Titulo>
                    <Image
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCnThD8kRYwIOmCt8wDNh5uK3UIM8TfW6AdQ&s' }}
                        style={estilos.imagem}
                    />
                    <Text style={estilos.texto}>
                        Descrição da obra ou coleção. Aqui você pode adicionar detalhes sobre a obra, seu autor, ano de criação, e outras informações relevantes.
                    </Text>

                    <Titulo style={estilos.titulo}>Flor {titulo}</Titulo>
                    <Image
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCnThD8kRYwIOmCt8wDNh5uK3UIM8TfW6AdQ&s' }}
                        style={estilos.imagem}
                    />
                    <Text style={estilos.texto}>
                        Descrição da obra ou coleção. Aqui você pode adicionar detalhes sobre a obra, seu autor, ano de criação, e outras informações relevantes.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        margin: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
    },
    texto: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'justify',
        marginVertical: 10,
        marginHorizontal: 5,
    },
    imagem: {
        width: '100%',
        borderRadius: 16,
        height: alturaTela * 0.7,
    },
});
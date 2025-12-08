import { View, Text, StyleSheet } from "react-native";
import Titulo from "../componentes/Titulo";

export default function VisualizarObraOuColecao({ titulo }) {
    return (
        <View style={estilos.container}>
            <Titulo style={estilos.titulo}>Flor {titulo}</Titulo>
        </View>
    )
}

const estilos = StyleSheet.create({

    container: {
        flex: 1,
        margin: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
    }
});
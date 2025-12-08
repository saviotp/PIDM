import { StyleSheet, Text, View } from "react-native";

export default function Titulo({ children, color, style }) {
    return (
        //Style como props para customizar o estilo do componente
        <View style={style}>
            <Text style={[estilos.texto, { color: color || '#134313' }]}>{children}</Text>
        </View>
    )
}

const estilos = StyleSheet.create({
    texto: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'Raleway',
        paddingBottom: 20,
    }
})
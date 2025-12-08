import { Pressable, StyleSheet, Text } from "react-native";

export default function Botao({ children, aoPressionar, style, backgroundColor, pressedBackgroundColor }) {
    return (
        <Pressable
            onPress={aoPressionar}
            style={({ pressed }) => [
                styles.botao,
                { backgroundColor: pressed ? pressedBackgroundColor || styles.botaoPressed.backgroundColor : backgroundColor || styles.botao.backgroundColor },
                style, // Estilos customizáveis via props
            ]}
        >
            <Text style={styles.texto}>{children}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    botao: {
        backgroundColor: '#134313', // Cor padrão do botão
        paddingVertical: 10,
        paddingHorizontal: 24,
        margin: 20,
        borderRadius: 50,
        alignItems: 'center',
        width: '40%',
        justifyContent: 'center',
    },
    botaoPressed: {
        backgroundColor: '#096b09ff', // Cor quando selecionado
    },
    texto: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

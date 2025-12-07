import { Pressable, StyleSheet, Text } from "react-native";

export default function Botao({ children, aoPressionar, style }) {
    return (
        <Pressable
            onPress={aoPressionar}
            style={({ pressed }) => [
                styles.botao,
                pressed && styles.botaoPressed, // Muda cor quando selecionado
                style, // Custom styles passed as a prop
            ]}
        >
            <Text style={styles.texto}>{children}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    botao: {
        backgroundColor: '#134313',
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

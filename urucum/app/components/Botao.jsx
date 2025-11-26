import { Pressable, Text, StyleSheet } from "react-native";

export default function Botao({ titulo, aoPressionar }) {
    return (
        <Pressable
            onPress={aoPressionar}
            style={({ pressed }) => [
                styles.botao,
                pressed && styles.botaoPressed, // Muda cor quando selecionado
            ]}
        >
            <Text style={styles.texto}>{titulo}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    botao: {
        backgroundColor: '#134313',
        paddingVertical: 10,
        paddingHorizontal: 24,
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

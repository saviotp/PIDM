import React from 'react';
import { StyleSheet, Pressable, Image } from 'react-native';

export default function BotaoVoltar({ onPress, style }) {
    return (
        <Pressable onPress={onPress} style={[estilos.botao, style]}>
            <Image
                source={require('../assets/icons/arrow-left.png')}
                style={{ width: 24, height: 24 }}
            />
        </Pressable>
    );
}

const estilos = StyleSheet.create({
    botao: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        alignItems: 'center',
        width: 60,
        height: 60,
        justifyContent: 'center',
        zIndex: 1000,
        elevation: 10, // Ensures it stays above other elements on Android
    },
    texto: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

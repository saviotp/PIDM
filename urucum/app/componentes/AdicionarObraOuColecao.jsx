import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function AdicionarObraOuColecao({ style }) {
    return (
        <View style={[estilos.conteudo, style]}>
            <Pressable onPress={() => console.log('Adicionar Obra ou Coleção pressed')}>
                <Text style={estilos.adicionarObraOuColecao}>+</Text>
            </Pressable>
        </View>
    );
}

const estilos = {
    conteudo: {
        backgroundColor: '#E5E5E5',
        borderRadius: 16,
        padding: 20,
        width: '22%',
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 20,
    },
    adicionarObraOuColecao: {
        fontSize: 32,
        color: '#134313',
        textAlign: 'center',
    }
}

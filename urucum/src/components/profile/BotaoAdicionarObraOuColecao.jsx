import React from 'react';
import { Pressable, Text } from 'react-native';
import { useEstilos } from '../../hooks/useEstilos';

export default function AdicionarObraOuColecao({ style, onPress }) {
    const { estilos } = useEstilos();
    
    return (
        <Pressable onPress={onPress} style={[estilos.botaoAdicionarObraOuColecao_conteudo, style]}>
            <Text style={estilos.botaoAdicionarObraOuColecao_adicionarObraOuColecao}>+</Text>
        </Pressable>
    );
}

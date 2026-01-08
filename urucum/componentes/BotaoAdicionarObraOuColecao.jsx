import React from 'react';
import { Pressable, Text } from 'react-native';
import estilosGlobais from '../estilos/estilosGlobais';

export default function AdicionarObraOuColecao({ style, onPress }) {
    return (
        <Pressable onPress={onPress} style={[estilosGlobais.botaoAdicionarObraOuColecao_conteudo, style]}>
            <Text style={estilosGlobais.botaoAdicionarObraOuColecao_adicionarObraOuColecao}>+</Text>
        </Pressable>
    );
}

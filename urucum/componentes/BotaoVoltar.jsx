import React from 'react';
import { Pressable, Image } from 'react-native';
import estilosGlobais from '../estilos/estilosGlobais';

export default function BotaoVoltar({ style, onPress }) {
    return (
        <Pressable style={[estilosGlobais.botaoVoltar_botao, style]} onPress={onPress}>
            <Image
                source={require('../assets/icons/arrow-left.png')}
                style={{ width: 24, height: 24 }}
            />
        </Pressable>
    );
}

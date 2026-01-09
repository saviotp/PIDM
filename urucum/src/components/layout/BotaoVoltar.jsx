import React from 'react';
import { Pressable, Image } from 'react-native';
import { useEstilos } from '../../hooks/useEstilos';

export default function BotaoVoltar({ style, onPress }) {
    const { estilos } = useEstilos();
    
    return (
        <Pressable style={[estilos.botaoVoltar_botao, style]} onPress={onPress}>
            <Image
                source={require('../../assets/icons/arrow-left.png')}
                style={{ width: 24, height: 24 }}
            />
        </Pressable>
    );
}

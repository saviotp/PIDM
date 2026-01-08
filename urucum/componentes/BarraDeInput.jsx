import React, { useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import estilosGlobais from '../estilos/estilosGlobais';

export default function BarraDeInput({
    // É o que aparece de base
    label = "Usuário ou Email",

    // É o valor atual do input
    value,

    // Função chamada quando o texto muda
    onChangeText,
}) {
    const [editando, setEditando] = useState(false);
    const inputRef = useRef(null);

    function Digitou(text) {
        onChangeText?.(text);
    }

    return (
        <Pressable style={estilosGlobais.barraDeInput_container} onPress={() => {
            setEditando(true);
            requestAnimationFrame(() => inputRef.current?.focus());
        }}>
            <View>
                {editando ? (
                    <TextInput
                        ref={inputRef}
                        value={value}
                        onChangeText={Digitou}
                        placeholder={label}
                        onBlur={() => setEditando(false)} // Quando perde o foco, sai do modo de edição
                    />
                ) : (
                    <Text>{value || label}</Text>
                )}
            </View>
        </Pressable>
    );
}

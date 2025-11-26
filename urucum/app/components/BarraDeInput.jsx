import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

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
        <Pressable style={styles.container} onPress={() => {
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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#EBEBEB',
        padding: 20,
        borderRadius: 16,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },

    conteudo: {
        flex: 1,
    },

    texto: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: '#3E3E3E',
    },

    pressionado: {
        backgroundColor: '#D3D3D3',
    },
});

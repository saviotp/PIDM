import React, { useState, useRef, useEffect } from 'react';
import { Pressable, Text, StyleSheet, TextInput, View, BackHandler } from 'react-native';

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
        <Pressable onPress={() => {
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
        gap: 10,
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

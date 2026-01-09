import React, { useRef, useState, useEffect } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useTema } from '../../contexts/TemaContext';

export default function BarraDeInput({
    // É o que aparece de base
    label = "Usuário ou Email",

    // É o valor atual do input
    value,

    // Função chamada quando o texto muda
    onChangeText,
    
    // Para campos de senha
    secureTextEntry = false,
    
    // Estilo adicional
    style,
    
    // Callback quando perde o foco
    onBlur,
    
    // Mantém o teclado aberto (não colapsa automaticamente)
    manterTecladoAberto = false,
    
    // Se o input está sendo controlado externamente
    focarAutomaticamente = false,
}) {
    const [editando, setEditando] = useState(false);
    const inputRef = useRef(null);
    const { cores } = useTema();

    useEffect(() => {
        if (focarAutomaticamente && inputRef.current) {
            inputRef.current.focus();
        }
    }, [focarAutomaticamente]);

    function Digitou(text) {
        onChangeText?.(text);
    }
    
    function handleBlur() {
        // Só fecha se não estiver configurado para manter aberto
        if (!manterTecladoAberto) {
            setEditando(false);
        }
        onBlur?.();
    }

    function handlePress() {
        setEditando(true);
        requestAnimationFrame(() => inputRef.current?.focus());
    }

    return (
        <Pressable 
            style={[
                {
                    flexDirection: 'row',
                    backgroundColor: cores.fundoInput,
                    padding: 20,
                    borderRadius: 16,
                    width: '90%',
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginBottom: 16,
                },
                style
            ]} 
            onPress={handlePress}
        >
            <View style={{ flex: 1 }}>
                {editando ? (
                    <TextInput
                        ref={inputRef}
                        value={value}
                        onChangeText={Digitou}
                        placeholder={label}
                        placeholderTextColor={cores.textoSecundario}
                        onBlur={handleBlur}
                        secureTextEntry={secureTextEntry}
                        style={{ color: cores.textoPrimario }}
                        submitBehavior={manterTecladoAberto ? 'submit' : 'blurAndSubmit'}
                    />
                ) : (
                    <Text style={{ color: cores.textoSecundario }}>
                        {value ? (secureTextEntry ? '••••••••' : value) : label}
                    </Text>
                )}
            </View>
        </Pressable>
    );
}

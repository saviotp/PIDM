import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '../../contexts/TemaContext';
import { useEstilos } from '../../hooks/useEstilos';

export default function BarraPesquisa({ 
    placeholder = "Pesquisar por nome ou tag...",
    onPesquisar,
    style,
    debounceMs = 300, // Tempo de debounce em milissegundos
}) {
    const [termo, setTermo] = useState('');
    const { cores } = useTema();
    const { estilos } = useEstilos();
    const debounceTimer = useRef(null);

    // Limpa o timer ao desmontar
    useEffect(() => {
        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, []);

    const handleChangeText = useCallback((texto) => {
        setTermo(texto);
        
        // Limpa timer anterior
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        
        // Cria novo timer para debounce
        debounceTimer.current = setTimeout(() => {
            if (onPesquisar) {
                // Passa o termo para busca - a lógica de filtrar por início fica no componente pai
                onPesquisar(texto.trim());
            }
        }, debounceMs);
    }, [onPesquisar, debounceMs]);

    return (
        <View style={[
            estilos.barraPesquisa_container, 
            { backgroundColor: cores.fundoInput },
            style
        ]}>
            <Ionicons name="search" size={20} color={cores.textoSecundario} />
            <TextInput
                style={[estilos.barraPesquisa_input, { color: cores.textoPrimario }]}
                placeholder={placeholder}
                placeholderTextColor={cores.textoSecundario}
                value={termo}
                onChangeText={handleChangeText}
            />
        </View>
    );
}

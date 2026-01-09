import React from 'react';
import { Modal, Pressable, Image, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEstilos } from '../../hooks/useEstilos';

/**
 * Modal para visualizar imagens em tela cheia
 * @param {boolean} visible - Se o modal está visível
 * @param {string} imagemUri - URI da imagem a ser exibida
 * @param {function} onClose - Função chamada ao fechar o modal
 */
export default function ModalImagemTelaCheia({ visible, imagemUri, onClose }) {
    const { estilos, cores } = useEstilos();

    if (!imagemUri) return null;

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <StatusBar hidden />
            <Pressable 
                style={estilos.modalImagemTelaCheia_overlay}
                onPress={onClose}
            >
                <Image
                    source={{ uri: imagemUri }}
                    style={estilos.modalImagemTelaCheia_imagem}
                />
                <Pressable 
                    onPress={onClose}
                    style={estilos.modalImagemTelaCheia_botaoFechar}
                >
                    <Ionicons name="close" size={24} color={cores.iconeClaro} />
                </Pressable>
            </Pressable>
        </Modal>
    );
}

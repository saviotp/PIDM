import React, { useState } from 'react';
import { Modal, View, Text } from 'react-native';
import Botao from '../common/Botao';
import { useEstilos } from '../../hooks/useEstilos';

export default function AdicionarTags({ modalVisible, setModalVisible, todasAsTags, adicionarTag, salvarTags }) {
    const [tagsSelecionadas, setTagsSelecionadas] = useState([]);
    const { estilos, cores } = useEstilos();

    const selecionarTag = (tag) => {
        if (!tagsSelecionadas.includes(tag)) {
            setTagsSelecionadas([...tagsSelecionadas, tag]);
        }
    };

    const removerTag = (tag) => {
        const novasTagsSelecionadas = tagsSelecionadas.filter((t) => t !== tag);
        setTagsSelecionadas(novasTagsSelecionadas);
    };

    const handleSalvar = () => {
        salvarTags(tagsSelecionadas);
        setModalVisible(false);
    };

    return (
        <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={estilos.adicionarTags_modalContainer}>
                <View style={estilos.adicionarTags_modalContent}>
                    <Text style={estilos.adicionarTags_modalTitle}>Tags Selecionadas</Text>
                    <View style={estilos.adicionarTags_previewTagsContainer}>
                        {tagsSelecionadas.map((tag, index) => (
                            <Botao
                                key={index}
                                style={estilos.adicionarTags_tagSelecionada}
                                backgroundColor={cores.primaria}
                                pressedBackgroundColor={cores.secundaria}
                                onPress={() => removerTag(tag)}
                            >
                                {tag}
                            </Botao>
                        ))}
                    </View>

                    <Text style={estilos.adicionarTags_modalTitle}>Selecione as Tags</Text>
                    <View style={estilos.adicionarTags_tagsContainer}>
                        {todasAsTags.map((tag, index) => (
                            <Botao
                                key={index}
                                style={estilos.adicionarTags_tagButton}
                                backgroundColor={cores.terciaria}
                                pressedBackgroundColor={cores.terciariaPressed}
                                onPress={() => selecionarTag(tag)}
                            >
                                {tag}
                            </Botao>
                        ))}
                    </View>

                    <View style={estilos.adicionarTags_acoesModalContainer}>
                        <Botao
                            style={estilos.adicionarTags_botaoFechar}
                            backgroundColor={cores.primaria}
                            pressedBackgroundColor={cores.primariaPressed}
                            onPress={() => setModalVisible(false)}
                        >
                            Fechar
                        </Botao>
                        <Botao
                            style={estilos.adicionarTags_botaoSalvar}
                            backgroundColor={cores.secundaria}
                            pressedBackgroundColor={cores.secundariaPressed}
                            onPress={handleSalvar}
                        >
                            Salvar
                        </Botao>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
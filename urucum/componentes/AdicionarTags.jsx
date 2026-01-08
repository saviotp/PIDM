import React, { useState } from 'react';
import { Modal, View, Text } from 'react-native';
import Botao from './Botao';
import estilosGlobais from '../estilos/estilosGlobais';

export default function AdicionarTags({ modalVisible, setModalVisible, todasAsTags, adicionarTag, salvarTags }) {
    const [tagsSelecionadas, setTagsSelecionadas] = useState([]);

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
            <View style={estilosGlobais.adicionarTags_modalContainer}>
                <View style={estilosGlobais.adicionarTags_modalContent}>
                    <Text style={estilosGlobais.adicionarTags_modalTitle}>Tags Selecionadas</Text>
                    <View style={estilosGlobais.adicionarTags_previewTagsContainer}>
                        {tagsSelecionadas.map((tag, index) => (
                            <Botao
                                key={index}
                                style={estilosGlobais.adicionarTags_tagSelecionada}
                                backgroundColor="#AA0000"
                                pressedBackgroundColor="#134313"
                                onPress={() => removerTag(tag)}
                            >
                                {tag}
                            </Botao>
                        ))}
                    </View>

                    <Text style={estilosGlobais.adicionarTags_modalTitle}>Selecione as Tags</Text>
                    <View style={estilosGlobais.adicionarTags_tagsContainer}>
                        {todasAsTags.map((tag, index) => (
                            <Botao
                                key={index}
                                style={estilosGlobais.adicionarTags_tagButton}
                                backgroundColor="#AB8368"
                                pressedBackgroundColor="#8B5E4E"
                                onPress={() => selecionarTag(tag)}
                            >
                                {tag}
                            </Botao>
                        ))}
                    </View>

                    <View style={estilosGlobais.adicionarTags_acoesModalContainer}>
                        <Botao
                            style={estilosGlobais.adicionarTags_botaoFechar}
                            backgroundColor="#aa0000"
                            pressedBackgroundColor="#880000"
                            onPress={() => setModalVisible(false)}
                        >
                            Fechar
                        </Botao>
                        <Botao
                            style={estilosGlobais.adicionarTags_botaoSalvar}
                            backgroundColor="#134313"
                            pressedBackgroundColor="#0a5a0a"
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
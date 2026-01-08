import React, { useState } from 'react';
import { Modal, Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native';
import Botao from './Botao';
import estilosGlobais from '../estilos/estilosGlobais';

export default function AdicionarColecao({ style, modalVisible, setModalVisible }) {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [obraCapa, setObraCapa] = useState(null);
    const [obrasSelecionadas, setObrasSelecionadas] = useState([]);

    const obrasDisponiveis = [
        { id: '1', titulo: 'Obra 1' },
        { id: '2', titulo: 'Obra 2' },
        { id: '3', titulo: 'Obra 3' },
    ]; // Exemplo de obras disponíveis

    const salvarColecao = () => {
        console.log({ titulo, descricao, obraCapa, obrasSelecionadas });
        setModalVisible(false);
        setTitulo('');
        setDescricao('');
        setObraCapa(null);
        setObrasSelecionadas([]);
    };

    const toggleObraSelecionada = (obra) => {
        if (obrasSelecionadas.includes(obra)) {
            setObrasSelecionadas(obrasSelecionadas.filter((item) => item !== obra));
            if (obraCapa === obra) {
                setObraCapa(null); // Remove a obra de capa se for desmarcada
            }
        } else {
            if (!obrasSelecionadas.some((item) => item.id === obra.id)) {
                setObrasSelecionadas([...obrasSelecionadas, obra]);
            }
        }
    };

    const selecionarObraCapa = (obra) => {
        if (obraCapa === obra) {
            setObraCapa(null); // Remove a seleção se já estiver selecionada
            setObrasSelecionadas(obrasSelecionadas.filter((item) => item !== obra)); // Remove a obra da lista de selecionadas
        } else {
            setObraCapa(obra); // Define a obra como capa
        }
    };

    return (
        <View style={[estilosGlobais.adicionarColecao_container, style]}>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={estilosGlobais.adicionarColecao_modalContainer}>
                    <View style={estilosGlobais.adicionarColecao_modalContent}>
                        <Text style={estilosGlobais.adicionarColecao_modalTitle}>Adicionar Nova Coleção</Text>

                        <TextInput
                            style={estilosGlobais.adicionarColecao_input}
                            placeholder="Título da Coleção"
                            value={titulo}
                            onChangeText={setTitulo}
                        />

                        <Text style={estilosGlobais.adicionarColecao_label}>Obras da Coleção</Text>
                        <FlatList
                            data={obrasDisponiveis}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[estilosGlobais.adicionarColecao_obraItem, obrasSelecionadas.includes(item) ? estilosGlobais.adicionarColecao_obraSelecionada : null]}
                                    onPress={() => toggleObraSelecionada(item)}
                                >
                                    <Text>{item.titulo}</Text>
                                </TouchableOpacity>
                            )}
                            horizontal
                        />

                        <Text style={estilosGlobais.adicionarColecao_label}>Obra de Capa</Text>
                        <FlatList
                            data={obrasSelecionadas}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[estilosGlobais.adicionarColecao_obraItem, obraCapa === item ? estilosGlobais.adicionarColecao_obraSelecionada : null]}
                                    onPress={() => selecionarObraCapa(item)}
                                >
                                    <Text>{item.titulo}</Text>
                                </TouchableOpacity>
                            )}
                            horizontal
                        />

                        <TextInput
                            style={[estilosGlobais.adicionarColecao_input, estilosGlobais.adicionarColecao_descricaoInput]}
                            placeholder="Descrição da Coleção"
                            value={descricao}
                            onChangeText={setDescricao}
                            multiline
                        />

                        <View style={estilosGlobais.adicionarColecao_botoesContainer}>
                            <Botao
                                style={estilosGlobais.adicionarColecao_botaoCancelar}
                                backgroundColor="#aa0000"
                                pressedBackgroundColor="#880000"
                                onPress={() => setModalVisible(false)}
                            >
                                Cancelar
                            </Botao>

                            <Botao
                                style={estilosGlobais.adicionarColecao_botaoSalvar}
                                backgroundColor="#134313"
                                pressedBackgroundColor="#0a5a0a"
                                onPress={salvarColecao}
                            >
                                Salvar
                            </Botao>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
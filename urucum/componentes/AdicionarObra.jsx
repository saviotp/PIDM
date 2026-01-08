import React, { useState } from 'react';
import { Modal, Text, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Botao from './Botao';
import estilosGlobais from '../estilos/estilosGlobais';

export default function AdicionarObra({ style, modalVisible, setModalVisible }) {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState(null);

    const selecionarImagem = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImagem(result.assets[0].uri);
        }
    };

    const salvarObra = () => {
        console.log({ titulo, descricao, imagem });
        setModalVisible(false);
        setTitulo('');
        setDescricao('');
        setImagem(null);
    };

    return (
        <View style={[estilosGlobais.adicionarObra_conteudo, style]}>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={estilosGlobais.adicionarObra_modalContainer}>
                    <View style={estilosGlobais.adicionarObra_modalContent}>
                        <Text style={estilosGlobais.adicionarObra_modalTitle}>Adicionar Nova Obra</Text>

                        <TextInput
                            style={estilosGlobais.adicionarObra_input}
                            placeholder="Título da Obra"
                            value={titulo}
                            onChangeText={setTitulo}
                        />

                        <TextInput
                            style={[estilosGlobais.adicionarObra_input, estilosGlobais.adicionarObra_descricaoInput]}
                            placeholder="Descrição da Obra"
                            value={descricao}
                            onChangeText={setDescricao}
                            multiline
                        />

                        <TouchableOpacity style={estilosGlobais.adicionarObra_botaoImagem} onPress={selecionarImagem}>
                            <Text style={estilosGlobais.adicionarObra_botaoImagemTexto}>Selecionar Imagem</Text>
                        </TouchableOpacity>

                        {imagem && <Image source={{ uri: imagem }} style={estilosGlobais.adicionarObra_previewImagem} />}

                        <View style={estilosGlobais.adicionarObra_botoesContainer}>
                            <Botao
                                style={estilosGlobais.adicionarObra_botaoCancelar}
                                backgroundColor="#AA0000"
                                pressedBackgroundColor="#880000"
                                onPress={() => setModalVisible(false)}
                            >
                                Cancelar
                            </Botao>

                            <Botao
                                style={estilosGlobais.adicionarObra_botaoSalvar}
                                backgroundColor="#134313"
                                pressedBackgroundColor="#0a5a0a"
                                onPress={salvarObra}
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
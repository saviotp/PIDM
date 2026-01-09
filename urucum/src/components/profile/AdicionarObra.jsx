import React, { useState } from 'react';
import { Modal, Text, TextInput, View, TouchableOpacity, Image, Alert, ActivityIndicator, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Botao from '../common/Botao';
import { useEstilos } from '../../hooks/useEstilos';
import { useUsuario } from '../../contexts/UsuarioContext';
import { uploadImagem } from '../../services/cloudinaryService';

const LIMITE_DESCRICAO = 500;

export default function AdicionarObra({ style, modalVisible, setModalVisible, onObraAdicionada }) {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const { estilos, cores } = useEstilos();
    const { usuario, atualizarPerfil } = useUsuario();

    const selecionarImagem = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: false, // Sem edição para manter qualidade original
            quality: 1, // Qualidade máxima (100%)
        });

        if (!result.canceled) {
            // Verificar tamanho do arquivo (limite de 20MB)
            const asset = result.assets[0];
            if (asset.fileSize && asset.fileSize > 20 * 1024 * 1024) {
                Alert.alert('Arquivo muito grande', 'O tamanho máximo permitido é 20MB.');
                return;
            }
            setImagem(asset.uri);
        }
    };

    const handleDescricaoChange = (text) => {
        if (text.length <= LIMITE_DESCRICAO) {
            setDescricao(text);
        }
    };

    const salvarObra = async () => {
        if (!titulo.trim()) {
            Alert.alert('Erro', 'Por favor, adicione um título para a obra.');
            return;
        }
        
        if (!imagem) {
            Alert.alert('Erro', 'Por favor, selecione uma imagem para a obra.');
            return;
        }

        setCarregando(true);
        
        try {
            // Upload da imagem para o Cloudinary
            const resultadoUpload = await uploadImagem(imagem, 'obras');
            
            if (!resultadoUpload.sucesso) {
                Alert.alert('Erro', resultadoUpload.erro || 'Erro ao fazer upload da imagem.');
                setCarregando(false);
                return;
            }
            
            // Criar objeto da nova obra
            const novaObra = {
                id: Date.now().toString(),
                titulo: titulo.trim(),
                descricao: descricao.trim(),
                foto: resultadoUpload.url,
                criadoEm: new Date().toISOString(),
            };
            
            // Atualizar obras no Firebase
            const obrasAtuais = usuario?.obras || [];
            const novasObras = [...obrasAtuais, novaObra];
            
            const resultado = await atualizarPerfil({ obras: novasObras });
            
            if (resultado.sucesso) {
                Alert.alert('Sucesso', 'Obra adicionada com sucesso!');
                onObraAdicionada?.(novaObra);
                setModalVisible(false);
                setTitulo('');
                setDescricao('');
                setImagem(null);
            } else {
                Alert.alert('Erro', 'Erro ao salvar a obra. Tente novamente.');
            }
        } catch (erro) {
            console.error('Erro ao salvar obra:', erro);
            Alert.alert('Erro', 'Erro ao salvar a obra. Tente novamente.');
        } finally {
            setCarregando(false);
        }
    };

    const cancelar = () => {
        Keyboard.dismiss();
        setModalVisible(false);
        setTitulo('');
        setDescricao('');
        setImagem(null);
    };

    return (
        <View style={[estilos.adicionarObra_conteudo, style]}>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={cancelar}
            >
                <View style={estilos.adicionarObra_modalContainer}>
                    <View style={estilos.adicionarObra_modalContent}>
                        <Text style={estilos.adicionarObra_modalTitle}>Adicionar Nova Obra</Text>

                        <TextInput
                            style={estilos.adicionarObra_input}
                            placeholder="Título da Obra"
                            placeholderTextColor={cores.textoSecundario}
                            value={titulo}
                            onChangeText={setTitulo}
                        />

                        <TextInput
                            style={[estilos.adicionarObra_input, estilos.adicionarObra_descricaoInput]}
                            placeholder="Descrição da Obra"
                            placeholderTextColor={cores.textoSecundario}
                            value={descricao}
                            onChangeText={handleDescricaoChange}
                            multiline
                            maxLength={LIMITE_DESCRICAO}
                        />
                        <Text style={{ 
                            color: descricao.length >= LIMITE_DESCRICAO ? cores.primaria : cores.textoSecundario, 
                            fontSize: 12, 
                            alignSelf: 'flex-end',
                            marginTop: -5,
                            marginBottom: 10,
                        }}>
                            {descricao.length}/{LIMITE_DESCRICAO} caracteres
                        </Text>

                        <TouchableOpacity style={estilos.adicionarObra_botaoImagem} onPress={selecionarImagem}>
                            <Text style={estilos.adicionarObra_botaoImagemTexto}>Selecionar Imagem</Text>
                        </TouchableOpacity>

                        {imagem && <Image source={{ uri: imagem }} style={estilos.adicionarObra_previewImagem} />}

                        {carregando && (
                            <View style={{ marginVertical: 10 }}>
                                <ActivityIndicator size="large" color={cores.primaria} />
                                <Text style={{ color: cores.textoPrimario, textAlign: 'center', marginTop: 5 }}>
                                    Salvando obra...
                                </Text>
                            </View>
                        )}

                        <View style={estilos.adicionarObra_botoesContainer}>
                            <Botao
                                style={estilos.adicionarObra_botaoCancelar}
                                backgroundColor={cores.primaria}
                                pressedBackgroundColor={cores.primariaPressed}
                                onPress={cancelar}
                                disabled={carregando}
                            >
                                Cancelar
                            </Botao>

                            <Botao
                                style={estilos.adicionarObra_botaoSalvar}
                                backgroundColor={cores.secundaria}
                                pressedBackgroundColor={cores.secundariaPressed}
                                onPress={salvarObra}
                                disabled={carregando}
                            >
                                {carregando ? 'Salvando...' : 'Salvar'}
                            </Botao>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
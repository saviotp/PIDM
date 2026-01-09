import React, { useState, useEffect } from 'react';
import { Modal, Text, TextInput, View, TouchableOpacity, Image, Alert, ActivityIndicator, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Botao from '../common/Botao';
import { useEstilos } from '../../hooks/useEstilos';
import { useUsuario } from '../../contexts/UsuarioContext';
import { uploadImagem } from '../../services/cloudinaryService';

const LIMITE_DESCRICAO = 500;

export default function EditarObra({ modalVisible, setModalVisible, obra, onObraEditada }) {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState(null);
    const [imagemAlterada, setImagemAlterada] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const { estilos, cores } = useEstilos();
    const { usuario, atualizarPerfil } = useUsuario();

    // Preencher campos quando a obra é passada
    useEffect(() => {
        if (obra && modalVisible) {
            setTitulo(obra.titulo || '');
            setDescricao(obra.descricao || '');
            setImagem(obra.foto || null);
            setImagemAlterada(false);
        }
    }, [obra, modalVisible]);

    const selecionarImagem = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            if (asset.fileSize && asset.fileSize > 20 * 1024 * 1024) {
                Alert.alert('Arquivo muito grande', 'O tamanho máximo permitido é 20MB.');
                return;
            }
            setImagem(asset.uri);
            setImagemAlterada(true);
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
            let fotoUrl = imagem;
            
            // Só faz upload se a imagem foi alterada
            if (imagemAlterada) {
                const resultadoUpload = await uploadImagem(imagem, 'obras');
                
                if (!resultadoUpload.sucesso) {
                    Alert.alert('Erro', resultadoUpload.erro || 'Erro ao fazer upload da imagem.');
                    setCarregando(false);
                    return;
                }
                fotoUrl = resultadoUpload.url;
            }
            
            // Criar objeto da obra editada
            const obraEditada = {
                ...obra,
                titulo: titulo.trim(),
                descricao: descricao.trim(),
                foto: fotoUrl,
                editadoEm: new Date().toISOString(),
            };
            
            // Atualizar obras no Firebase
            const obrasAtuais = usuario?.obras || [];
            const novasObras = obrasAtuais.map(o => 
                o.id === obra.id ? obraEditada : o
            );
            
            const resultado = await atualizarPerfil({ obras: novasObras });
            
            if (resultado.sucesso) {
                Alert.alert('Sucesso', 'Obra editada com sucesso!');
                onObraEditada?.(obraEditada);
                setModalVisible(false);
                limparCampos();
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

    const limparCampos = () => {
        setTitulo('');
        setDescricao('');
        setImagem(null);
        setImagemAlterada(false);
    };

    const cancelar = () => {
        Keyboard.dismiss();
        setModalVisible(false);
        limparCampos();
    };

    return (
        <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={cancelar}
        >
            <View style={estilos.adicionarObra_modalContainer}>
                <View style={estilos.adicionarObra_modalContent}>
                    <Text style={estilos.adicionarObra_modalTitle}>Editar Obra</Text>

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
                        <Text style={estilos.adicionarObra_botaoImagemTexto}>
                            {imagemAlterada ? 'Alterar Imagem' : 'Selecionar Nova Imagem'}
                        </Text>
                    </TouchableOpacity>

                    {imagem && (
                        <Image 
                            source={{ uri: imagem }} 
                            style={estilos.adicionarObra_previewImagem} 
                        />
                    )}

                    {carregando && (
                        <View style={{ marginVertical: 10 }}>
                            <ActivityIndicator size="large" color={cores.primaria} />
                            <Text style={{ color: cores.textoPrimario, textAlign: 'center', marginTop: 5 }}>
                                Salvando alterações...
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
    );
}

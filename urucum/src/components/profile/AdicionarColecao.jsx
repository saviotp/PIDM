import React, { useState, useEffect } from 'react';
import { Modal, Text, TextInput, View, TouchableOpacity, FlatList, Image, Alert, ActivityIndicator, ScrollView, Keyboard } from 'react-native';
import Botao from '../common/Botao';
import { useEstilos } from '../../hooks/useEstilos';
import { useUsuario } from '../../contexts/UsuarioContext';

const LIMITE_DESCRICAO = 500;

export default function AdicionarColecao({ style, modalVisible, setModalVisible, onColecaoAdicionada }) {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [obraCapa, setObraCapa] = useState(null);
    const [obrasSelecionadas, setObrasSelecionadas] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const { estilos, cores } = useEstilos();
    const { usuario, atualizarPerfil } = useUsuario();

    // Obras disponíveis do usuário
    const obrasDisponiveis = usuario?.obras || [];

    // Limpar seleções quando o modal fecha
    useEffect(() => {
        if (!modalVisible) {
            setTitulo('');
            setDescricao('');
            setObraCapa(null);
            setObrasSelecionadas([]);
        }
    }, [modalVisible]);

    const handleDescricaoChange = (text) => {
        if (text.length <= LIMITE_DESCRICAO) {
            setDescricao(text);
        }
    };

    const toggleObraSelecionada = (obra) => {
        const estaSelecionada = obrasSelecionadas.some(item => item.id === obra.id);
        
        if (estaSelecionada) {
            // Remove da lista de selecionadas
            setObrasSelecionadas(obrasSelecionadas.filter(item => item.id !== obra.id));
            // Se era a obra de capa, remove também
            if (obraCapa?.id === obra.id) {
                setObraCapa(null);
            }
        } else {
            // Adiciona à lista de selecionadas
            setObrasSelecionadas([...obrasSelecionadas, obra]);
        }
    };

    const selecionarObraCapa = (obra) => {
        if (obraCapa?.id === obra.id) {
            setObraCapa(null);
        } else {
            setObraCapa(obra);
        }
    };

    const salvarColecao = async () => {
        if (!titulo.trim()) {
            Alert.alert('Erro', 'Por favor, adicione um título para a coleção.');
            return;
        }
        
        if (obrasSelecionadas.length === 0) {
            Alert.alert('Erro', 'Por favor, selecione pelo menos uma obra para a coleção.');
            return;
        }
        
        if (!obraCapa) {
            Alert.alert('Erro', 'Por favor, selecione uma obra de capa para a coleção.');
            return;
        }

        setCarregando(true);
        
        try {
            // Criar objeto da nova coleção
            const novaColecao = {
                id: Date.now().toString(),
                titulo: titulo.trim(),
                descricao: descricao.trim(),
                foto: obraCapa.foto, // Usa a foto da obra de capa
                obraCapa: obraCapa,
                obras: obrasSelecionadas,
                criadoEm: new Date().toISOString(),
            };
            
            // Atualizar coleções no Firebase
            const colecoesAtuais = usuario?.colecoes || [];
            const novasColecoes = [...colecoesAtuais, novaColecao];
            
            const resultado = await atualizarPerfil({ colecoes: novasColecoes });
            
            if (resultado.sucesso) {
                Alert.alert('Sucesso', 'Coleção adicionada com sucesso!');
                onColecaoAdicionada?.(novaColecao);
                setModalVisible(false);
            } else {
                Alert.alert('Erro', 'Erro ao salvar a coleção. Tente novamente.');
            }
        } catch (erro) {
            console.error('Erro ao salvar coleção:', erro);
            Alert.alert('Erro', 'Erro ao salvar a coleção. Tente novamente.');
        } finally {
            setCarregando(false);
        }
    };

    const cancelar = () => {
        Keyboard.dismiss();
        setModalVisible(false);
    };

    const renderObraDisponivel = ({ item }) => {
        const estaSelecionada = obrasSelecionadas.some(obra => obra.id === item.id);
        
        return (
            <TouchableOpacity
                style={[
                    estilos.adicionarColecao_obraItem,
                    estaSelecionada && { backgroundColor: cores.primaria + '40', borderColor: cores.primaria, borderWidth: 2 }
                ]}
                onPress={() => toggleObraSelecionada(item)}
            >
                {item.foto && (
                    <Image 
                        source={{ uri: item.foto }} 
                        style={{ width: 60, height: 60, borderRadius: 8, marginBottom: 5 }} 
                    />
                )}
                <Text style={{ color: cores.textoPrimario, fontSize: 12, textAlign: 'center' }} numberOfLines={2}>
                    {item.titulo}
                </Text>
                {estaSelecionada && (
                    <View style={{ 
                        position: 'absolute', 
                        top: 5, 
                        right: 5, 
                        backgroundColor: cores.primaria, 
                        borderRadius: 10, 
                        width: 20, 
                        height: 20, 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                    }}>
                        <Text style={{ color: cores.iconeClaro, fontSize: 12, fontWeight: 'bold' }}>✓</Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    const renderObraCapa = ({ item }) => {
        const ehCapa = obraCapa?.id === item.id;
        
        return (
            <TouchableOpacity
                style={[
                    estilos.adicionarColecao_obraItem,
                    ehCapa && { backgroundColor: cores.secundaria + '40', borderColor: cores.secundaria, borderWidth: 2 }
                ]}
                onPress={() => selecionarObraCapa(item)}
            >
                {item.foto && (
                    <Image 
                        source={{ uri: item.foto }} 
                        style={{ width: 60, height: 60, borderRadius: 8, marginBottom: 5 }} 
                    />
                )}
                <Text style={{ color: cores.textoPrimario, fontSize: 12, textAlign: 'center' }} numberOfLines={2}>
                    {item.titulo}
                </Text>
                {ehCapa && (
                    <View style={{ 
                        position: 'absolute', 
                        top: 5, 
                        right: 5, 
                        backgroundColor: cores.secundaria, 
                        borderRadius: 10, 
                        width: 20, 
                        height: 20, 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                    }}>
                        <Text style={{ color: cores.iconeClaro, fontSize: 12, fontWeight: 'bold' }}>★</Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={[estilos.adicionarColecao_container, style]}>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={cancelar}
            >
                <View style={[estilos.adicionarColecao_modalContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                    <View style={[estilos.adicionarColecao_modalContent, { width: '90%', maxHeight: '85%' }]}>
                        <ScrollView 
                            showsVerticalScrollIndicator={true}
                            contentContainerStyle={{ paddingBottom: 10 }}
                        >
                            <Text style={estilos.adicionarColecao_modalTitle}>Adicionar Nova Coleção</Text>

                            <TextInput
                                style={estilos.adicionarColecao_input}
                                placeholder="Título da Coleção"
                                placeholderTextColor={cores.textoSecundario}
                                value={titulo}
                                onChangeText={setTitulo}
                            />

                            <TextInput
                                style={[estilos.adicionarColecao_input, estilos.adicionarColecao_descricaoInput]}
                                placeholder="Descrição da Coleção"
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

                            <Text style={estilos.adicionarColecao_label}>Obras Disponíveis</Text>
                            {obrasDisponiveis.length === 0 ? (
                                <Text style={{ color: cores.textoSecundario, fontStyle: 'italic', marginBottom: 15 }}>
                                    Você ainda não possui obras. Adicione obras primeiro.
                                </Text>
                            ) : (
                                <FlatList
                                    data={obrasDisponiveis}
                                    keyExtractor={(item) => item.id}
                                    renderItem={renderObraDisponivel}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={{ marginBottom: 15 }}
                                />
                            )}

                            <Text style={estilos.adicionarColecao_label}>
                                Obras da Coleção ({obrasSelecionadas.length} selecionada{obrasSelecionadas.length !== 1 ? 's' : ''})
                            </Text>
                            {obrasSelecionadas.length === 0 ? (
                                <Text style={{ color: cores.textoSecundario, fontStyle: 'italic', marginBottom: 15 }}>
                                    Selecione obras acima para adicionar à coleção.
                                </Text>
                            ) : (
                                <View style={{ marginBottom: 15 }}>
                                    {obrasSelecionadas.map((obra) => (
                                        <View key={obra.id} style={{ 
                                            flexDirection: 'row', 
                                            alignItems: 'center', 
                                            padding: 8, 
                                            backgroundColor: cores.fundoInput,
                                            borderRadius: 8,
                                            marginBottom: 5,
                                        }}>
                                            {obra.foto && (
                                                <Image 
                                                    source={{ uri: obra.foto }} 
                                                    style={{ width: 40, height: 40, borderRadius: 4, marginRight: 10 }} 
                                                />
                                            )}
                                            <Text style={{ color: cores.textoPrimario, flex: 1 }}>{obra.titulo}</Text>
                                            <TouchableOpacity onPress={() => toggleObraSelecionada(obra)}>
                                                <Text style={{ color: cores.primaria, fontWeight: 'bold' }}>✕</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            )}

                            <Text style={estilos.adicionarColecao_label}>Obra de Capa (selecione uma)</Text>
                            {obrasSelecionadas.length === 0 ? (
                                <Text style={{ color: cores.textoSecundario, fontStyle: 'italic', marginBottom: 15 }}>
                                    Primeiro selecione as obras da coleção.
                                </Text>
                            ) : (
                                <FlatList
                                    data={obrasSelecionadas}
                                    keyExtractor={(item) => item.id}
                                    renderItem={renderObraCapa}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={{ marginBottom: 15 }}
                                />
                            )}

                            {carregando && (
                                <View style={{ marginVertical: 10 }}>
                                    <ActivityIndicator size="large" color={cores.primaria} />
                                    <Text style={{ color: cores.textoPrimario, textAlign: 'center', marginTop: 5 }}>
                                        Salvando coleção...
                                    </Text>
                                </View>
                            )}

                            <View style={[estilos.adicionarColecao_botoesContainer, { marginTop: 10 }]}>
                                <Botao
                                    style={estilos.adicionarColecao_botaoCancelar}
                                    backgroundColor={cores.primaria}
                                    pressedBackgroundColor={cores.primariaPressed}
                                    onPress={cancelar}
                                    disabled={carregando}
                                >
                                    Cancelar
                                </Botao>

                                <Botao
                                    style={estilos.adicionarColecao_botaoSalvar}
                                    backgroundColor={cores.secundaria}
                                    pressedBackgroundColor={cores.secundariaPressed}
                                    onPress={salvarColecao}
                                    disabled={carregando}
                                >
                                    {carregando ? 'Salvando...' : 'Salvar'}
                                </Botao>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
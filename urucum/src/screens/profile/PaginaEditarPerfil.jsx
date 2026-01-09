import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Image, Pressable, ScrollView, Text, View, Alert, StyleSheet, TextInput, ActivityIndicator, Keyboard, Dimensions, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { BotaoAdicionarObraOuColecao, AdicionarColecao, AdicionarObra, EditarObra, AdicionarTags } from '../../components/profile';
import { Titulo, Botao } from '../../components/common';
import { BotaoAltoContraste } from '../../components/layout';
import { ModalImagemTelaCheia } from '../../components/modals';
import { useNavigation } from '@react-navigation/native';
import { useEstilos } from '../../hooks/useEstilos';
import { useUsuario } from '../../contexts/UsuarioContext';
import { uploadImagem } from '../../services/cloudinaryService';
import { formatarTelefone, formatarTelefoneParaExibicao, formatarTelefoneParaSalvar, removerCodigoPais } from '../../utils/formatadores';

const { width: larguraTela, height: alturaTela } = Dimensions.get('window');

// Logos
const logoNormal = require('../../assets/images/logotipo.webp');
const logoAltoContraste = require('../../assets/images/logotipoAltoContraste.webp');

// Estilos locais - DEFINIDOS ANTES do CampoComValidacao para serem acessíveis
const estilosLocais = StyleSheet.create({
    campoContainer: {
        width: '100%',
        marginBottom: 10,
    },
    campoEdicao: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    inputContainer: {
        flex: 1,
        padding: 15,
        borderRadius: 16,
    },
    input: {
        fontSize: 14,
    },
    botoesValidacao: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    botaoValidacao: {
        padding: 10,
        borderRadius: 20,
        marginLeft: 5,
    },
    campoExibicao: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 16,
        justifyContent: 'space-between',
    },
    textoExibicao: {
        fontSize: 14,
        flex: 1,
    },
    // Estilos do nome
    nomeContainer: {
        width: '100%',
        marginBottom: 10,
    },
    nomeEdicao: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    nomeEdicaoVertical: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
    },
    nomeInput: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        borderBottomWidth: 2,
        paddingVertical: 5,
    },
    nomeExibicao: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nomeExibicaoVertical: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
    },
    botaoEditarNome: {
        padding: 8,
        marginLeft: 10,
    },
    botaoEditarNomeAbaixo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        marginTop: -10,
    },
    botoesValidacaoNome: {
        flexDirection: 'row',
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    // Estilos das obras e coleções - tamanho aumentado para acomodar ícones
    listaObras: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    obraItem: {
        width: 140,
        marginRight: 15,
        marginBottom: 15,
        alignItems: 'center',
        position: 'relative',
    },
    obraImagem: {
        width: 140,
        height: 140,
        borderRadius: 12,
        marginBottom: 5,
    },
    obraTitulo: {
        fontSize: 13,
        textAlign: 'center',
        width: '100%',
    },
    // Container para ícones de ação sobre a obra/coleção
    iconesAcaoContainer: {
        position: 'absolute',
        top: 5,
        right: 5,
        flexDirection: 'row',
        gap: 5,
    },
    iconeAcao: {
        borderRadius: 15,
        padding: 6,
    },
});

// Componente de campo com validação - FORA do componente principal para evitar re-renderização
const CampoComValidacao = memo(({ 
    label, 
    valor, 
    valorTemp, 
    setValorTemp, 
    editando, 
    iniciarEdicao, 
    confirmar, 
    cancelar,
    valorExibido,
    cores,
    keyboardType = 'default',
    onChangeText
}) => {
    const inputRef = useRef(null);
    
    useEffect(() => {
        if (editando && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [editando]);
    
    const handleConfirmar = () => {
        Keyboard.dismiss();
        confirmar();
    };
    
    const handleCancelar = () => {
        Keyboard.dismiss();
        cancelar();
    };
    
    const handleChangeText = (texto) => {
        if (onChangeText) {
            onChangeText(texto);
        } else {
            setValorTemp(texto);
        }
    };

    return (
        <View style={estilosLocais.campoContainer}>
            {editando ? (
                <View style={estilosLocais.campoEdicao}>
                    <View style={[estilosLocais.inputContainer, { backgroundColor: cores.fundoInput }]}>
                        <TextInput
                            ref={inputRef}
                            value={valorTemp}
                            onChangeText={handleChangeText}
                            placeholder={label}
                            placeholderTextColor={cores.textoSecundario}
                            style={[estilosLocais.input, { color: cores.textoPrimario }]}
                            autoFocus={false}
                            keyboardType={keyboardType}
                        />
                    </View>
                    <View style={estilosLocais.botoesValidacao}>
                        <Pressable onPress={handleConfirmar} style={[estilosLocais.botaoValidacao, { backgroundColor: cores.secundaria }]}>
                            <Ionicons name="checkmark" size={20} color={cores.textoSobrePrimaria} />
                        </Pressable>
                        <Pressable onPress={handleCancelar} style={[estilosLocais.botaoValidacao, { backgroundColor: cores.primaria }]}>
                            <Ionicons name="close" size={20} color={cores.textoSobrePrimaria} />
                        </Pressable>
                    </View>
                </View>
            ) : (
                <Pressable onPress={iniciarEdicao} style={[estilosLocais.campoExibicao, { backgroundColor: cores.fundoElemento }]}>
                    <Text style={[estilosLocais.textoExibicao, { color: cores.textoPrimario }]}>
                        {valorExibido || valor || label}
                    </Text>
                    <Ionicons name="pencil" size={16} color={cores.textoSecundario} />
                </Pressable>
            )}
        </View>
    );
});

export default function PaginaEditarPerfil() {
    const navigation = useNavigation();
    const { estilos, cores, altoContraste } = useEstilos();
    const { usuario, atualizarPerfil, carregando } = useUsuario();
    
    // Estados para os campos
    const [tags, setTags] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalObraVisible, setModalObraVisible] = useState(false);
    const [modalColecaoVisible, setModalColecaoVisible] = useState(false);
    const [fotoCapa, setFotoCapa] = useState(null);
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [uploadandoImagem, setUploadandoImagem] = useState(false);
    
    // Estado para edição de obra
    const [modalEditarObraVisible, setModalEditarObraVisible] = useState(false);
    const [obraParaEditar, setObraParaEditar] = useState(null);
    
    // Estado para visualizar foto de capa em tela cheia
    const [modalFotoCapaVisible, setModalFotoCapaVisible] = useState(false);
    
    // Nome com edição
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [nomeTemp, setNomeTemp] = useState('');
    const [editandoNome, setEditandoNome] = useState(false);
    const nomeInputRef = useRef(null);
    
    // Campos com validação
    const [biografia, setBiografia] = useState('');
    const [biografiaTemp, setBiografiaTemp] = useState('');
    const [editandoBiografia, setEditandoBiografia] = useState(false);
    
    const [telefone, setTelefone] = useState('');
    const [telefoneTemp, setTelefoneTemp] = useState('');
    const [editandoTelefone, setEditandoTelefone] = useState(false);
    
    const [instagram, setInstagram] = useState('');
    const [instagramTemp, setInstagramTemp] = useState('');
    const [editandoInstagram, setEditandoInstagram] = useState(false);
    
    // Obras e coleções
    const [obras, setObras] = useState([]);
    const [colecoes, setColecoes] = useState([]);

    const todasAsTags = ['Arte', 'Design', 'Fotografia', 'Pintura', 'Escultura'];

    // Carregar dados do usuário logado
    useEffect(() => {
        if (usuario) {
            setNomeUsuario(usuario.nome || '');
            setBiografia(usuario.biografia || '');
            // Remove o +55 do número para exibição formatada
            const numeroSemCodigo = removerCodigoPais(usuario.numeroContato || '');
            // Formata para exibição
            const numeroFormatado = formatarTelefoneParaExibicao(numeroSemCodigo);
            setTelefone(numeroFormatado);
            setInstagram(usuario.instagram || '');
            setFotoCapa(usuario.fotoCapa || null);
            setFotoPerfil(usuario.fotoPerfil || null);
            setTags(usuario.tags || []);
            setObras(usuario.obras || []);
            setColecoes(usuario.colecoes || []);
        }
    }, [usuario]);

    const adicionarTag = (tag) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    };

    const salvarTags = async (tagsSelecionadas) => {
        setTags(tagsSelecionadas);
        await atualizarPerfil({ tags: tagsSelecionadas });
    };

    const selecionarImagem = async (setFoto, campo) => {
        // Configurações diferentes para foto de perfil e foto de capa
        const isFotoPerfil = campo === 'fotoPerfil';
        
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: isFotoPerfil, // Edição apenas para foto de perfil
            aspect: isFotoPerfil ? [1, 1] : undefined, // Aspecto apenas para foto de perfil
            quality: isFotoPerfil ? 0.8 : 1, // Qualidade máxima para foto de capa
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            
            // Verificar tamanho do arquivo para foto de capa (limite de 20MB)
            if (!isFotoPerfil && asset.fileSize && asset.fileSize > 20 * 1024 * 1024) {
                Alert.alert('Arquivo muito grande', 'O tamanho máximo permitido é 20MB.');
                return;
            }
            
            const uri = asset.uri;
            setUploadandoImagem(true);
            
            try {
                // Upload para Cloudinary
                const resultadoUpload = await uploadImagem(uri, 'perfil');
                
                if (resultadoUpload.sucesso) {
                    setFoto(resultadoUpload.url);
                    await atualizarPerfil({ [campo]: resultadoUpload.url });
                } else {
                    Alert.alert('Erro', 'Erro ao fazer upload da imagem. Tente novamente.');
                }
            } catch (erro) {
                console.error('Erro no upload:', erro);
                Alert.alert('Erro', 'Erro ao fazer upload da imagem.');
            } finally {
                setUploadandoImagem(false);
            }
        }
    };

    // Funções de edição do nome
    const iniciarEdicaoNome = () => {
        setNomeTemp(nomeUsuario);
        setEditandoNome(true);
        setTimeout(() => nomeInputRef.current?.focus(), 100);
    };

    const confirmarNome = async () => {
        if (nomeTemp.trim()) {
            setNomeUsuario(nomeTemp.trim());
            setEditandoNome(false);
            await atualizarPerfil({ nome: nomeTemp.trim() });
        } else {
            Alert.alert('Erro', 'O nome não pode estar vazio.');
        }
    };

    const cancelarNome = () => {
        setNomeTemp(nomeUsuario);
        setEditandoNome(false);
    };

    // Funções de validação para biografia
    const iniciarEdicaoBiografia = useCallback(() => {
        setBiografiaTemp(biografia);
        setEditandoBiografia(true);
    }, [biografia]);
    
    const confirmarBiografia = useCallback(async () => {
        setBiografia(biografiaTemp);
        setEditandoBiografia(false);
        await atualizarPerfil({ biografia: biografiaTemp });
    }, [biografiaTemp, atualizarPerfil]);
    
    const cancelarBiografia = useCallback(() => {
        setBiografiaTemp(biografia);
        setEditandoBiografia(false);
    }, [biografia]);

    // Funções de validação para telefone
    const iniciarEdicaoTelefone = useCallback(() => {
        setTelefoneTemp(telefone);
        setEditandoTelefone(true);
    }, [telefone]);
    
    const handleTelefoneChange = useCallback((texto) => {
        const telefoneFormatado = formatarTelefone(texto);
        setTelefoneTemp(telefoneFormatado);
    }, []);
    
    const confirmarTelefone = useCallback(async () => {
        // Usa a função do formatadores.js para preparar o número para salvar
        const numeroParaSalvar = formatarTelefoneParaSalvar(telefoneTemp);
        
        setTelefone(telefoneTemp);
        setEditandoTelefone(false);
        await atualizarPerfil({ numeroContato: numeroParaSalvar });
    }, [telefoneTemp, atualizarPerfil]);
    
    const cancelarTelefone = useCallback(() => {
        setTelefoneTemp(telefone);
        setEditandoTelefone(false);
    }, [telefone]);

    // Funções de validação para Instagram
    // Nota: O Instagram é salvo SEM o @ para compatibilidade com a URL (instagram.com/username)
    const iniciarEdicaoInstagram = useCallback(() => {
        // Remove @ para edição, se houver (por segurança)
        const instagramSemArroba = instagram.replace(/^@/, '');
        setInstagramTemp(instagramSemArroba);
        setEditandoInstagram(true);
    }, [instagram]);
    
    const confirmarInstagram = useCallback(async () => {
        // Remove @ se o usuário digitou - salva apenas o username
        let instagramLimpo = instagramTemp.replace(/^@/, '').trim();
        
        setInstagram(instagramLimpo);
        setEditandoInstagram(false);
        await atualizarPerfil({ instagram: instagramLimpo });
    }, [instagramTemp, atualizarPerfil]);
    
    const cancelarInstagram = useCallback(() => {
        setInstagramTemp(instagram.replace(/^@/, ''));
        setEditandoInstagram(false);
    }, [instagram]);

    // Callback quando obra é adicionada
    const handleObraAdicionada = useCallback((novaObra) => {
        setObras(prev => [...prev, novaObra]);
    }, []);

    // Callback quando coleção é adicionada
    const handleColecaoAdicionada = useCallback((novaColecao) => {
        setColecoes(prev => [...prev, novaColecao]);
    }, []);

    // Função para excluir obra
    const excluirObra = useCallback(async (obraId) => {
        Alert.alert(
            'Excluir Obra',
            'Tem certeza que deseja excluir esta obra?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        const novasObras = obras.filter(obra => obra.id !== obraId);
                        setObras(novasObras);
                        await atualizarPerfil({ obras: novasObras });
                    }
                }
            ]
        );
    }, [obras, atualizarPerfil]);

    // Função para editar obra (abre modal de edição)
    const editarObra = useCallback((obra) => {
        setObraParaEditar(obra);
        setModalEditarObraVisible(true);
    }, []);

    // Callback quando obra é editada
    const handleObraEditada = useCallback((obraEditada) => {
        setObras(prev => prev.map(o => o.id === obraEditada.id ? obraEditada : o));
    }, []);

    // Função para excluir coleção
    const excluirColecao = useCallback(async (colecaoId) => {
        Alert.alert(
            'Excluir Coleção',
            'Tem certeza que deseja excluir esta coleção?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        const novasColecoes = colecoes.filter(colecao => colecao.id !== colecaoId);
                        setColecoes(novasColecoes);
                        await atualizarPerfil({ colecoes: novasColecoes });
                    }
                }
            ]
        );
    }, [colecoes, atualizarPerfil]);

    // Função para editar coleção (abre modal de edição - por enquanto apenas exibe alerta)
    const editarColecao = useCallback((colecao) => {
        Alert.alert('Editar Coleção', `Edição da coleção "${colecao.titulo}" em desenvolvimento.`);
    }, []);

    return (
        <View style={estilos.paginaEditarPerfil_container}>
            <BotaoAltoContraste />
            <ScrollView contentContainerStyle={estilos.paginaEditarPerfil_scrollContainer}>
                <Pressable onPress={() => navigation.navigate('Inicio', { screen: 'PaginaInicial' })}>
                    <Image
                        source={altoContraste ? logoAltoContraste : logoNormal}
                        style={estilos.paginaEditarPerfil_logo}
                    />
                </Pressable>

                <View style={estilos.paginaEditarPerfil_conteudo}>
                    <Pressable
                        style={estilos.paginaEditarPerfil_adicionarFotoCapa}
                        onPress={() => selecionarImagem(setFotoCapa, 'fotoCapa')}
                        onLongPress={() => fotoCapa && setModalFotoCapaVisible(true)}
                    >
                        {fotoCapa ? (
                            <Image source={{ uri: fotoCapa }} style={estilos.paginaEditarPerfil_fotoCapaPreview} />
                        ) : (
                            <Text style={estilos.paginaEditarPerfil_link}>Adicionar foto de capa</Text>
                        )}
                    </Pressable>

                    <Pressable
                        style={estilos.paginaEditarPerfil_adicionarFotoPerfil}
                        onPress={() => selecionarImagem(setFotoPerfil, 'fotoPerfil')}
                    >
                        {fotoPerfil ? (
                            <Image source={{ uri: fotoPerfil }} style={estilos.paginaEditarPerfil_fotoPerfilPreview} />
                        ) : (
                            <Text style={estilos.paginaEditarPerfil_link}>Adicionar foto de perfil</Text>
                        )}
                    </Pressable>

                    {uploadandoImagem && (
                        <View style={{ marginVertical: 10, alignItems: 'center' }}>
                            <ActivityIndicator size="small" color={cores.primaria} />
                            <Text style={{ color: cores.textoPrimario, fontSize: 12 }}>Enviando imagem...</Text>
                        </View>
                    )}

                    {/* Nome com edição */}
                    <View style={estilosLocais.nomeContainer}>
                        {editandoNome ? (
                            <View style={estilosLocais.nomeEdicaoVertical}>
                                <TextInput
                                    ref={nomeInputRef}
                                    value={nomeTemp}
                                    onChangeText={setNomeTemp}
                                    placeholder="Seu Nome Artístico"
                                    placeholderTextColor={cores.textoSecundario}
                                    style={[estilosLocais.nomeInput, { color: cores.secundaria, borderBottomColor: cores.secundaria, width: '100%' }]}
                                />
                                <View style={estilosLocais.botoesValidacaoNome}>
                                    <Pressable onPress={confirmarNome} style={[estilosLocais.botaoValidacao, { backgroundColor: cores.secundaria }]}>
                                        <Ionicons name="checkmark" size={20} color={cores.textoSobrePrimaria} />
                                    </Pressable>
                                    <Pressable onPress={cancelarNome} style={[estilosLocais.botaoValidacao, { backgroundColor: cores.primaria }]}>
                                        <Ionicons name="close" size={20} color={cores.textoSobrePrimaria} />
                                    </Pressable>
                                </View>
                            </View>
                        ) : (
                            <View style={estilosLocais.nomeExibicaoVertical}>
                                <Titulo color={cores.secundaria} style={estilos.paginaEditarPerfil_titulo}>
                                    {nomeUsuario || 'Seu Nome'}
                                </Titulo>
                                <Pressable onPress={iniciarEdicaoNome} style={estilosLocais.botaoEditarNomeAbaixo}>
                                    <Ionicons name="pencil" size={16} color={cores.textoSecundario} />
                                    <Text style={{ color: cores.textoSecundario, fontSize: 12, marginLeft: 5 }}>Editar nome</Text>
                                </Pressable>
                            </View>
                        )}
                    </View>

                    <View style={estilos.paginaEditarPerfil_tagsContainerAlinhado}>
                        <Botao
                            style={estilos.paginaEditarPerfil_addButton}
                            backgroundColor={cores.secundaria}
                            pressedBackgroundColor={cores.secundariaPressed}
                            onPress={() => setModalVisible(true)}
                        >
                            Adicionar Tags
                        </Botao>
                        <View style={estilos.paginaEditarPerfil_tagsContainer}>
                            {tags.map((tag, index) => (
                                <View key={index} style={estilos.paginaEditarPerfil_tagItem}>
                                    <Text style={estilos.paginaEditarPerfil_tagText}>{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={estilos.paginaEditarPerfil_barraDeInputContainerAlinhado}>
                        <CampoComValidacao
                            label="Escreva sua mini biografia"
                            valor={biografia}
                            valorTemp={biografiaTemp}
                            setValorTemp={setBiografiaTemp}
                            editando={editandoBiografia}
                            iniciarEdicao={iniciarEdicaoBiografia}
                            confirmar={confirmarBiografia}
                            cancelar={cancelarBiografia}
                            cores={cores}
                        />
                        <CampoComValidacao
                            label="Número para contato"
                            valor={telefone}
                            valorTemp={telefoneTemp}
                            setValorTemp={setTelefoneTemp}
                            editando={editandoTelefone}
                            iniciarEdicao={iniciarEdicaoTelefone}
                            confirmar={confirmarTelefone}
                            cancelar={cancelarTelefone}
                            cores={cores}
                            keyboardType="phone-pad"
                            onChangeText={handleTelefoneChange}
                        />
                        <CampoComValidacao
                            label="@ do Instagram"
                            valor={instagram}
                            valorTemp={instagramTemp}
                            setValorTemp={setInstagramTemp}
                            editando={editandoInstagram}
                            iniciarEdicao={iniciarEdicaoInstagram}
                            confirmar={confirmarInstagram}
                            cancelar={cancelarInstagram}
                            valorExibido={instagram ? `@${instagram}` : null}
                            cores={cores}
                        />
                    </View>

                    <Titulo style={estilos.paginaEditarPerfil_titulo}>Obras</Titulo>
                    {obras.length > 0 && (
                        <View style={estilosLocais.listaObras}>
                            {obras.map((obra, index) => (
                                <View key={obra.id || index} style={estilosLocais.obraItem}>
                                    {obra.foto && (
                                        <Image source={{ uri: obra.foto }} style={estilosLocais.obraImagem} />
                                    )}
                                    {/* Ícones de ação (editar e excluir) */}
                                    <View style={estilosLocais.iconesAcaoContainer}>
                                        <Pressable onPress={() => editarObra(obra)} style={[estilosLocais.iconeAcao, { backgroundColor: cores.iconeAcaoFundo }]}>
                                            <Ionicons name="pencil" size={16} color={cores.iconeClaro} />
                                        </Pressable>
                                        <Pressable onPress={() => excluirObra(obra.id)} style={[estilosLocais.iconeAcao, { backgroundColor: cores.iconeAcaoFundo }]}>
                                            <Ionicons name="trash" size={16} color={cores.iconeClaro} />
                                        </Pressable>
                                    </View>
                                    <Text style={[estilosLocais.obraTitulo, { color: cores.textoPrimario }]} numberOfLines={2}>
                                        {obra.titulo}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}
                    <BotaoAdicionarObraOuColecao
                        style={estilos.paginaEditarPerfil_botaoAdicionarAlinhado}
                        onPress={() => setModalObraVisible(true)}
                    />

                    <Titulo style={estilos.paginaEditarPerfil_titulo}>Coleções</Titulo>
                    {colecoes.length > 0 && (
                        <View style={estilosLocais.listaObras}>
                            {colecoes.map((colecao, index) => (
                                <View key={colecao.id || index} style={estilosLocais.obraItem}>
                                    {colecao.foto && (
                                        <Image source={{ uri: colecao.foto }} style={estilosLocais.obraImagem} />
                                    )}
                                    {/* Ícones de ação (editar e excluir) */}
                                    <View style={estilosLocais.iconesAcaoContainer}>
                                        <Pressable onPress={() => editarColecao(colecao)} style={[estilosLocais.iconeAcao, { backgroundColor: cores.iconeAcaoFundo }]}>
                                            <Ionicons name="pencil" size={16} color={cores.iconeClaro} />
                                        </Pressable>
                                        <Pressable onPress={() => excluirColecao(colecao.id)} style={[estilosLocais.iconeAcao, { backgroundColor: cores.iconeAcaoFundo }]}>
                                            <Ionicons name="trash" size={16} color={cores.iconeClaro} />
                                        </Pressable>
                                    </View>
                                    <Text style={[estilosLocais.obraTitulo, { color: cores.textoPrimario }]} numberOfLines={2}>
                                        {colecao.titulo}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}
                    <BotaoAdicionarObraOuColecao
                        style={estilos.paginaEditarPerfil_botaoAdicionarAlinhado}
                        onPress={() => setModalColecaoVisible(true)}
                    />
                </View>
            </ScrollView>

            <AdicionarTags
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                todasAsTags={todasAsTags}
                adicionarTag={adicionarTag}
                salvarTags={salvarTags}
            />

            <AdicionarObra
                modalVisible={modalObraVisible}
                setModalVisible={setModalObraVisible}
                onObraAdicionada={handleObraAdicionada}
            />

            <EditarObra
                modalVisible={modalEditarObraVisible}
                setModalVisible={setModalEditarObraVisible}
                obra={obraParaEditar}
                onObraEditada={handleObraEditada}
            />

            <AdicionarColecao
                modalVisible={modalColecaoVisible}
                setModalVisible={setModalColecaoVisible}
                onColecaoAdicionada={handleColecaoAdicionada}
            />

            {/* Modal para visualizar foto de capa em tela cheia */}
            <ModalImagemTelaCheia
                visible={modalFotoCapaVisible}
                imageUri={fotoCapa}
                onClose={() => setModalFotoCapaVisible(false)}
            />
        </View>
    );
}
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BotaoAdicionarObraOuColecao from '../componentes/BotaoAdicionarObraOuColecao';
import AdicionarColecao from '../componentes/AdicionarColecao';
import AdicionarObra from '../componentes/AdicionarObra';
import BarraDeInput from '../componentes/BarraDeInput';
import BarraDeNavegacao from '../componentes/BarraDeNavegacao';
import Titulo from '../componentes/Titulo';
import Botao from '../componentes/Botao';
import { useNavigation } from '@react-navigation/native';
import AdicionarTags from '../componentes/AdicionarTags';
import estilosGlobais from '../estilos/estilosGlobais';

export default function PaginaCadastro() {
    const [tags, setTags] = useState([]); // Estado para armazenar as tags
    const [modalVisible, setModalVisible] = useState(false); // Estado para controlar o pop-up
    const [modalObraVisible, setModalObraVisible] = useState(false); // Estado para modal de obra
    const [modalColecaoVisible, setModalColecaoVisible] = useState(false); // Estado para modal de coleção
    const [fotoCapa, setFotoCapa] = useState(null); // Estado para armazenar a foto de capa
    const [fotoPerfil, setFotoPerfil] = useState(null); // Estado para armazenar a foto de perfil
    const [nomeUsuario, setNomeUsuario] = useState('Luísa Gabriela Nome Gigante'); // Estado para o nome do usuário
    const [editandoNome, setEditandoNome] = useState(false); // Estado para controlar a edição do nome
    const navigation = useNavigation();

    const todasAsTags = ['Arte', 'Design', 'Fotografia', 'Pintura', 'Escultura']; // Tags disponíveis

    const adicionarTag = (tag) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    };

    const salvarTags = (tagsSelecionadas) => {
        setTags(tagsSelecionadas);
    };

    const selecionarImagem = async (setFoto) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setFoto(result.assets[0].uri);
        }
    };

    const salvarNome = (novoNome) => {
        setNomeUsuario(novoNome);
        setEditandoNome(false);
    };

    return (
        <View style={estilosGlobais.paginaEditarPerfil_container}>
            <ScrollView contentContainerStyle={estilosGlobais.paginaEditarPerfil_scrollContainer}>
                <Image
                    source={require('../assets/images/logotipo.webp')}
                    style={estilosGlobais.paginaEditarPerfil_logo}
                />

                <View style={estilosGlobais.paginaEditarPerfil_conteudo}>
                    <Pressable
                        style={estilosGlobais.paginaEditarPerfil_adicionarFotoCapa}
                        onPress={() => selecionarImagem(setFotoCapa)}
                    >
                        {fotoCapa ? (
                            <Image source={{ uri: fotoCapa }} style={estilosGlobais.paginaEditarPerfil_fotoCapaPreview} />
                        ) : (
                            <Text style={estilosGlobais.paginaEditarPerfil_link}>Adicionar foto de capa</Text>
                        )}
                    </Pressable>

                    <Pressable
                        style={estilosGlobais.paginaEditarPerfil_adicionarFotoPerfil}
                        onPress={() => selecionarImagem(setFotoPerfil)}
                    >
                        {fotoPerfil ? (
                            <Image source={{ uri: fotoPerfil }} style={estilosGlobais.paginaEditarPerfil_fotoPerfilPreview} />
                        ) : (
                            <Text style={estilosGlobais.paginaEditarPerfil_link}>Adicionar foto de perfil</Text>
                        )}
                    </Pressable>

                    <Pressable onLongPress={() => setEditandoNome(true)}>
                        {editandoNome ? (
                            <BarraDeInput
                                label="Editar Nome"
                                value={nomeUsuario}
                                onChangeText={setNomeUsuario}
                                onBlur={() => salvarNome(nomeUsuario)}
                                style={estilosGlobais.paginaEditarPerfil_inputNome}
                            />
                        ) : (
                            <Titulo color="#134313" style={estilosGlobais.paginaEditarPerfil_titulo}>{nomeUsuario}</Titulo>
                        )}
                    </Pressable>

                    <View style={estilosGlobais.paginaEditarPerfil_tagsContainerAlinhado}>
                        <Botao
                            style={estilosGlobais.paginaEditarPerfil_addButton}
                            backgroundColor="#AB8368"
                            pressedBackgroundColor="#8B5E4E"
                            onPress={() => setModalVisible(true)}
                        >
                            Adicionar Tags
                        </Botao>
                        <View style={estilosGlobais.paginaEditarPerfil_tagsContainer}>
                            {tags.map((tag, index) => (
                                <View key={index} style={estilosGlobais.paginaEditarPerfil_tagItem}>
                                    <Text style={estilosGlobais.paginaEditarPerfil_tagText}>{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={estilosGlobais.paginaEditarPerfil_barraDeInputContainerAlinhado}>
                        <BarraDeInput label="Escreva sua mini biografia" style={estilosGlobais.paginaEditarPerfil_barraDeInput} />
                        <BarraDeInput label="Número para contato" style={estilosGlobais.paginaEditarPerfil_barraDeInput} />
                        <BarraDeInput label="@ do Instagram" style={estilosGlobais.paginaEditarPerfil_barraDeInput} />
                    </View>

                    <Titulo style={estilosGlobais.paginaEditarPerfil_titulo}>Obras</Titulo>
                    <BotaoAdicionarObraOuColecao
                        style={estilosGlobais.paginaEditarPerfil_botaoAdicionarAlinhado}
                        onPress={() => setModalObraVisible(true)}
                    />

                    <Titulo style={estilosGlobais.paginaEditarPerfil_titulo}>Coleções</Titulo>
                    <BotaoAdicionarObraOuColecao
                        style={estilosGlobais.paginaEditarPerfil_botaoAdicionarAlinhado}
                        onPress={() => setModalColecaoVisible(true)}
                    />
                </View>
            </ScrollView>
            <BarraDeNavegacao ativo="perfil" />

            <AdicionarTags
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                todasAsTags={todasAsTags}
                adicionarTag={adicionarTag}
                salvarTags={salvarTags}
            />

            {/* Modal para adicionar obra */}
            <AdicionarObra
                modalVisible={modalObraVisible}
                setModalVisible={setModalObraVisible}
            />

            {/* Modal para adicionar coleção */}
            <AdicionarColecao
                modalVisible={modalColecaoVisible}
                setModalVisible={setModalColecaoVisible} />
        </View>
    );
}
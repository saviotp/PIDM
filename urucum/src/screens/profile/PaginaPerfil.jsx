import { Image, Pressable, ScrollView, Text, View, FlatList, Linking } from 'react-native';
import Titulo from '../../components/common/Titulo';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useEstilos } from '../../hooks/useEstilos';
import ModalImagemTelaCheia from '../../components/modals/ModalImagemTelaCheia';

// Logos
const logoNormal = require('../../assets/images/logotipo.webp');
const logoAltoContraste = require('../../assets/images/logotipoAltoContraste.webp');

const fotoPadraoCapaUri = 'https://via.placeholder.com/600x200';
const fotoPadraoPerfilUri = 'https://via.placeholder.com/150';

export default function PaginaCadastro() {
    const { estilos, cores, altoContraste } = useEstilos();
    const navigation = useNavigation();
    const route = useRoute();
    const usuario = route.params?.usuario;
    
    // Estado para modal de imagem em tela cheia
    const [imagemSelecionada, setImagemSelecionada] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const abrirImagemCompleta = (imagemUri) => {
        if (imagemUri) {
            setImagemSelecionada(imagemUri);
            setModalVisible(true);
        }
    };

    const fecharModal = () => {
        setModalVisible(false);
        setImagemSelecionada(null);
    };

    if (!usuario) {
        return (
            <View style={estilos.paginaPerfil_container}>
                <Text style={{ color: cores.erro, textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>
                    Erro: Nenhum usuário foi fornecido.
                </Text>
            </View>
        );
    }

    const { fotoCapa, fotoPerfil, nome, biografia, tags, obras, colecoes, telefone, numeroContato, instagram } = usuario;

    // Valores padrão para evitar erros quando o usuário não configurou o perfil
    const tagsSeguras = Array.isArray(tags) ? tags : [];
    const obrasSeguras = Array.isArray(obras) ? obras : [];
    const colecoesSeguras = Array.isArray(colecoes) ? colecoes : [];
    const biografiaSegura = biografia || 'Este artista ainda não adicionou uma biografia.';
    const contatoWhatsApp = numeroContato || telefone;
    const fotoCapaExibir = fotoCapa || fotoPadraoCapaUri;

    return (
        <View style={estilos.paginaPerfil_container}>
            <ScrollView contentContainerStyle={estilos.paginaPerfil_scrollContainer}>
                <Pressable onPress={() => navigation.navigate('PaginaInicial')}>
                    <Image
                        source={altoContraste ? logoAltoContraste : logoNormal}
                        style={estilos.paginaPerfil_logo}
                    />
                </Pressable>

                <View style={estilos.paginaPerfil_conteudo}>
                    <Pressable 
                        style={estilos.paginaPerfil_adicionarfotoCapa}
                        onPress={() => abrirImagemCompleta(fotoCapaExibir)}
                    >
                        <Image 
                            source={{ uri: fotoCapaExibir }}
                            style={estilos.paginaPerfil_fotoCapa}
                            resizeMode="cover"
                        />
                    </Pressable>

                    <View style={estilos.paginaPerfil_adicionarFotoPerfil}>
                        {fotoPerfil ? (
                            <Image 
                                source={{ uri: fotoPerfil }}
                                style={estilos.paginaPerfil_fotoPerfil}
                                resizeMode="cover"
                            />
                        ) : (
                            <Image 
                                source={{ uri: fotoPadraoPerfilUri }}
                                style={estilos.paginaPerfil_fotoPerfil}
                                resizeMode="cover"
                            />
                        )}
                    </View>

                    <Titulo color={cores.textoPrimario} style={estilos.paginaPerfil_titulo}>{nome}</Titulo>

                    <View style={estilos.paginaPerfil_tagListContainer}>
                        <FlatList
                            data={tagsSeguras}
                            keyExtractor={(item, index) => `${item}-${index}`}
                            renderItem={({ item }) => (
                                <View style={estilos.paginaPerfil_tagItem}>
                                    <Text style={estilos.paginaPerfil_tagText}>{item}</Text>
                                </View>
                            )}
                            horizontal
                            ListEmptyComponent={
                                <Text style={{ color: cores.textoSecundario, fontStyle: 'italic' }}>
                                    Nenhuma tag adicionada ainda.
                                </Text>
                            }
                        />
                    </View>

                    <Text style={estilos.paginaPerfil_biografia}>{biografiaSegura}</Text>

                    <Titulo style={estilos.paginaPerfil_titulo}>Obras</Titulo>
                    <View style={estilos.paginaPerfil_listaHorizontalContainer}>
                        <FlatList
                            data={obrasSeguras}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => `${item.id}-${index}`}
                            renderItem={({ item: obra }) => (
                                <Pressable 
                                    style={estilos.paginaPerfil_obraItemHorizontal} 
                                    onPress={() => navigation.navigate('VisualizarObra', {
                                        obras: obrasSeguras,
                                        obraInicial: obra
                                    })}
                                >
                                    <Image source={{ uri: obra.foto }} style={estilos.paginaPerfil_obrafotoHorizontal} />
                                    <Text style={estilos.paginaPerfil_obraTitulo} numberOfLines={1}>{obra.titulo}</Text>
                                </Pressable>
                            )}
                            ListEmptyComponent={
                                <Text style={{ color: cores.textoSecundario, fontStyle: 'italic' }}>
                                    Nenhuma obra adicionada ainda.
                                </Text>
                            }
                        />
                    </View>

                    <Titulo style={estilos.paginaPerfil_titulo}>Coleções</Titulo>
                    <View style={estilos.paginaPerfil_listaHorizontalContainer}>
                        <FlatList
                            data={colecoesSeguras}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => `${item.id}-${index}`}
                            renderItem={({ item: colecao }) => (
                                <Pressable
                                    style={estilos.paginaPerfil_obraItemHorizontal}
                                    onPress={() => navigation.navigate('VisualizarColecao', {
                                        colecoes: colecoesSeguras,
                                        colecaoInicial: colecao
                                    })}
                                >
                                    <Image source={{ uri: colecao.foto }} style={estilos.paginaPerfil_obrafotoHorizontal} />
                                    <Text style={estilos.paginaPerfil_obraTitulo} numberOfLines={1}>{colecao.titulo}</Text>
                                </Pressable>
                            )}
                            ListEmptyComponent={
                                <Text style={{ color: cores.textoSecundario, fontStyle: 'italic' }}>
                                    Nenhuma coleção adicionada ainda.
                                </Text>
                            }
                        />
                    </View>

                    <Titulo style={estilos.paginaPerfil_titulo}>Contato</Titulo>
                    <View style={[estilos.paginaPerfil_iconesContainer, { marginBottom: 100 }]}>
                        {instagram && (
                            <Pressable onPress={() => Linking.openURL(`https://instagram.com/${instagram}`)}>
                                <FontAwesome name="instagram" size={40} color={cores.primaria} style={estilos.paginaPerfil_icone} />
                            </Pressable>
                        )}
                        {contatoWhatsApp && (
                            <Pressable onPress={() => Linking.openURL(`https://wa.me/${contatoWhatsApp.replace(/\D/g, '')}`)}>
                                <FontAwesome name="whatsapp" size={40} color={cores.secundaria} style={estilos.paginaPerfil_icone} />
                            </Pressable>
                        )}
                    </View>
                </View>
            </ScrollView>

            <ModalImagemTelaCheia
                visible={modalVisible}
                imagemUri={imagemSelecionada}
                onClose={fecharModal}
            />
        </View>
    );
}
import { Image, Pressable, ScrollView, Text, View, FlatList, Linking } from 'react-native';
import AdicionarObraOuColecao from '../componentes/AdicionarObra';
import BarraDeNavegacao from '../componentes/BarraDeNavegacao';
import Titulo from '../componentes/Titulo';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import estilosGlobais from '../estilos/estilosGlobais';

const fotoPadraoCapaUri = 'https://via.placeholder.com/600x200';
const fotoPadraoPerfilUri = 'https://via.placeholder.com/150';

export default function PaginaCadastro() {
    const navigation = useNavigation();
    const [colecaoSelecionada, setColecaoSelecionada] = useState(null);
    const route = useRoute();
    const usuario = route.params?.usuario;

    if (!usuario) {
        return (
            <View style={estilosGlobais.paginaPerfil_container}>
                <Text style={{ color: 'red', textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>
                    Erro: Nenhum usuário foi fornecido.
                </Text>
            </View>
        );
    }

    const { fotoCapa, fotoPerfil, nome, biografia, tags, obras, colecoes, numeroContato, instagram } = usuario;

    return (
        <View style={estilosGlobais.paginaPerfil_container}>
            <ScrollView contentContainerStyle={estilosGlobais.paginaPerfil_scrollContainer}>
                <Image
                    source={require('../assets/images/logotipo.webp')}
                    style={estilosGlobais.paginaPerfil_logo}
                />

                <View style={estilosGlobais.paginaPerfil_conteudo}>
                    <View style={estilosGlobais.paginaPerfil_adicionarfotoCapa}>
                        {fotoCapa ? (
                            <Image 
                                source={{ uri: fotoCapa }}
                                style={estilosGlobais.paginaPerfil_fotoCapa} // Estilo corrigido
                                resizeMode="cover" // Garante que a foto cubra toda a área
                            />
                        ) : (
                            <Image 
                                source={{ uri: fotoPadraoCapaUri }}
                                style={estilosGlobais.paginaPerfil_fotoCapa}
                                resizeMode="cover"
                            />
                        )}
                    </View>

                    <View style={estilosGlobais.paginaPerfil_adicionarFotoPerfil}>
                        {fotoPerfil ? (
                            <Image 
                                source={{ uri: fotoPerfil }}
                                style={estilosGlobais.paginaPerfil_fotoPerfil} // Estilo corrigido para esfera
                                resizeMode="cover"
                            />
                        ) : (
                            <Image 
                                source={{ uri: fotoPadraoPerfilUri }}
                                style={estilosGlobais.paginaPerfil_fotoPerfil} // Estilo corrigido para esfera
                                resizeMode="cover"
                            />
                        )}
                    </View>

                    <Titulo color="#134313" style={estilosGlobais.paginaPerfil_titulo}>{nome}</Titulo>

                    <View style={estilosGlobais.paginaPerfil_tagListContainer}>
                        <FlatList
                            data={tags}
                            keyExtractor={(item, index) => `${item}-${index}`}
                            renderItem={({ item }) => (
                                <View style={estilosGlobais.paginaPerfil_tagItem}>
                                    <Text style={estilosGlobais.paginaPerfil_tagText}>{item}</Text>
                                </View>
                            )}
                            horizontal
                        />
                    </View>

                    <Text style={estilosGlobais.paginaPerfil_biografia}>{biografia}</Text>

                    <Titulo style={estilosGlobais.paginaPerfil_titulo}>Obras</Titulo>
                    <View style={estilosGlobais.paginaPerfil_listaContainer}>
                        {obras.map((obra, index) => (
                            <Pressable 
                                key={`${obra.id}-${index}`} 
                                style={estilosGlobais.paginaPerfil_obraItem} 
                                onPress={() => navigation.navigate('VisualizarObra', {
                                    obras: obras,
                                    obraInicial: obra
                                })}
                            >
                                <Image source={{ uri: obra.foto }} style={estilosGlobais.paginaPerfil_obrafoto} />
                                <Text style={estilosGlobais.paginaPerfil_obraTitulo}>{obra.titulo}</Text>
                            </Pressable>
                        ))}
                    </View>

                    <Titulo style={estilosGlobais.paginaPerfil_titulo}>Coleções</Titulo>
                    <View style={estilosGlobais.paginaPerfil_listaContainer}>
                        {colecoes.map((colecao, index) => (
                            <Pressable
                                key={`${colecao.id}-${index}`}
                                style={estilosGlobais.paginaPerfil_obraItem}
                                onPress={() => navigation.navigate('VisualizarColecao', {
                                    colecoes: colecoes,
                                    colecaoInicial: colecao
                                })}
                            >
                                <Image source={{ uri: colecao.foto }} style={estilosGlobais.paginaPerfil_obrafoto} />
                                <Text style={estilosGlobais.paginaPerfil_obraTitulo}>{colecao.titulo}</Text>
                            </Pressable>
                        ))}
                    </View>

                    <Titulo style={estilosGlobais.paginaPerfil_titulo}>Contato</Titulo>
                    <View style={estilosGlobais.paginaPerfil_iconesContainer}>
                        <Pressable onPress={() => Linking.openURL(`https://instagram.com/${instagram}`)}>
                            <FontAwesome name="instagram" size={40} color="#AA0000" style={estilosGlobais.paginaPerfil_icone} />
                        </Pressable>
                        <Pressable onPress={() => Linking.openURL(`https://wa.me/${numeroContato}`)}>
                            <FontAwesome name="whatsapp" size={40} color="#134313" style={estilosGlobais.paginaPerfil_icone} />
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
            <BarraDeNavegacao ativo="perfil" />
        </View>
    );
}
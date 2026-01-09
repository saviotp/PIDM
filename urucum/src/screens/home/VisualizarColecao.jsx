import { View, Text, Image, ScrollView, FlatList, Pressable, Dimensions } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import { useRef, useEffect, useState } from 'react';
import Titulo from "../../components/common/Titulo";
import BotaoVoltar from "../../components/common/BotaoVoltar";
import { useEstilos } from "../../hooks/useEstilos";
import ModalImagemTelaCheia from "../../components/modals/ModalImagemTelaCheia";

const { width: larguraTela, height: alturaTela } = Dimensions.get('window');

export default function VisualizarColecao() {
    const navigation = useNavigation();
    const route = useRoute();
    const { colecoes = [], colecaoInicial } = route.params || {};
    const scrollViewRef = useRef(null);
    const { estilos, cores } = useEstilos();
    
    // Estado para modal de imagem em tela cheia
    const [imagemSelecionada, setImagemSelecionada] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (scrollViewRef.current && colecaoInicial) {
            const index = colecoes.findIndex(colecao => colecao.titulo === colecaoInicial.titulo);
            if (index !== -1) {
                scrollViewRef.current.scrollTo({ y: index * 500, animated: true });
            }
        }
    }, [colecaoInicial, colecoes]);

    const abrirImagemCompleta = (imagemUri) => {
        setImagemSelecionada(imagemUri);
        setModalVisible(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
        setImagemSelecionada(null);
    };

    return (
        <View style={estilos.visualizarColecao_container}>
            <BotaoVoltar onPress={() => navigation.goBack()} />
            <ScrollView
                ref={scrollViewRef}
                style={estilos.visualizarColecao_scrollView}
                contentContainerStyle={estilos.visualizarColecao_scrollContainer}
            >
                {colecoes.map((colecao, index) => (
                    <View key={colecao.id || index} style={estilos.visualizarColecao_colecaoContainer}>
                        <Titulo style={estilos.visualizarColecao_titulo}>{colecao.titulo}</Titulo>
                        <FlatList
                            data={colecao.obras}
                            horizontal
                            keyExtractor={(item, idx) => `${item.titulo}-${idx}`}
                            renderItem={({ item }) => (
                                <View style={estilos.visualizarColecao_obraContainer}>
                                    <Pressable onPress={() => abrirImagemCompleta(item.foto)}>
                                        <Image
                                            source={{ uri: item.foto || 'https://via.placeholder.com/300' }}
                                            style={estilos.visualizarColecao_imagem}
                                        />
                                    </Pressable>
                                    <Text style={estilos.visualizarColecao_texto}>{item.descricao}</Text>
                                </View>
                            )}
                        />
                    </View>
                ))}
            </ScrollView>

            <ModalImagemTelaCheia
                visible={modalVisible}
                imagemUri={imagemSelecionada}
                onClose={fecharModal}
            />
        </View>
    );
}

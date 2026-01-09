import { View, Text, Image, ScrollView, Pressable, Dimensions } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import { useRef, useEffect, useState } from 'react';
import Titulo from "../../components/common/Titulo";
import BotaoVoltar from "../../components/common/BotaoVoltar";
import { useEstilos } from "../../hooks/useEstilos";
import ModalImagemTelaCheia from "../../components/modals/ModalImagemTelaCheia";

const { width: larguraTela, height: alturaTela } = Dimensions.get('window');

export default function VisualizarObraOuColecao() {
    const { estilos, cores } = useEstilos();
    const navigation = useNavigation();
    const route = useRoute();
    const { obras = [], obraInicial } = route.params || {};
    const scrollViewRef = useRef(null);
    
    // Estado para modal de imagem em tela cheia
    const [imagemSelecionada, setImagemSelecionada] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (scrollViewRef.current && obraInicial) {
            const index = obras.findIndex(obra => obra.titulo === obraInicial.titulo);
            if (index !== -1) {
                scrollViewRef.current.scrollTo({ y: index * 500, animated: true });
            }
        }
    }, [obraInicial, obras]);

    const abrirImagemCompleta = (imagemUri) => {
        setImagemSelecionada(imagemUri);
        setModalVisible(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
        setImagemSelecionada(null);
    };

    return (
        <View style={estilos.visualizarObra_container}>
            <BotaoVoltar onPress={() => navigation.goBack()} />
            <ScrollView
                ref={scrollViewRef}
                style={estilos.visualizarObra_scrollView}
            >
                {obras.map((obra, index) => (
                    <View 
                        key={obra.id || index} 
                        style={[
                            estilos.visualizarObra_content,
                            index === obras.length - 1 && { marginBottom: 80 }
                        ]}
                    >
                        <Titulo style={estilos.visualizarObra_titulo}>{obra.titulo}</Titulo>
                        <Pressable onPress={() => abrirImagemCompleta(obra.foto)}>
                            <Image
                                source={{ uri: obra.foto || 'https://via.placeholder.com/300' }}
                                style={estilos.visualizarObra_imagem}
                            />
                        </Pressable>
                        <Text style={estilos.visualizarObra_texto}>{obra.descricao}</Text>
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

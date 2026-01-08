import { View, Text, Image, ScrollView, FlatList } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import { useRef, useEffect } from 'react';
import Titulo from "../componentes/Titulo";
import BotaoVoltar from "../componentes/BotaoVoltar";
import estilosGlobais from "../estilos/estilosGlobais";

export default function VisualizarColecao() {
    const navigation = useNavigation();
    const route = useRoute();
    const { colecoes = [], colecaoInicial } = route.params || {}; // Added fallback for undefined `colecoes` and `route.params`
    const scrollViewRef = useRef(null);

    useEffect(() => {
        if (scrollViewRef.current && colecaoInicial) {
            const index = colecoes.findIndex(colecao => colecao.titulo === colecaoInicial.titulo);
            if (index !== -1) {
                scrollViewRef.current.scrollTo({ y: index * 500, animated: true });
            }
        }
    }, [colecaoInicial, colecoes]);

    return (
        <View style={estilosGlobais.visualizarColecao_container}>
            <BotaoVoltar onPress={() => navigation.goBack()} />
            <ScrollView
                ref={scrollViewRef}
                style={estilosGlobais.visualizarColecao_scrollView}
                contentContainerStyle={estilosGlobais.visualizarColecao_scrollContainer}
            >
                {colecoes.map((colecao, index) => (
                    <View key={colecao.id || index} style={estilosGlobais.visualizarColecao_colecaoContainer}>
                        <Titulo style={estilosGlobais.visualizarColecao_titulo}>{colecao.titulo}</Titulo>
                        <FlatList
                            data={colecao.obras}
                            horizontal
                            keyExtractor={(item, idx) => `${item.titulo}-${idx}`}
                            renderItem={({ item }) => (
                                <View style={estilosGlobais.visualizarColecao_obraContainer}>
                                    <Image
                                        source={{ uri: item.foto || 'https://via.placeholder.com/300' }}
                                        style={estilosGlobais.visualizarColecao_imagem}
                                    />
                                    <Text style={estilosGlobais.visualizarColecao_texto}>{item.descricao}</Text>
                                </View>
                            )}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
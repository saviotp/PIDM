import { View, Text, Image, ScrollView } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import { useRef, useEffect } from 'react';
import Titulo from "../componentes/Titulo";
import BotaoVoltar from "../componentes/BotaoVoltar";
import estilosGlobais from "../estilos/estilosGlobais";

export default function VisualizarObraOuColecao() {
    const navigation = useNavigation();
    const route = useRoute();
    const { obras = [], obraInicial } = route.params || {}; // Added fallback for undefined `obras` and `route.params`
    const scrollViewRef = useRef(null);

    useEffect(() => {
        if (scrollViewRef.current && obraInicial) {
            const index = obras.findIndex(obra => obra.titulo === obraInicial.titulo);
            if (index !== -1) {
                scrollViewRef.current.scrollTo({ y: index * 500, animated: true }); // Ajustado para rolar verticalmente
            }
        }
    }, [obraInicial, obras]);

    return (
        <View style={estilosGlobais.visualizarObra_container}>
            <BotaoVoltar onPress={() => navigation.goBack()} />
            <ScrollView
                ref={scrollViewRef}
                style={estilosGlobais.visualizarObra_scrollView} // Removed horizontal and pagingEnabled for vertical layout
            >
                {obras.map((obra, index) => (
                    <View 
                        key={obra.id || index} 
                        style={[
                            estilosGlobais.visualizarObra_content,
                            index === obras.length - 1 && { marginBottom: 80 } // Aplica marginBottom apenas na última obra
                        ]}
                    >
                        <Titulo style={estilosGlobais.visualizarObra_titulo}>{obra.titulo}</Titulo>
                        <Image
                            source={{ uri: obra.foto || 'https://via.placeholder.com/300' }}
                            style={estilosGlobais.visualizarObra_imagem}
                        />
                        <Text style={estilosGlobais.visualizarObra_texto}>{obra.descricao}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
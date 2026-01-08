import { House } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import estilosGlobais from '../estilos/estilosGlobais';

export default function BarraDeNavegacao({
    ativo = "buscar",
    style,
}) {

    return (
        <View style={[estilosGlobais.barraDeNavegacao_container, style]}>
            {/* INÍCIO */}
            <Pressable
                style={({ pressed }) => [
                    estilosGlobais.barraDeNavegacao_botao,
                    ativo === "inicio" && estilosGlobais.barraDeNavegacao_ativo,
                    pressed && estilosGlobais.barraDeNavegacao_pressionado,
                ]}
            >
                <House style={estilosGlobais.barraDeNavegacao_icone} size={24}/>
                <Text style={estilosGlobais.barraDeNavegacao_textoIcone}>Início</Text>
            </Pressable>

            {/* BUSCAR */}
            <Pressable
                style={({ pressed }) => [
                    estilosGlobais.barraDeNavegacao_botao,
                    ativo === "buscar" && estilosGlobais.barraDeNavegacao_ativo,
                    pressed && estilosGlobais.barraDeNavegacao_pressionado,
                ]}
            >
                <FontAwesomeIcon name="magnifying-glass" size={24} style={estilosGlobais.barraDeNavegacao_icone}/>
                <Text style={estilosGlobais.barraDeNavegacao_textoIcone}>Buscar</Text>
            </Pressable>

            {/* PERFIL */}
            <Pressable
                style={({ pressed }) => [
                    estilosGlobais.barraDeNavegacao_botao,
                    ativo === "perfil" && estilosGlobais.barraDeNavegacao_ativo,
                    pressed && estilosGlobais.barraDeNavegacao_pressionado,
                ]}
            >
                <FeatherIcon name="user" size={24} style={estilosGlobais.barraDeNavegacao_icone}/>
                <Text style={estilosGlobais.barraDeNavegacao_textoIcone}>Perfil</Text>
            </Pressable>
        </View>
    );
}
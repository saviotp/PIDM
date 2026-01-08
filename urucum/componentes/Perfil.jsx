import { Image, Text, View } from 'react-native';
import estilosGlobais from '../estilos/estilosGlobais';

export default function Perfil({ nome, fotoCapa, fotoPerfil }) {
    return (
        <View>
            <View
                style={estilosGlobais.perfilComponente_adicionarFotoCapa}
            >
                <Image
                    source={{ uri: fotoCapa }}
                    style={estilosGlobais.perfilComponente_imagemCapa}
                />
            </View>

            <View
                style={estilosGlobais.perfilComponente_adicionarFotoPerfil}
            >
                <Image
                    source={{ uri: fotoPerfil }}
                    style={estilosGlobais.perfilComponente_imagemPerfil}
                />
            </View>

            <Text style={estilosGlobais.perfilComponente_nomeArtista}>{nome}</Text>
        </View>
    );
}
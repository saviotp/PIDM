import { Image, Text, View } from 'react-native';
import { useEstilos } from '../../hooks/useEstilos';

export default function Perfil({ nome, fotoCapa, fotoPerfil }) {
    const { estilos } = useEstilos();
    
    return (
        <View>
            <View
                style={estilos.perfilComponente_adicionarFotoCapa}
            >
                {fotoCapa ? (
                    <Image
                        source={{ uri: fotoCapa }}
                        style={estilos.perfilComponente_imagemCapa}
                    />
                ) : null}
            </View>

            <View
                style={estilos.perfilComponente_adicionarFotoPerfil}
            >
                {fotoPerfil ? (
                    <Image
                        source={{ uri: fotoPerfil }}
                        style={estilos.perfilComponente_imagemPerfil}
                    />
                ) : null}
            </View>

            <Text style={estilos.perfilComponente_nomeArtista}>{nome || 'Nome do Artista'}</Text>
        </View>
    );
}
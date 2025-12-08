import { Image, Text, Pressable, View } from 'react-native';

export default function Perfil() {
    return (
        <Pressable>
            <View
                style={estilos.adicionarFotoCapa}
                onPress={() => console.log('Adicionar foto de capa pressed')}
            >
                <Image
                    source={{ uri: 'https://ichef.bbci.co.uk/images/ic/512xn/p05dbgkg.jpg.webp' }}
                    style={estilos.imagemCapa}
                />
            </View>

            <View
                style={estilos.adicionarFotoPerfil}
                onPress={() => console.log('Adicionar foto de perfil pressed')}
            >
                <Image
                    source={{ uri: 'https://uploads-eu-west-1.insided.com/deezer-pt/attachment/c1d92fc7-efe7-45c2-9838-6aa3d2efeaa6.jpg' }}
                    style={estilos.imagemPerfil}
                />
            </View>

            <Text style={estilos.nomeArtista}>Nome do Usuário</Text>
        </Pressable>
    );
}

const estilos = {
    adicionarFotoCapa: {
        backgroundColor: '#E5E5E5',
        width: '90%',
        height: 200,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    adicionarFotoPerfil: {
        backgroundColor: '#E5E5E5',
        width: '35%',
        aspectRatio: 1, // Garante um círculo perfeito
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#134313',
        borderWidth: 3,
        position: 'absolute',
        top: '40%',
        right: '31%',
    },
    imagemCapa: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    imagemPerfil: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },
    nomeArtista: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 80,
        textAlign: 'center',
        paddingBottom: 20,
    }
};
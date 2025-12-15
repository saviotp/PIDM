import { House } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';

export default function BarraDeNavegacao({
    ativo = "buscar",
    aoPressionarInicio = () => {},
    aoPressionarBusca = () => {},
    aoPressionarPerfil = () => {},
    style,
}) {

    return (
        <View style={[estilos.container, style]}>
            {/* INÍCIO */}
            <Pressable
                onPress={aoPressionarInicio}
                style={({ pressed }) => [
                    estilos.botao,
                    ativo === "inicio" && estilos.ativo,
                    pressed && estilos.pressionado,
                ]}
            >
                <House style={estilos.icone} size={24}/>
                <Text style={estilos.textoIcone}>Início</Text>
            </Pressable>

            {/* BUSCAR */}
            <Pressable
                onPress={aoPressionarBusca}
                style={({ pressed }) => [
                    estilos.botao,
                    ativo === "buscar" && estilos.ativo,
                    pressed && estilos.pressionado,
                ]}
            >
                <FontAwesomeIcon name="magnifying-glass" size={24} style={estilos.icone}/>
                <Text style={estilos.textoIcone}>Buscar</Text>
            </Pressable>

            {/* PERFIL */}
            <Pressable
                onPress={aoPressionarPerfil}
                style={({ pressed }) => [
                    estilos.botao,
                    ativo === "perfil" && estilos.ativo,
                    pressed && estilos.pressionado,
                ]}
            >
                <FeatherIcon name="user" size={24} style={estilos.icone}/>
                <Text style={estilos.textoIcone}>Perfil</Text>
            </Pressable>
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0, // Fixa a barra no final da tela
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFD2B3',
    },
    botao: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        gap: 4,
        paddingTop: 6,
        paddingBottom: 6,
    },
    ativo: {
        borderTopWidth: 3,
        borderTopColor: '#AA0000',  // Linha vermelha para indicar a aba atual
        paddingTop: 3,
    },
    pressionado: {
        opacity: 0.6,
    },
    icone: {
        color: '#AA0000',
    },
    textoIcone: {
        color: '#AA0000',
        fontSize: 12,
        fontWeight: '600',
    },
});
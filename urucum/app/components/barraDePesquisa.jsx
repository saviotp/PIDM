import { House } from 'lucide-react-native';
import { StyleSheet, View, Text } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';

export default function BarraDePesquisa() {
    return (
        <View style={styles.container}>
            <View style={styles.icons}>
                <House style={styles.icon} size={24}/>
                <Text style={styles.iconText}>Início</Text>
            </View>
            <View style={styles.icons}>
                <FontAwesomeIcon name='magnifying-glass' size={22} style={styles.icon}/>
                <Text style={styles.iconText}>Buscar</Text>
            </View>
            <View style={styles.icons}>
                <FeatherIcon name='user' size={24} style={styles.icon}/>
                <Text style={styles.iconText}>Perfil</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFD2B3',
    },

    icons: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        gap: 4,
    },

    icon: {
        color: '#AA0000',
    },

    iconText: {
        color: '#AA0000',
        fontSize: 12,
    }
})
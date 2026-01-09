import { Text, View } from "react-native";
import { useEstilos } from "../../hooks/useEstilos";

export default function Titulo({ children, color, style }) {
    const { estilos, cores } = useEstilos();
    
    return (
        //Style como props para customizar o estilo do componente
        <View style={style}>
            <Text style={[estilos.titulo_texto, { color: color || cores.secundaria }]}>{children}</Text>
        </View>
    )
}
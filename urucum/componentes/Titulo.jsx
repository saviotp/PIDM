import { Text, View } from "react-native";
import estilosGlobais from "../estilos/estilosGlobais";

export default function Titulo({ children, color, style }) {
    return (
        //Style como props para customizar o estilo do componente
        <View style={style}>
            <Text style={[estilosGlobais.titulo_texto, { color: color || '#134313' }]}>{children}</Text>
        </View>
    )
}
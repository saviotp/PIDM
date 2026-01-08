import { Pressable, Text } from "react-native";
import estilosGlobais from "../estilos/estilosGlobais";

export default function Botao({ children, style, backgroundColor, pressedBackgroundColor, onPress }) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                estilosGlobais.botao_botao,
                { backgroundColor: pressed ? pressedBackgroundColor || estilosGlobais.botao_botaoPressed.backgroundColor : backgroundColor || estilosGlobais.botao_botao.backgroundColor },
                style, // Estilos customizáveis via props
            ]}
        >
            <Text style={estilosGlobais.botao_texto}>{children}</Text>
        </Pressable>
    );
}

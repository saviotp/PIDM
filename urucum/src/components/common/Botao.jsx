import { Pressable, Text } from "react-native";
import { useEstilos } from "../../hooks/useEstilos";

export default function Botao({ children, style, backgroundColor, pressedBackgroundColor, onPress, disabled }) {
    const { estilos, cores } = useEstilos();
    
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                estilos.botao_botao,
                { 
                    backgroundColor: pressed 
                        ? pressedBackgroundColor || cores.pressedBackgroundColor 
                        : backgroundColor || cores.secundaria,
                    opacity: disabled ? 0.6 : 1,
                },
                style,
            ]}
        >
            <Text style={estilos.botao_texto}>{children}</Text>
        </Pressable>
    );
}

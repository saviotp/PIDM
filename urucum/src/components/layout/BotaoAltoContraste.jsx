import { Pressable, View } from 'react-native';
import { useTema } from '../../contexts/TemaContext';
import { useEstilos } from '../../hooks/useEstilos';

// Botão de alto contraste com ícone de círculo preto com semi-círculo
export default function BotaoAltoContraste() {
    const { altoContraste, alternarTema, cores } = useTema();
    const { estilos } = useEstilos();

    return (
        <Pressable
            onPress={alternarTema}
            style={[
                estilos.botaoAltoContraste_container,
                { 
                    backgroundColor: altoContraste ? cores.iconeClaro : cores.iconeEscuro,
                    borderColor: altoContraste ? cores.iconeEscuro : cores.iconeClaro,
                }
            ]}
            accessibilityLabel="Alternar modo de alto contraste"
            accessibilityRole="button"
        >
            {/* Semi-círculo do lado direito */}
            <View
                style={[
                    estilos.botaoAltoContraste_semiCirculo,
                    { 
                        backgroundColor: altoContraste ? cores.iconeEscuro : cores.iconeClaro,
                    }
                ]}
            />
        </Pressable>
    );
}

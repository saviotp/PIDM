import { useMemo } from 'react';
import { useTema } from '../contexts/TemaContext';
import { criarEstilos } from '../styles/estilosDinamicos';

// Hook que retorna os estilos baseados no tema atual
export function useEstilos() {
    const { cores, altoContraste } = useTema();
    
    const estilos = useMemo(() => {
        return criarEstilos(cores);
    }, [cores, altoContraste]);
    
    return { estilos, cores, altoContraste };
}

export default useEstilos;

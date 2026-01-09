import React, { createContext, useContext, useState, useCallback } from 'react';
import { coresNormais, coresAltoContraste } from '../styles/cores';

// Contexto para o tema
const TemaContext = createContext();

// Provider do tema
export function TemaProvider({ children }) {
    const [altoContraste, setAltoContraste] = useState(false);

    const alternarTema = useCallback(() => {
        setAltoContraste(prev => !prev);
    }, []);

    const cores = altoContraste ? coresAltoContraste : coresNormais;

    return (
        <TemaContext.Provider value={{ altoContraste, alternarTema, cores }}>
            {children}
        </TemaContext.Provider>
    );
}

// Hook para usar o tema
export function useTema() {
    const context = useContext(TemaContext);
    if (!context) {
        throw new Error('useTema deve ser usado dentro de um TemaProvider');
    }
    return context;
}

export default TemaContext;

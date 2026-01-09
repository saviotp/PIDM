import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
    criarUsuario, 
    validarLogin, 
    buscarUsuarioPorId, 
    atualizarUsuario,
    formatarEmailParaId 
} from '../services/usuarioService';

// Contexto do usuário
const UsuarioContext = createContext();

// Provider do usuário
export function UsuarioProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);

    // Função para cadastrar um novo usuário
    const cadastrar = useCallback(async (nome, email, senha) => {
        setCarregando(true);
        setErro(null);
        
        try {
            const id = formatarEmailParaId(email);
            const dadosUsuario = {
                nome,
                email,
                senha, // Em produção, usar hash
                biografia: '',
                numeroContato: '',
                instagram: '',
                fotoPerfil: '',
                fotoCapa: '',
                tags: [],
                obras: [],
                colecoes: [],
            };
            
            const resultado = await criarUsuario(id, dadosUsuario);
            
            if (resultado.sucesso) {
                setUsuario({ id, ...dadosUsuario });
                return { sucesso: true };
            } else {
                setErro(resultado.erro);
                return { sucesso: false, erro: resultado.erro };
            }
        } catch (error) {
            setErro(error.message);
            return { sucesso: false, erro: error.message };
        } finally {
            setCarregando(false);
        }
    }, []);

    // Função para fazer login
    const login = useCallback(async (emailOuUsuario, senha) => {
        setCarregando(true);
        setErro(null);
        
        try {
            const resultado = await validarLogin(emailOuUsuario, senha);
            
            if (resultado.sucesso) {
                setUsuario(resultado.dados);
                return { sucesso: true, dados: resultado.dados };
            } else {
                setErro(resultado.erro);
                return { sucesso: false, erro: resultado.erro };
            }
        } catch (error) {
            setErro(error.message);
            return { sucesso: false, erro: error.message };
        } finally {
            setCarregando(false);
        }
    }, []);

    // Função para fazer logout
    const logout = useCallback(() => {
        setUsuario(null);
        setErro(null);
    }, []);

    // Função para atualizar o perfil
    const atualizarPerfil = useCallback(async (dadosAtualizados) => {
        if (!usuario) {
            return { sucesso: false, erro: 'Usuário não logado' };
        }
        
        setCarregando(true);
        setErro(null);
        
        try {
            const resultado = await atualizarUsuario(usuario.id, dadosAtualizados);
            
            if (resultado.sucesso) {
                setUsuario(prev => ({ ...prev, ...dadosAtualizados }));
                return { sucesso: true };
            } else {
                setErro(resultado.erro);
                return { sucesso: false, erro: resultado.erro };
            }
        } catch (error) {
            setErro(error.message);
            return { sucesso: false, erro: error.message };
        } finally {
            setCarregando(false);
        }
    }, [usuario]);

    // Função para recarregar dados do usuário
    const recarregarUsuario = useCallback(async () => {
        if (!usuario) return;
        
        setCarregando(true);
        try {
            const resultado = await buscarUsuarioPorId(usuario.id);
            if (resultado.sucesso) {
                setUsuario(resultado.dados);
            }
        } catch (error) {
            console.error('Erro ao recarregar usuário:', error);
        } finally {
            setCarregando(false);
        }
    }, [usuario]);

    return (
        <UsuarioContext.Provider value={{
            usuario,
            carregando,
            erro,
            cadastrar,
            login,
            logout,
            atualizarPerfil,
            recarregarUsuario,
            estaLogado: !!usuario,
        }}>
            {children}
        </UsuarioContext.Provider>
    );
}

// Hook para usar o contexto de usuário
export function useUsuario() {
    const context = useContext(UsuarioContext);
    if (!context) {
        throw new Error('useUsuario deve ser usado dentro de um UsuarioProvider');
    }
    return context;
}

export default UsuarioContext;

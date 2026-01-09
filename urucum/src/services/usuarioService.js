import { database, ref, set, get, update, remove, query, orderByChild, equalTo, onValue } from './firebase/config';

// ==================== Funções de Usuário ====================

/**
 * Cria um novo usuário no Firebase
 * @param {string} id - ID único do usuário (pode ser o email formatado)
 * @param {object} dadosUsuario - Dados do usuário
 */
export async function criarUsuario(id, dadosUsuario) {
    try {
        const usuarioRef = ref(database, `usuarios/${id}`);
        await set(usuarioRef, {
            ...dadosUsuario,
            criadoEm: new Date().toISOString(),
            atualizadoEm: new Date().toISOString(),
        });
        return { sucesso: true, id };
    } catch (erro) {
        console.error('Erro ao criar usuário:', erro);
        return { sucesso: false, erro: erro.message };
    }
}

/**
 * Busca um usuário pelo ID
 * @param {string} id - ID do usuário
 */
export async function buscarUsuarioPorId(id) {
    try {
        const usuarioRef = ref(database, `usuarios/${id}`);
        const snapshot = await get(usuarioRef);
        
        if (snapshot.exists()) {
            return { sucesso: true, dados: { id, ...snapshot.val() } };
        } else {
            return { sucesso: false, erro: 'Usuário não encontrado' };
        }
    } catch (erro) {
        console.error('Erro ao buscar usuário:', erro);
        return { sucesso: false, erro: erro.message };
    }
}

/**
 * Busca um usuário pelo email
 * @param {string} email - Email do usuário
 */
export async function buscarUsuarioPorEmail(email) {
    try {
        const usuariosRef = ref(database, 'usuarios');
        const snapshot = await get(usuariosRef);
        
        if (snapshot.exists()) {
            const usuarios = snapshot.val();
            for (const [id, dados] of Object.entries(usuarios)) {
                if (dados.email === email) {
                    return { sucesso: true, dados: { id, ...dados } };
                }
            }
        }
        return { sucesso: false, erro: 'Usuário não encontrado' };
    } catch (erro) {
        console.error('Erro ao buscar usuário por email:', erro);
        return { sucesso: false, erro: erro.message };
    }
}

/**
 * Atualiza os dados de um usuário
 * @param {string} id - ID do usuário
 * @param {object} dadosAtualizados - Dados a serem atualizados
 */
export async function atualizarUsuario(id, dadosAtualizados) {
    try {
        const usuarioRef = ref(database, `usuarios/${id}`);
        await update(usuarioRef, {
            ...dadosAtualizados,
            atualizadoEm: new Date().toISOString(),
        });
        return { sucesso: true };
    } catch (erro) {
        console.error('Erro ao atualizar usuário:', erro);
        return { sucesso: false, erro: erro.message };
    }
}

/**
 * Busca todos os usuários
 */
export async function buscarTodosUsuarios() {
    try {
        const usuariosRef = ref(database, 'usuarios');
        const snapshot = await get(usuariosRef);
        
        if (snapshot.exists()) {
            const usuarios = [];
            const dados = snapshot.val();
            for (const [id, usuario] of Object.entries(dados)) {
                usuarios.push({ id, ...usuario });
            }
            return { sucesso: true, dados: usuarios };
        }
        return { sucesso: true, dados: [] };
    } catch (erro) {
        console.error('Erro ao buscar todos os usuários:', erro);
        return { sucesso: false, erro: erro.message };
    }
}

/**
 * Pesquisa usuários por nome ou tags
 * @param {string} termo - Termo de pesquisa
 */
export async function pesquisarUsuarios(termo) {
    try {
        const usuariosRef = ref(database, 'usuarios');
        const snapshot = await get(usuariosRef);
        
        if (snapshot.exists()) {
            const usuarios = [];
            const dados = snapshot.val();
            const termoLower = termo.toLowerCase();
            
            for (const [id, usuario] of Object.entries(dados)) {
                // Verifica se o nome contém o termo
                const nomeMatch = usuario.nome?.toLowerCase().includes(termoLower);
                
                // Verifica se alguma tag contém o termo
                const tagsMatch = usuario.tags?.some(tag => 
                    tag.toLowerCase().includes(termoLower)
                );
                
                if (nomeMatch || tagsMatch) {
                    usuarios.push({ id, ...usuario });
                }
            }
            return { sucesso: true, dados: usuarios };
        }
        return { sucesso: true, dados: [] };
    } catch (erro) {
        console.error('Erro ao pesquisar usuários:', erro);
        return { sucesso: false, erro: erro.message };
    }
}

/**
 * Escuta mudanças nos usuários em tempo real
 * @param {function} callback - Função chamada quando há mudanças
 */
export function escutarUsuarios(callback) {
    const usuariosRef = ref(database, 'usuarios');
    
    const unsubscribe = onValue(usuariosRef, (snapshot) => {
        if (snapshot.exists()) {
            const usuarios = [];
            const dados = snapshot.val();
            for (const [id, usuario] of Object.entries(dados)) {
                usuarios.push({ id, ...usuario });
            }
            callback(usuarios);
        } else {
            callback([]);
        }
    });
    
    return unsubscribe;
}

/**
 * Valida login do usuário
 * @param {string} emailOuUsuario - Email ou nome de usuário
 * @param {string} senha - Senha do usuário
 */
export async function validarLogin(emailOuUsuario, senha) {
    try {
        const usuariosRef = ref(database, 'usuarios');
        const snapshot = await get(usuariosRef);
        
        if (snapshot.exists()) {
            const usuarios = snapshot.val();
            for (const [id, dados] of Object.entries(usuarios)) {
                if ((dados.email === emailOuUsuario || dados.nome === emailOuUsuario) && dados.senha === senha) {
                    return { sucesso: true, dados: { id, ...dados } };
                }
            }
        }
        return { sucesso: false, erro: 'Email/usuário ou senha incorretos' };
    } catch (erro) {
        console.error('Erro ao validar login:', erro);
        return { sucesso: false, erro: erro.message };
    }
}

/**
 * Formata o email para usar como ID (remove caracteres especiais)
 * @param {string} email - Email do usuário
 */
export function formatarEmailParaId(email) {
    return email.replace(/[.#$[\]]/g, '_');
}

export default {
    criarUsuario,
    buscarUsuarioPorId,
    buscarUsuarioPorEmail,
    atualizarUsuario,
    buscarTodosUsuarios,
    pesquisarUsuarios,
    escutarUsuarios,
    validarLogin,
    formatarEmailParaId,
};

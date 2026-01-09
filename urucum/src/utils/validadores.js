/**
 * Utilitários de validação
 * Centraliza funções de validação usadas em todo o app
 */

/**
 * Valida formato de email
 * @param {string} email - Email a ser validado
 * @returns {boolean} True se o email é válido
 */
export function validarEmail(email) {
    if (!email) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Valida força da senha
 * @param {string} senha - Senha a ser validada
 * @returns {{valida: boolean, mensagem: string}} Resultado da validação
 */
export function validarSenha(senha) {
    if (!senha) {
        return { valida: false, mensagem: 'Senha é obrigatória.' };
    }
    if (senha.length < 8) {
        return { valida: false, mensagem: 'A senha deve ter pelo menos 8 caracteres.' };
    }
    return { valida: true, mensagem: '' };
}

/**
 * Valida se as senhas coincidem
 * @param {string} senha - Senha original
 * @param {string} confirmacao - Confirmação da senha
 * @returns {{valida: boolean, mensagem: string}} Resultado da validação
 */
export function validarConfirmacaoSenha(senha, confirmacao) {
    if (!confirmacao) {
        return { valida: false, mensagem: 'Confirmação de senha é obrigatória.' };
    }
    if (senha !== confirmacao) {
        return { valida: false, mensagem: 'As senhas não coincidem.' };
    }
    return { valida: true, mensagem: '' };
}

/**
 * Valida campo obrigatório
 * @param {string} valor - Valor a ser validado
 * @param {string} nomeCampo - Nome do campo para mensagem
 * @returns {{valido: boolean, mensagem: string}} Resultado da validação
 */
export function validarCampoObrigatorio(valor, nomeCampo) {
    if (!valor || !valor.trim()) {
        return { valido: false, mensagem: `${nomeCampo} é obrigatório.` };
    }
    return { valido: true, mensagem: '' };
}

/**
 * Valida telefone brasileiro
 * @param {string} telefone - Telefone a ser validado
 * @returns {boolean} True se o telefone é válido (10 ou 11 dígitos)
 */
export function validarTelefone(telefone) {
    if (!telefone) return false;
    const apenasNumeros = telefone.replace(/\D/g, '');
    return apenasNumeros.length >= 10 && apenasNumeros.length <= 11;
}

/**
 * Valida URL
 * @param {string} url - URL a ser validada
 * @returns {boolean} True se a URL é válida
 */
export function validarUrl(url) {
    if (!url) return false;
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Valida username do Instagram (sem @, letras, números, pontos e underscores)
 * @param {string} username - Username a ser validado
 * @returns {boolean} True se o username é válido
 */
export function validarInstagram(username) {
    if (!username) return true; // Campo opcional
    const usernameClean = username.replace(/^@/, '');
    const regex = /^[a-zA-Z0-9._]{1,30}$/;
    return regex.test(usernameClean);
}

export default {
    validarEmail,
    validarSenha,
    validarConfirmacaoSenha,
    validarCampoObrigatorio,
    validarTelefone,
    validarUrl,
    validarInstagram,
};

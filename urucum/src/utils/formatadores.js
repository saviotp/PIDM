/**
 * Utilitários de formatação
 * Centraliza funções de formatação usadas em todo o app
 */

/**
 * Formata telefone brasileiro durante digitação
 * @param {string} valor - Valor digitado
 * @returns {string} Telefone formatado: (XX) XXXXX-XXXX
 */
export function formatarTelefone(valor) {
    // Remove tudo que não é número
    const apenasNumeros = valor.replace(/\D/g, '');
    
    // Limita a 11 dígitos (DDD + 9 dígitos)
    const numerosLimitados = apenasNumeros.slice(0, 11);
    
    // Formata conforme o padrão brasileiro
    if (numerosLimitados.length === 0) {
        return '';
    } else if (numerosLimitados.length <= 2) {
        return `(${numerosLimitados}`;
    } else if (numerosLimitados.length <= 7) {
        return `(${numerosLimitados.slice(0, 2)}) ${numerosLimitados.slice(2)}`;
    } else {
        return `(${numerosLimitados.slice(0, 2)}) ${numerosLimitados.slice(2, 7)}-${numerosLimitados.slice(7)}`;
    }
}

/**
 * Formata telefone para exibição (sem código do país)
 * @param {string} valor - Número de telefone
 * @returns {string} Telefone formatado: (XX) XXXXX-XXXX
 */
export function formatarTelefoneParaExibicao(valor) {
    if (!valor) return '';
    const apenasNumeros = valor.replace(/\D/g, '');
    if (apenasNumeros.length === 0) return '';
    if (apenasNumeros.length <= 2) return `(${apenasNumeros}`;
    if (apenasNumeros.length <= 7) return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`;
    return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7)}`;
}

/**
 * Formata telefone para salvar no banco (com código do país)
 * @param {string} valor - Telefone formatado ou não
 * @returns {string} Telefone no formato +55XXXXXXXXXXX
 */
export function formatarTelefoneParaSalvar(valor) {
    const apenasNumeros = valor.replace(/\D/g, '');
    return apenasNumeros ? `+55${apenasNumeros}` : '';
}

/**
 * Remove código do país do telefone
 * @param {string} valor - Telefone com código do país
 * @returns {string} Telefone sem código do país
 */
export function removerCodigoPais(valor) {
    if (!valor) return '';
    return valor.replace(/^\+55/, '');
}

/**
 * Formata Instagram (remove @ se houver)
 * @param {string} valor - Username do Instagram
 * @returns {string} Username sem @
 */
export function formatarInstagram(valor) {
    if (!valor) return '';
    return valor.replace(/^@/, '').trim();
}

/**
 * Formata Instagram para exibição (adiciona @)
 * @param {string} valor - Username do Instagram
 * @returns {string} Username com @
 */
export function formatarInstagramParaExibicao(valor) {
    if (!valor) return '';
    return `@${valor.replace(/^@/, '')}`;
}

/**
 * Formata data para exibição no padrão brasileiro
 * @param {string|Date} data - Data a ser formatada
 * @returns {string} Data no formato DD/MM/AAAA
 */
export function formatarData(data) {
    if (!data) return '';
    const dataObj = typeof data === 'string' ? new Date(data) : data;
    return dataObj.toLocaleDateString('pt-BR');
}

/**
 * Formata data e hora para exibição
 * @param {string|Date} data - Data a ser formatada
 * @returns {string} Data no formato DD/MM/AAAA às HH:MM
 */
export function formatarDataHora(data) {
    if (!data) return '';
    const dataObj = typeof data === 'string' ? new Date(data) : data;
    return dataObj.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default {
    formatarTelefone,
    formatarTelefoneParaExibicao,
    formatarTelefoneParaSalvar,
    removerCodigoPais,
    formatarInstagram,
    formatarInstagramParaExibicao,
    formatarData,
    formatarDataHora,
};

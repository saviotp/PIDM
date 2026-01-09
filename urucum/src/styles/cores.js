// Arquivo de cores do aplicativo
// Facilita a implementação de temas (normal e alto contraste)

export const coresNormais = {
    // Cores principais
    primaria: '#AA0000',           // Vermelho escuro - cor de destaque
    secundaria: '#134313',         // Verde escuro - cor secundária
    terciaria: '#AB8368',          // Marrom/bege - tags e botões secundários
    
    // Backgrounds
    fundoPrincipal: '#F5F5F5',     // Cinza claro - fundo principal
    fundoSecundario: '#F6F6F6',    // Cinza levemente mais escuro
    fundoTerciario: '#FFD2B3',     // Pêssego - fundo das páginas de login/cadastro
    fundoInput: '#EBEBEB',         // Cinza para inputs
    fundoInputPressionado: '#D3D3D3', // Cinza mais escuro quando pressionado
    fundoElemento: '#E5E5E5',      // Cinza para elementos como fotos
    fundoNavegacao: '#FFD2B3',     // Pêssego - barra de navegação
    
    // Texto
    textoPrimario: '#000000',      // Preto - texto principal
    textoSecundario: '#3E3E3E',    // Cinza escuro - texto secundário
    textoSobrePrimaria: '#FFFFFF', // Branco - texto sobre cores primárias
    textoLink: '#004AAD',          // Azul - links
    
    // Bordas
    bordaPrimaria: '#134313',      // Verde escuro - bordas principais
    bordaSecundaria: '#CCC',       // Cinza - bordas secundárias
    
    // Modal
    fundoModalOverlay: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente do modal
    fundoModal: '#FFFFFF',         // Branco - fundo do modal
    modalOverlayEscuro: 'rgba(0, 0, 0, 0.95)', // Overlay escuro para visualização de imagens
    modalBotaoFechar: 'rgba(255, 255, 255, 0.3)', // Botão fechar semi-transparente
    
    // Cores de contraste para ícones
    iconeClaro: '#FFFFFF',         // Ícones claros
    iconeEscuro: '#000000',        // Ícones escuros
    iconeAcaoFundo: 'rgba(0, 0, 0, 0.6)', // Fundo para ícones de ação
    
    // Estados
    pressedOpacity: 0.6,
    pressedBackgroundColor: '#096b09ff', // Verde mais escuro quando pressionado
    primariaPressed: '#880000',          // Vermelho mais escuro quando pressionado
    secundariaPressed: '#0a5a0a',        // Verde mais escuro quando pressionado
    terciariaPressed: '#8B5E4E',         // Marrom mais escuro quando pressionado

    // Tag selecionada
    tagSelecionada: '#AA0000',     // Vermelho primário para tags selecionadas
};

export const coresAltoContraste = {
    // Cores principais
    primaria: '#FFFF00',           // Amarelo - cor de destaque
    secundaria: '#FFFFFF',         // Branco - cor secundária
    terciaria: '#FFFF00',          // Amarelo - tags e botões secundários
    
    // Backgrounds
    fundoPrincipal: '#000000',     // Preto - fundo principal
    fundoSecundario: '#000000',    // Preto
    fundoTerciario: '#000000',     // Preto - fundo das páginas de login/cadastro
    fundoInput: '#333333',         // Cinza escuro para inputs (melhor contraste)
    fundoInputPressionado: '#444444', // Cinza mais claro quando pressionado
    fundoElemento: '#1A1A1A',      // Cinza muito escuro para elementos
    fundoNavegacao: '#000000',     // Preto - barra de navegação
    
    // Texto
    textoPrimario: '#FFFFFF',      // Branco - texto principal
    textoSecundario: '#FFFFFF',    // Branco - texto secundário
    textoSobrePrimaria: '#000000', // Preto - texto sobre cores primárias (amarelo)
    textoLink: '#FFFF00',          // Amarelo - links
    
    // Bordas
    bordaPrimaria: '#FFFFFF',      // Branco - bordas principais
    bordaSecundaria: '#FFFFFF',    // Branco - bordas secundárias
    
    // Modal
    fundoModalOverlay: 'rgba(0, 0, 0, 0.8)', // Fundo mais escuro do modal
    fundoModal: '#000000',         // Preto - fundo do modal
    modalOverlayEscuro: 'rgba(0, 0, 0, 0.95)', // Overlay escuro para visualização de imagens
    modalBotaoFechar: 'rgba(255, 255, 255, 0.3)', // Botão fechar semi-transparente
    
    // Cores de contraste para ícones
    iconeClaro: '#FFFFFF',         // Ícones claros
    iconeEscuro: '#000000',        // Ícones escuros
    iconeAcaoFundo: 'rgba(255, 255, 255, 0.6)', // Fundo para ícones de ação (mais claro)
    
    // Estados
    pressedOpacity: 0.8,
    pressedBackgroundColor: '#CCCC00', // Amarelo mais escuro quando pressionado
    primariaPressed: '#CCCC00',        // Amarelo quando pressionado
    secundariaPressed: '#CCCCCC',      // Cinza claro quando pressionado
    terciariaPressed: '#CCCC00',       // Amarelo quando pressionado

    // Tag selecionada
    tagSelecionada: '#333333',     // Cinza escuro para tags selecionadas
};

// Exportação padrão das cores normais
export default coresNormais;

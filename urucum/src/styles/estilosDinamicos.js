import { StyleSheet, Dimensions } from 'react-native';

const alturaTela = Dimensions.get("window").height;
const larguraTela = Dimensions.get("window").width;

// Função que cria estilos baseados nas cores do tema atual
export function criarEstilos(cores) {
    return StyleSheet.create({
        // ==================== VisualizarColecao ====================
        visualizarColecao_container: {
            flex: 1,
            marginVertical: 40,
            backgroundColor: cores.fundoPrincipal,
        },
        visualizarColecao_scrollView: {
            flex: 1,
        },
        visualizarColecao_scrollContainer: {
            paddingBottom: 80,
        },
        visualizarColecao_colecaoContainer: {
            marginBottom: 40,
        },
        visualizarColecao_titulo: {
            fontSize: 24,
            fontWeight: 'bold',
            alignSelf: 'center',
            marginBottom: 20,
            color: cores.textoPrimario,
        },
        visualizarColecao_obraContainer: {
            marginHorizontal: 10,
        },
        visualizarColecao_texto: {
            fontSize: 16,
            textAlign: 'justify',
            marginTop: 10,
            marginHorizontal: 5,
            width: larguraTela * 0.77,
            color: cores.textoPrimario,
        },
        visualizarColecao_imagem: {
            width: larguraTela * 0.8,
            height: alturaTela * 0.5,
            borderRadius: 16,
        },

        // ==================== VisualizarObra ====================
        visualizarObra_container: {
            flex: 1,
            marginVertical: 40,
            backgroundColor: cores.fundoPrincipal,
        },
        visualizarObra_scrollView: {
            flex: 1,
        },
        visualizarObra_content: {
            marginHorizontal: 20,
        },
        visualizarObra_titulo: {
            fontSize: 24,
            fontWeight: 'bold',
            alignSelf: 'center',
            color: cores.textoPrimario,
        },
        visualizarObra_texto: {
            fontSize: 16,
            textAlign: 'justify',
            marginTop: 10,
            marginHorizontal: 5,
            color: cores.textoPrimario,
        },
        visualizarObra_imagem: {
            width: '100%',
            borderRadius: 16,
            height: alturaTela * 0.7,
        },

        // ==================== Titulo ====================
        titulo_texto: {
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'Raleway',
            paddingBottom: 20,
            color: cores.textoPrimario,
        },

        // ==================== BarraDeInput ====================
        barraDeInput_container: {
            flexDirection: 'row',
            backgroundColor: cores.fundoInput,
            padding: 20,
            borderRadius: 16,
            width: '90%',
            alignSelf: 'center',
            alignItems: 'center',
            marginBottom: 16,
        },
        barraDeInput_conteudo: {
            flex: 1,
        },
        barraDeInput_texto: {
            fontFamily: 'Inter-Regular',
            fontSize: 14,
            color: cores.textoSecundario,
        },
        barraDeInput_pressionado: {
            backgroundColor: cores.fundoInputPressionado,
        },

        // ==================== BotaoVoltar ====================
        botaoVoltar_botao: {
            position: 'absolute',
            top: 60,
            left: 20,
            backgroundColor: cores.fundoModal,
            borderRadius: 50,
            alignItems: 'center',
            width: 60,
            height: 60,
            justifyContent: 'center',
            zIndex: 1000,
            elevation: 10,
        },
        botaoVoltar_texto: {
            color: cores.textoSobrePrimaria,
            fontWeight: 'bold',
        },

        // ==================== PaginaLogin ====================
        paginaLogin_container: {
            backgroundColor: cores.fundoTerciario,
            flex: 1,
        },
        paginaLogin_scrollContent: {
            flexGrow: 1,
            justifyContent: 'center',
        },
        paginaLogin_conteudo: {
            backgroundColor: cores.fundoSecundario,
            width: '90%',
            borderRadius: 20,
            alignSelf: 'center',
            alignItems: 'center',
            padding: 20,
        },
        paginaLogin_conteudoSemTeclado: {
            minHeight: 380,
        },
        paginaLogin_conteudoComTeclado: {
            flexGrow: 1,
        },
        paginaLogin_erro: {
            color: cores.primaria,
            fontSize: 12,
            marginTop: -10,
            marginBottom: 10,
            width: '90%',
            alignSelf: 'center',
        },
        paginaLogin_logo: {
            width: 100,
            height: 100,
            alignSelf: 'center',
            marginTop: 50,
        },
        paginaLogin_logoFixo: {
            width: 100,
            height: 100,
            alignSelf: 'center',
            marginTop: 50,
            marginBottom: 20,
        },
        paginaLogin_link: {
            color: cores.textoLink,
            marginTop: 10,
            textDecorationLine: 'underline',
        },
        // Modal de Recuperação de Senha
        paginaLogin_modalOverlay: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: cores.fundoModalOverlay,
        },
        paginaLogin_modalContent: {
            backgroundColor: cores.fundoModal,
            borderRadius: 20,
            padding: 25,
            width: '90%',
            maxWidth: 420,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        paginaLogin_modalTitulo: {
            fontSize: 20,
            fontWeight: 'bold',
            color: cores.primaria,
            textAlign: 'center',
            marginBottom: 20,
        },
        paginaLogin_modalTexto: {
            fontSize: 14,
            color: cores.textoPrimario,
            textAlign: 'center',
            marginBottom: 15,
        },
        paginaLogin_modalBotoesContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            gap: 15,
        },
        paginaLogin_modalBotao: {
            flex: 1,
            minWidth: 120,
        },

        // ==================== Botao ====================
        botao_botao: {
            backgroundColor: cores.secundaria,
            paddingVertical: 10,
            paddingHorizontal: 24,
            margin: 20,
            borderRadius: 50,
            alignItems: 'center',
            width: '40%',
            justifyContent: 'center',
        },
        botao_botaoPressed: {
            backgroundColor: cores.pressedBackgroundColor,
        },
        botao_texto: {
            color: cores.textoSobrePrimaria,
            fontSize: 16,
            fontWeight: 'bold',
        },

        // ==================== AdicionarColecao ====================
        adicionarColecao_container: {
            marginTop: 10,
            alignSelf: 'flex-start',
        },
        adicionarColecao_adicionarTexto: {
            fontSize: 16,
            color: cores.secundaria,
            textDecorationLine: 'underline',
        },
        adicionarColecao_modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: cores.fundoModalOverlay,
        },
        adicionarColecao_modalContent: {
            width: '90%',
            maxHeight: '80%',
            backgroundColor: cores.fundoModal,
            borderRadius: 16,
            padding: 20,
            alignItems: 'center',
        },
        adicionarColecao_modalTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20,
            color: cores.textoPrimario,
        },
        adicionarColecao_input: {
            width: '100%',
            borderWidth: 1,
            borderColor: cores.bordaSecundaria,
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
            color: cores.textoPrimario,
            backgroundColor: cores.fundoInput,
        },
        adicionarColecao_descricaoInput: {
            height: 80,
            textAlignVertical: 'top',
            marginTop: 20,
        },
        adicionarColecao_label: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 10,
            alignSelf: 'flex-start',
            color: cores.textoPrimario,
        },
        adicionarColecao_obraItem: {
            padding: 10,
            borderWidth: 1,
            borderColor: cores.bordaSecundaria,
            borderRadius: 8,
            marginRight: 10,
        },
        adicionarColecao_obraSelecionada: {
            backgroundColor: cores.tagSelecionada,
        },
        adicionarColecao_botoesContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
        },
        adicionarColecao_botaoSalvar: {
            flex: 1,
            marginLeft: 5,
        },
        adicionarColecao_botaoCancelar: {
            flex: 1,
            marginRight: 5,
        },

        // ==================== AdicionarObra ====================
        adicionarObra_conteudo: {
            backgroundColor: cores.fundoElemento,
            borderRadius: 16,
            padding: 20,
            width: '22%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
        },
        adicionarObra_adicionarObraOuColecao: {
            fontSize: 32,
            color: cores.secundaria,
            textAlign: 'center',
        },
        adicionarObra_modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: cores.fundoModalOverlay,
        },
        adicionarObra_modalContent: {
            width: '80%',
            backgroundColor: cores.fundoModal,
            borderRadius: 16,
            padding: 20,
            alignItems: 'center',
        },
        adicionarObra_modalTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20,
            color: cores.textoPrimario,
        },
        adicionarObra_input: {
            width: '100%',
            borderWidth: 1,
            borderColor: cores.bordaSecundaria,
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
            color: cores.textoPrimario,
            backgroundColor: cores.fundoInput,
        },
        adicionarObra_descricaoInput: {
            height: 80,
            textAlignVertical: 'top',
        },
        adicionarObra_botaoImagem: {
            backgroundColor: cores.secundaria,
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
        },
        adicionarObra_botaoImagemTexto: {
            color: cores.textoSobrePrimaria,
            textAlign: 'center',
        },
        adicionarObra_previewImagem: {
            width: 100,
            height: 100,
            borderRadius: 8,
            marginBottom: 10,
        },
        adicionarObra_botoesContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
        },
        adicionarObra_botaoSalvar: {
            flex: 1,
            marginLeft: 5,
        },
        adicionarObra_botaoCancelar: {
            flex: 1,
            marginRight: 5,
            backgroundColor: cores.primaria,
        },

        // ==================== AdicionarTags ====================
        adicionarTags_modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: cores.fundoModalOverlay,
        },
        adicionarTags_modalContent: {
            width: '80%',
            backgroundColor: cores.fundoModal,
            borderRadius: 10,
            padding: 20,
            alignItems: 'center',
        },
        adicionarTags_modalTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 20,
            color: cores.textoPrimario,
        },
        adicionarTags_previewTagsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: 20,
        },
        adicionarTags_tagsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            width: '100%',
        },
        adicionarTags_tagItemContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
        },
        adicionarTags_tagButton: {
            flexBasis: '45%',
            margin: 5,
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderRadius: 16,
            backgroundColor: cores.terciaria,
        },
        adicionarTags_tagSelecionada: {
            flexBasis: '45%',
            margin: 5,
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderRadius: 16,
            backgroundColor: cores.tagSelecionada,
        },
        adicionarTags_acoesModalContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 10,
        },
        adicionarTags_botaoFechar: {
            flex: 1,
            marginRight: 5,
            paddingVertical: 15,
        },
        adicionarTags_botaoSalvar: {
            flex: 1,
            marginLeft: 5,
            paddingVertical: 15,
        },

        // ==================== Perfil (telas) ====================
        perfilTela_adicionarFotoCapa: {
            backgroundColor: cores.fundoElemento,
        },
        perfilTela_imagemCapa: {},
        perfilTela_adicionarFotoPerfil: {
            backgroundColor: cores.fundoElemento,
        },
        perfilTela_imagemPerfil: {},
        perfilTela_nomeArtista: {
            color: cores.textoPrimario,
        },

        // ==================== Perfil (componentes) ====================
        perfilComponente_adicionarFotoCapa: {
            backgroundColor: cores.fundoElemento,
            width: '90%',
            height: 200,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
        },
        perfilComponente_adicionarFotoPerfil: {
            backgroundColor: cores.fundoElemento,
            width: '35%',
            aspectRatio: 1,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: cores.bordaPrimaria,
            borderWidth: 3,
            position: 'absolute',
            top: '40%',
            right: '31%',
        },
        perfilComponente_imagemCapa: {
            width: '100%',
            height: '100%',
            borderRadius: 16,
        },
        perfilComponente_imagemPerfil: {
            width: '100%',
            height: '100%',
            borderRadius: 100,
        },
        perfilComponente_nomeArtista: {
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 80,
            textAlign: 'center',
            paddingBottom: 20,
            color: cores.textoPrimario,
        },

        // ==================== BotaoAdicionarObraOuColecao ====================
        botaoAdicionarObraOuColecao_conteudo: {
            backgroundColor: cores.fundoElemento,
            borderRadius: 16,
            padding: 20,
            width: '22%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
        },
        botaoAdicionarObraOuColecao_adicionarObraOuColecao: {
            fontSize: 32,
            color: cores.secundaria,
            textAlign: 'center',
        },

        // ==================== PaginaPerfil ====================
        paginaPerfil_container: {
            backgroundColor: cores.fundoPrincipal,
            flex: 1,
        },
        paginaPerfil_scrollContainer: {
            flexGrow: 1,
            backgroundColor: cores.fundoPrincipal,
        },
        paginaPerfil_conteudo: {
            backgroundColor: cores.fundoSecundario,
            width: '100%',
            borderRadius: 20,
            alignSelf: 'center',
            alignItems: 'center',
            padding: 20,
        },
        paginaPerfil_logo: {
            width: 100,
            height: 100,
            alignSelf: 'center',
            marginTop: 50,
            marginBottom: 20,
        },
        paginaPerfil_link: {
            color: cores.textoLink,
            marginTop: 10,
            textDecorationLine: 'underline',
            textAlign: 'center',
        },
        paginaPerfil_adicionarfotoCapa: {
            backgroundColor: cores.fundoElemento,
            width: '100%',
            height: 200,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 70, // Espaço para a foto de perfil
        },
        paginaPerfil_fotoCapa: {
            width: '100%',
            height: '100%',
            borderRadius: 16,
        },
        paginaPerfil_adicionarFotoPerfil: {
            backgroundColor: cores.fundoElemento,
            width: 120,
            height: 120,
            borderRadius: 60,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: cores.bordaPrimaria,
            borderWidth: 3,
            position: 'absolute',
            top: 140, // 200 (altura da capa) - 60 (metade da foto de perfil)
            right: 20,
            zIndex: 10,
        },
        paginaPerfil_fotoPerfil: {
            width: 114,
            height: 114,
            borderRadius: 57,
        },
        paginaPerfil_titulo: {
            alignSelf: 'flex-start',
            width: '60%',
        },
        paginaPerfil_adicionarTags: {
            marginTop: 10,
            width: '50%',
            alignSelf: 'flex-start',
        },
        paginaPerfil_adicionarObraOuColecao: {
            marginTop: 10,
            alignSelf: 'flex-start',
        },
        paginaPerfil_tagListContainer: {
            width: '100%',
            alignItems: 'flex-start',
        },
        paginaPerfil_tagItem: {
            backgroundColor: cores.terciaria,
            padding: 10,
            borderRadius: 30,
            marginHorizontal: 5,
            marginBottom: 20,
        },
        paginaPerfil_tagText: {
            color: cores.textoSobrePrimaria,
            fontSize: 16,
        },
        paginaPerfil_listaContainer: {
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
        },
        paginaPerfil_listaHorizontalContainer: {
            width: '100%',
            marginBottom: 10,
        },
        paginaPerfil_obraItem: {
            margin: 5,
            alignItems: 'center',
        },
        paginaPerfil_obraItemHorizontal: {
            marginRight: 15,
            alignItems: 'center',
            width: 120,
        },
        paginaPerfil_obrafoto: {
            width: 100,
            height: 100,
            borderRadius: 8,
        },
        paginaPerfil_obrafotoHorizontal: {
            width: 120,
            height: 120,
            borderRadius: 8,
        },
        paginaPerfil_obraTitulo: {
            marginTop: 5,
            fontSize: 14,
            color: cores.textoPrimario,
            textAlign: 'center',
        },
        paginaPerfil_colecaoContainer: {
            marginBottom: 20,
        },
        paginaPerfil_colecaoTitulo: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 10,
            color: cores.textoPrimario,
        },
        paginaPerfil_modalContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: cores.fundoModalOverlay,
            justifyContent: 'center',
            alignItems: 'center',
        },
        paginaPerfil_modalTitulo: {
            fontSize: 18,
            fontWeight: 'bold',
            color: cores.textoSobrePrimaria,
            marginBottom: 10,
        },
        paginaPerfil_modalFecharBotao: {
            marginTop: 20,
            padding: 10,
            backgroundColor: cores.fundoModal,
            borderRadius: 5,
        },
        paginaPerfil_modalFecharTexto: {
            color: cores.textoPrimario,
            fontSize: 14,
        },
        paginaPerfil_texto: {
            color: cores.textoSecundario,
            fontSize: 16,
            marginBottom: 20,
            textAlign: 'justify',
            width: '100%',
        },
        paginaPerfil_biografia: {
            fontSize: 16,
            textAlign: 'justify',
            marginVertical: 10,
            marginHorizontal: 10,
            color: cores.textoPrimario,
            alignSelf: 'flex-start',
            width: '100%',
        },
        paginaPerfil_iconesContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
            width: '60%',
        },
        paginaPerfil_icone: {
            marginHorizontal: 10,
        },

        // ==================== PaginaCadastro ====================
        paginaCadastro_container: {
            backgroundColor: cores.fundoTerciario,
            flex: 1,
        },
        paginaCadastro_scrollContent: {
            flexGrow: 1,
            justifyContent: 'center',
        },
        paginaCadastro_conteudo: {
            backgroundColor: cores.fundoSecundario,
            width: '90%',
            borderRadius: 20,
            alignSelf: 'center',
            alignItems: 'center',
            padding: 20,
        },
        paginaCadastro_conteudoSemTeclado: {
            minHeight: 520,
        },
        paginaCadastro_conteudoComTeclado: {
            flexGrow: 1,
        },
        paginaCadastro_erro: {
            color: cores.primaria,
            fontSize: 12,
            marginTop: -10,
            marginBottom: 10,
            width: '90%',
            alignSelf: 'center',
        },
        paginaCadastro_logo: {
            width: 100,
            height: 100,
            alignSelf: 'center',
            marginTop: 50,
        },
        paginaCadastro_logoFixo: {
            width: 100,
            height: 100,
            alignSelf: 'center',
            marginTop: 50,
            marginBottom: 20,
        },
        paginaCadastro_link: {
            color: cores.textoLink,
            marginTop: 10,
            textDecorationLine: 'underline',
        },

        // ==================== PaginaInicial ====================
        paginaInicial_container: {
            backgroundColor: cores.fundoPrincipal,
            flex: 1,
        },
        paginaInicial_menu: {
            marginLeft: '5%',
            marginRight: '5%',
            marginTop: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
        },
        paginaInicial_scrollContainer: {
            flexGrow: 1,
            backgroundColor: cores.fundoPrincipal,
            paddingBottom: 90,
        },
        paginaInicial_logo: {
            width: 100,
            height: 100,
            alignSelf: 'flex-start',
        },
        paginaInicial_titulo: {
            flex: 1,
            textAlign: 'center',
            left: "10%",
        },
        paginaInicial_adicionarFotoPerfil: {
            backgroundColor: cores.fundoElemento,
            width: '25%',
            aspectRatio: 1,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: cores.bordaPrimaria,
            borderWidth: 3,
        },
        paginaInicial_imagemPerfil: {
            width: '100%',
            height: '100%',
            borderRadius: 100,
        },
        paginaInicial_perfilContainer: {
            marginBottom: 20,
        },
        paginaInicial_barraPesquisa: {
            marginHorizontal: '5%',
            marginBottom: 20,
        },

        // ==================== PaginaEditarPerfil ====================
        paginaEditarPerfil_container: {
            backgroundColor: cores.fundoPrincipal,
            flex: 1,
        },
        paginaEditarPerfil_scrollContainer: {
            flexGrow: 1,
            backgroundColor: cores.fundoPrincipal,
            paddingBottom: 90,
        },
        paginaEditarPerfil_conteudo: {
            backgroundColor: cores.fundoSecundario,
            width: '100%',
            borderRadius: 20,
            alignSelf: 'center',
            alignItems: 'flex-start',
            padding: 20,
            paddingBottom: 30,
            paddingTop: 80, // Espaço extra para a foto de perfil sobreposta
        },
        paginaEditarPerfil_logo: {
            width: 100,
            height: 100,
            alignSelf: 'center',
            marginTop: 50,
            marginBottom: 20,
        },
        paginaEditarPerfil_link: {
            color: cores.textoLink,
            marginTop: 10,
            textDecorationLine: 'underline',
            textAlign: 'center',
        },
        paginaEditarPerfil_adicionarFotoCapa: {
            backgroundColor: cores.fundoElemento,
            width: '100%',
            height: 200,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
        },
        paginaEditarPerfil_adicionarFotoPerfil: {
            backgroundColor: cores.fundoElemento,
            width: 120,
            height: 120,
            borderRadius: 60,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: cores.bordaPrimaria,
            borderWidth: 3,
            position: 'absolute',
            top: 220, // Posição fixa: paddingTop(80) + altura da capa(200) - metade da foto(60) = 220
            right: 20,
            zIndex: 100,
        },
        paginaEditarPerfil_titulo: {
            alignSelf: 'flex-start',
            width: '60%',
        },
        paginaEditarPerfil_tagsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            marginTop: 10,
        },
        paginaEditarPerfil_tagsContainerAlinhado: {
            width: '100%',
            alignItems: 'flex-start',
        },
        paginaEditarPerfil_tagItem: {
            backgroundColor: cores.terciaria,
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 16,
            margin: 5,
            alignItems: 'center',
            justifyContent: 'center',
        },
        paginaEditarPerfil_addButton: {
            backgroundColor: cores.terciaria,
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 16,
            marginBottom: 10,
            alignSelf: 'flex-start',
        },
        paginaEditarPerfil_botaoAdicionarAlinhado: {
            marginTop: 10,
            alignSelf: 'flex-start',
        },
        paginaEditarPerfil_barraDeInputContainerAlinhado: {
            width: '100%',
            alignItems: 'flex-start',
            marginTop: 10,
        },
        paginaEditarPerfil_barraDeInput: {
            width: '100%',
            marginBottom: 10,
        },
        paginaEditarPerfil_tagText: {
            color: cores.textoSobrePrimaria,
            fontSize: 14,
        },
        paginaEditarPerfil_fotoCapaPreview: {
            width: '100%',
            height: '100%',
            borderRadius: 16,
        },
        paginaEditarPerfil_fotoPerfilPreview: {
            width: 114,
            height: 114,
            borderRadius: 57,
        },
        paginaEditarPerfil_inputNome: {
            width: '100%',
            marginBottom: 10,
        },
        
        // ==================== Campos com validação ====================
        campoComValidacao_container: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
        },
        campoComValidacao_botoesContainer: {
            flexDirection: 'row',
            marginLeft: 10,
        },
        campoComValidacao_botaoConfirmar: {
            backgroundColor: cores.secundaria,
            padding: 8,
            borderRadius: 20,
            marginRight: 5,
        },
        campoComValidacao_botaoCancelar: {
            backgroundColor: cores.primaria,
            padding: 8,
            borderRadius: 20,
        },
        
        // ==================== Barra de Pesquisa ====================
        barraPesquisa_container: {
            flexDirection: 'row',
            backgroundColor: cores.fundoInput,
            padding: 15,
            borderRadius: 25,
            alignItems: 'center',
        },
        barraPesquisa_input: {
            flex: 1,
            fontSize: 16,
            color: cores.textoPrimario,
            marginLeft: 10,
        },
        barraPesquisa_icone: {
            color: cores.textoSecundario,
        },

        // ==================== BotaoAltoContraste ====================
        botaoAltoContraste_container: {
            position: 'absolute',
            top: 50,
            right: 20,
            width: 44,
            height: 44,
            borderRadius: 22,
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            zIndex: 1000,
            elevation: 10,
        },
        botaoAltoContraste_semiCirculo: {
            position: 'absolute',
            right: 0,
            width: 20,
            height: 40,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
        },

        // ==================== ModalImagemTelaCheia ====================
        modalImagemTelaCheia_overlay: {
            flex: 1,
            backgroundColor: cores.modalOverlayEscuro || 'rgba(0, 0, 0, 0.95)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalImagemTelaCheia_imagem: {
            width: larguraTela,
            height: alturaTela * 0.8,
            resizeMode: 'contain',
        },
        modalImagemTelaCheia_botaoFechar: {
            position: 'absolute',
            top: 50,
            right: 20,
            backgroundColor: cores.modalBotaoFechar || 'rgba(255, 255, 255, 0.3)',
            borderRadius: 25,
            padding: 10,
        },
    });
}

export default criarEstilos;
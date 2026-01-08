import { StyleSheet, Dimensions } from 'react-native';

const alturaTela = Dimensions.get("window").height;
const larguraTela = Dimensions.get("window").width;

const estilosGlobais = StyleSheet.create({
    // ==================== VisualizarColecao ====================
    visualizarColecao_container: {
        flex: 1,
        marginVertical: 40,
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
    },
    visualizarObra_texto: {
        fontSize: 16,
        textAlign: 'justify',
        marginTop: 10,
        marginHorizontal: 5,
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
    },

    // ==================== BarraDeNavegacao ====================
    barraDeNavegacao_container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFD2B3',
    },
    barraDeNavegacao_botao: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        gap: 4,
        paddingTop: 6,
        paddingBottom: 6,
    },
    barraDeNavegacao_ativo: {
        borderTopWidth: 3,
        borderTopColor: '#AA0000',
        paddingTop: 3,
    },
    barraDeNavegacao_pressionado: {
        opacity: 0.6,
    },
    barraDeNavegacao_icone: {
        color: '#AA0000',
    },
    barraDeNavegacao_textoIcone: {
        color: '#AA0000',
        fontSize: 12,
        fontWeight: '600',
    },

    // ==================== BarraDeInput ====================
    barraDeInput_container: {
        flexDirection: 'row',
        backgroundColor: '#EBEBEB',
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
        color: '#3E3E3E',
    },
    barraDeInput_pressionado: {
        backgroundColor: '#D3D3D3',
    },

    // ==================== BotaoVoltar ====================
    botaoVoltar_botao: {
        position: 'absolute',
        top: 10,
        left: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        alignItems: 'center',
        width: 60,
        height: 60,
        justifyContent: 'center',
        zIndex: 1000,
        elevation: 10,
    },
    botaoVoltar_texto: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    // ==================== PaginaLogin ====================
    paginaLogin_container: {
        backgroundColor: '#FFD2B3',
        flex: 1,
    },
    paginaLogin_scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    paginaLogin_conteudo: {
        backgroundColor: '#F6F6F6',
        width: '90%',
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
        padding: 20,
    },
    paginaLogin_conteudoSemTeclado: {
        height: '55%',
    },
    paginaLogin_conteudoComTeclado: {
        flexGrow: 1,
    },
    paginaLogin_logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 50,
    },
    paginaLogin_link: {
        color: '#004AAD',
        marginTop: 10,
        textDecorationLine: 'underline',
    },

    // ==================== Botao ====================
    botao_botao: {
        backgroundColor: '#134313',
        paddingVertical: 10,
        paddingHorizontal: 24,
        margin: 20,
        borderRadius: 50,
        alignItems: 'center',
        width: '40%',
        justifyContent: 'center',
    },
    botao_botaoPressed: {
        backgroundColor: '#096b09ff',
    },
    botao_texto: {
        color: '#FFFFFF',
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
        color: '#134313',
        textDecorationLine: 'underline',
    },
    adicionarColecao_modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    adicionarColecao_modalContent: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
    },
    adicionarColecao_modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    adicionarColecao_input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
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
    },
    adicionarColecao_obraItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        marginRight: 10,
    },
    adicionarColecao_obraSelecionada: {
        backgroundColor: '#D3F9D8',
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
        backgroundColor: '#E5E5E5',
        borderRadius: 16,
        padding: 20,
        width: '22%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    adicionarObra_adicionarObraOuColecao: {
        fontSize: 32,
        color: '#134313',
        textAlign: 'center',
    },
    adicionarObra_modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    adicionarObra_modalContent: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
    },
    adicionarObra_modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    adicionarObra_input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    adicionarObra_descricaoInput: {
        height: 80,
        textAlignVertical: 'top',
    },
    adicionarObra_botaoImagem: {
        backgroundColor: '#134313',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    adicionarObra_botaoImagemTexto: {
        color: '#FFF',
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
        backgroundColor: '#aa0000',
        pressedBackgroundColor: '#880000',
    },

    // ==================== AdicionarTags ====================
    adicionarTags_modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    adicionarTags_modalContent: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    adicionarTags_modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
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
    },
    adicionarTags_tagSelecionada: {
        flexBasis: '45%',
        margin: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 16,
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
        // estilos para a foto de capa
    },
    perfilTela_imagemCapa: {
        // estilos para a imagem da foto de capa
    },
    perfilTela_adicionarFotoPerfil: {
        // estilos para a foto de perfil
    },
    perfilTela_imagemPerfil: {
        // estilos para a imagem da foto de perfil
    },
    perfilTela_nomeArtista: {
        // estilos para o nome do artista
    },

    // ==================== Perfil (componentes) ====================
    perfilComponente_adicionarFotoCapa: {
        backgroundColor: '#E5E5E5',
        width: '90%',
        height: 200,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    perfilComponente_adicionarFotoPerfil: {
        backgroundColor: '#E5E5E5',
        width: '35%',
        aspectRatio: 1,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#134313',
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
    },

    // ==================== BotaoAdicionarObraOuColecao ====================
    botaoAdicionarObraOuColecao_conteudo: {
        backgroundColor: '#E5E5E5',
        borderRadius: 16,
        padding: 20,
        width: '22%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    botaoAdicionarObraOuColecao_adicionarObraOuColecao: {
        fontSize: 32,
        color: '#134313',
        textAlign: 'center',
    },

    // ==================== PaginaPerfil ====================
    paginaPerfil_container: {
        backgroundColor: '#F5F5F5',
        flex: 1,
    },
    paginaPerfil_scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#F5F5F5',
        paddingBottom: 80,
    },
    paginaPerfil_conteudo: {
        backgroundColor: '#F6F6F6',
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
        color: '#004AAD',
        marginTop: 10,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    paginaPerfil_adicionarfotoCapa: {
        backgroundColor: '#E5E5E5',
        width: '100%',
        height: 200,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginaPerfil_fotoCapa: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    paginaPerfil_adicionarFotoPerfil: {
        backgroundColor: '#E5E5E5',
        width: '35%',
        aspectRatio: 1,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#134313',
        borderWidth: 3,
        position: 'absolute',
        top: '15%',
        right: '5%',
    },
    paginaPerfil_fotoPerfil: {
        width: 120,
        height: 120,
        borderRadius: 60,
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
        backgroundColor: '#AB8368',
        padding: 10,
        borderRadius: 30,
        marginHorizontal: 5,
        marginBottom: 20,
    },
    paginaPerfil_tagText: {
        color: '#FFF',
        fontSize: 16,
    },
    paginaPerfil_listaContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    paginaPerfil_obraItem: {
        margin: 5,
        alignItems: 'center',
    },
    paginaPerfil_obrafoto: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    paginaPerfil_obraTitulo: {
        marginTop: 5,
        fontSize: 14,
        color: '#000',
    },
    paginaPerfil_colecaoContainer: {
        marginBottom: 20,
    },
    paginaPerfil_colecaoTitulo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    paginaPerfil_modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paginaPerfil_modalTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    paginaPerfil_modalFecharBotao: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    paginaPerfil_modalFecharTexto: {
        color: '#000',
        fontSize: 14,
    },
    paginaPerfil_texto: {
        color: '#333',
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
        color: '#000',
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
        backgroundColor: '#FFD2B3',
        flex: 1,
    },
    paginaCadastro_scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    paginaCadastro_conteudo: {
        backgroundColor: '#F6F6F6',
        width: '90%',
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
        padding: 20,
    },
    paginaCadastro_conteudoSemTeclado: {
        height: '69%',
    },
    paginaCadastro_conteudoComTeclado: {
        flexGrow: 1,
    },
    paginaCadastro_logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 50,
    },
    paginaCadastro_link: {
        color: '#004AAD',
        marginTop: 10,
        textDecorationLine: 'underline',
    },

    // ==================== PaginaInicial ====================
    paginaInicial_container: {
        backgroundColor: '#F5F5F5',
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
        backgroundColor: '#F5F5F5',
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
        backgroundColor: '#E5E5E5',
        width: '25%',
        aspectRatio: 1,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#134313',
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

    // ==================== PaginaEditarPerfil ====================
    paginaEditarPerfil_container: {
        backgroundColor: '#F5F5F5',
        flex: 1,
    },
    paginaEditarPerfil_scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#F5F5F5',
        paddingBottom: 80,
    },
    paginaEditarPerfil_conteudo: {
        backgroundColor: '#F6F6F6',
        width: '100%',
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'flex-start',
        padding: 20,
    },
    paginaEditarPerfil_logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
    paginaEditarPerfil_link: {
        color: '#004AAD',
        marginTop: 10,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    paginaEditarPerfil_adicionarFotoCapa: {
        backgroundColor: '#E5E5E5',
        width: '100%',
        height: 200,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginaEditarPerfil_adicionarFotoPerfil: {
        backgroundColor: '#E5E5E5',
        width: '35%',
        aspectRatio: 1,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#134313',
        borderWidth: 3,
        position: 'absolute',
        top: '15%',
        right: '5%',
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
        backgroundColor: '#AB8368',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 16,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginaEditarPerfil_addButton: {
        backgroundColor: '#AB8368',
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
        color: '#FFF',
        fontSize: 14,
    },
    paginaEditarPerfil_fotoCapaPreview: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    paginaEditarPerfil_fotoPerfilPreview: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },
    paginaEditarPerfil_inputNome: {
        width: '100%',
        marginBottom: 10,
    },
});

export default estilosGlobais;

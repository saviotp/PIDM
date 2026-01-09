import { Image, Pressable, Text, View, KeyboardAvoidingView, ScrollView, Platform, Keyboard, Alert, BackHandler, Modal, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { BarraDeInput } from '../../components/forms';
import { Botao, Titulo } from '../../components/common';
import { BotaoAltoContraste } from '../../components/layout';
import { useEstilos } from '../../hooks/useEstilos';
import { useUsuario } from '../../contexts/UsuarioContext';
import { buscarUsuarioPorEmail, atualizarUsuario, formatarEmailParaId } from '../../services/usuarioService';

// Logos
const logoNormal = require('../../assets/images/logotipo.webp');
const logoAltoContraste = require('../../assets/images/logotipoAltoContraste.webp');

export default function PaginaLogin({ navigation }) {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [emailOuUsuario, setEmailOuUsuario] = useState('');
    const [senha, setSenha] = useState('');
    
    // Estados de erro para validação inline
    const [erroEmailOuUsuario, setErroEmailOuUsuario] = useState('');
    const [erroSenha, setErroSenha] = useState('');
    
    // Estados para recuperação de senha
    const [modalRecuperarSenhaVisible, setModalRecuperarSenhaVisible] = useState(false);
    const [etapaRecuperacao, setEtapaRecuperacao] = useState(1); // 1 = email, 2 = nova senha
    const [emailRecuperacao, setEmailRecuperacao] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
    const [erroEmailRecuperacao, setErroEmailRecuperacao] = useState('');
    const [erroNovaSenha, setErroNovaSenha] = useState('');
    const [erroConfirmarNovaSenha, setErroConfirmarNovaSenha] = useState('');
    const [usuarioRecuperacao, setUsuarioRecuperacao] = useState(null);
    const [carregandoRecuperacao, setCarregandoRecuperacao] = useState(false);
    
    const { estilos, cores, altoContraste } = useEstilos();
    const { login, carregando } = useUsuario();

    // Tratar botão voltar do celular - ir para página inicial
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'App', params: { screen: 'Inicio' } }],
            });
            return true; // Previne o comportamento padrão
        });

        return () => backHandler.remove();
    }, [navigation]);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    // Validação em tempo real
    const handleEmailOuUsuarioChange = (text) => {
        setEmailOuUsuario(text);
        if (!text.trim()) {
            setErroEmailOuUsuario('Usuário ou e-mail é obrigatório.');
        } else {
            setErroEmailOuUsuario('');
        }
    };

    const handleSenhaChange = (text) => {
        setSenha(text);
        if (!text) {
            setErroSenha('Senha é obrigatória.');
        } else if (text.length < 8) {
            setErroSenha('A senha deve ter pelo menos 8 caracteres.');
        } else {
            setErroSenha('');
        }
    };

    const handleLogin = async () => {
        Keyboard.dismiss();
        
        let temErro = false;
        
        if (!emailOuUsuario.trim()) {
            setErroEmailOuUsuario('Usuário ou e-mail é obrigatório.');
            temErro = true;
        }
        
        if (!senha) {
            setErroSenha('Senha é obrigatória.');
            temErro = true;
        } else if (senha.length < 8) {
            setErroSenha('A senha deve ter pelo menos 8 caracteres.');
            temErro = true;
        }
        
        if (temErro) {
            Alert.alert('Erro', 'Por favor, corrija os erros antes de continuar.');
            return;
        }
        
        const resultado = await login(emailOuUsuario, senha);
        
        if (resultado.sucesso) {
            navigation.replace('App');
        } else {
            Alert.alert('Erro', resultado.erro || 'Email/usuário ou senha incorretos.');
        }
    };

    // Funções de recuperação de senha
    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const abrirModalRecuperacao = () => {
        setModalRecuperarSenhaVisible(true);
        setEtapaRecuperacao(1);
        setEmailRecuperacao('');
        setNovaSenha('');
        setConfirmarNovaSenha('');
        setErroEmailRecuperacao('');
        setErroNovaSenha('');
        setErroConfirmarNovaSenha('');
        setUsuarioRecuperacao(null);
    };

    const fecharModalRecuperacao = () => {
        setModalRecuperarSenhaVisible(false);
        setEtapaRecuperacao(1);
        setEmailRecuperacao('');
        setNovaSenha('');
        setConfirmarNovaSenha('');
        setErroEmailRecuperacao('');
        setErroNovaSenha('');
        setErroConfirmarNovaSenha('');
        setUsuarioRecuperacao(null);
    };

    const verificarEmail = async () => {
        Keyboard.dismiss();
        
        if (!emailRecuperacao.trim()) {
            setErroEmailRecuperacao('E-mail é obrigatório.');
            return;
        }
        
        if (!validarEmail(emailRecuperacao)) {
            setErroEmailRecuperacao('E-mail inválido.');
            return;
        }
        
        setCarregandoRecuperacao(true);
        
        try {
            const resultado = await buscarUsuarioPorEmail(emailRecuperacao.trim());
            
            if (resultado.sucesso) {
                setUsuarioRecuperacao(resultado.dados);
                setEtapaRecuperacao(2);
                setErroEmailRecuperacao('');
            } else {
                setErroEmailRecuperacao('E-mail não encontrado no sistema.');
            }
        } catch (erro) {
            setErroEmailRecuperacao('Erro ao verificar e-mail. Tente novamente.');
        } finally {
            setCarregandoRecuperacao(false);
        }
    };

    const redefinirSenha = async () => {
        Keyboard.dismiss();
        
        let temErro = false;
        
        if (!novaSenha) {
            setErroNovaSenha('Nova senha é obrigatória.');
            temErro = true;
        } else if (novaSenha.length < 8) {
            setErroNovaSenha('A senha deve ter pelo menos 8 caracteres.');
            temErro = true;
        } else {
            setErroNovaSenha('');
        }
        
        if (!confirmarNovaSenha) {
            setErroConfirmarNovaSenha('Confirmação de senha é obrigatória.');
            temErro = true;
        } else if (confirmarNovaSenha !== novaSenha) {
            setErroConfirmarNovaSenha('As senhas não coincidem.');
            temErro = true;
        } else {
            setErroConfirmarNovaSenha('');
        }
        
        if (temErro) return;
        
        setCarregandoRecuperacao(true);
        
        try {
            const resultado = await atualizarUsuario(usuarioRecuperacao.id, { senha: novaSenha });
            
            if (resultado.sucesso) {
                fecharModalRecuperacao();
                // Fazer login automático com a nova senha e redirecionar para PaginaEditarPerfil
                const resultadoLogin = await login(usuarioRecuperacao.email, novaSenha);
                if (resultadoLogin.sucesso) {
                    Alert.alert('Sucesso', 'Sua senha foi redefinida com sucesso!', [
                        { 
                            text: 'OK', 
                            onPress: () => navigation.replace('App', { screen: 'Perfil' })
                        }
                    ]);
                } else {
                    Alert.alert('Sucesso', 'Sua senha foi redefinida. Faça login com sua nova senha.');
                }
            } else {
                Alert.alert('Erro', 'Não foi possível redefinir a senha. Tente novamente.');
            }
        } catch (erro) {
            Alert.alert('Erro', 'Ocorreu um erro ao redefinir a senha. Tente novamente.');
        } finally {
            setCarregandoRecuperacao(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={estilos.paginaLogin_container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <BotaoAltoContraste />
            <Pressable onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'App', params: { screen: 'Inicio' } }],
            })}>
                <Image 
                    source={altoContraste ? logoAltoContraste : logoNormal} 
                    style={estilos.paginaLogin_logoFixo} 
                />
            </Pressable>
            <ScrollView contentContainerStyle={estilos.paginaLogin_scrollContent}>
                <View style={[
                    estilos.paginaLogin_conteudo,
                    keyboardVisible ? estilos.paginaLogin_conteudoComTeclado : estilos.paginaLogin_conteudoSemTeclado
                ]}>
                    <Titulo color={cores.primaria}>ENTRAR</Titulo>
                    <BarraDeInput label="Usuário ou Email" value={emailOuUsuario} onChangeText={handleEmailOuUsuarioChange} />
                    {erroEmailOuUsuario ? <Text style={estilos.paginaLogin_erro}>{erroEmailOuUsuario}</Text> : null}
                    <BarraDeInput label="Senha" value={senha} onChangeText={handleSenhaChange} secureTextEntry />
                    {erroSenha ? <Text style={estilos.paginaLogin_erro}>{erroSenha}</Text> : null}
                    <Botao onPress={handleLogin} disabled={carregando} style={{ minWidth: 120 }}>
                        {carregando ? 'Entrando...' : 'Entrar'}
                    </Botao>
                    <Pressable onPress={abrirModalRecuperacao}>
                        <Text style={estilos.paginaLogin_link}>Esqueceu a senha?</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('PaginaCadastro')}>
                        <Text style={estilos.paginaLogin_link}>Não possui um login? Cadastre-se</Text>
                    </Pressable>
                </View>
            </ScrollView>

            {/* Modal de Recuperação de Senha */}
            <Modal
                visible={modalRecuperarSenhaVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={fecharModalRecuperacao}
            >
                <View style={estilos.paginaLogin_modalOverlay}>
                    <View style={estilos.paginaLogin_modalContent}>
                        <Text style={estilos.paginaLogin_modalTitulo}>
                            {etapaRecuperacao === 1 ? 'Recuperar Senha' : 'Redefinir Senha'}
                        </Text>

                        {etapaRecuperacao === 1 ? (
                            <>
                                <Text style={estilos.paginaLogin_modalTexto}>
                                    Digite seu e-mail cadastrado para redefinir sua senha.
                                </Text>
                                <BarraDeInput 
                                    label="E-mail" 
                                    value={emailRecuperacao} 
                                    onChangeText={(text) => {
                                        setEmailRecuperacao(text);
                                        setErroEmailRecuperacao('');
                                    }}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                {erroEmailRecuperacao ? (
                                    <Text style={estilos.paginaLogin_erro}>{erroEmailRecuperacao}</Text>
                                ) : null}
                            </>
                        ) : (
                            <>
                                <Text style={estilos.paginaLogin_modalTexto}>
                                    E-mail verificado! Digite sua nova senha.
                                </Text>
                                <BarraDeInput 
                                    label="Nova Senha" 
                                    value={novaSenha} 
                                    onChangeText={(text) => {
                                        setNovaSenha(text);
                                        setErroNovaSenha('');
                                        if (confirmarNovaSenha && text !== confirmarNovaSenha) {
                                            setErroConfirmarNovaSenha('As senhas não coincidem.');
                                        } else {
                                            setErroConfirmarNovaSenha('');
                                        }
                                    }}
                                    secureTextEntry
                                />
                                {erroNovaSenha ? (
                                    <Text style={estilos.paginaLogin_erro}>{erroNovaSenha}</Text>
                                ) : null}
                                <BarraDeInput 
                                    label="Confirmar Nova Senha" 
                                    value={confirmarNovaSenha} 
                                    onChangeText={(text) => {
                                        setConfirmarNovaSenha(text);
                                        if (text !== novaSenha) {
                                            setErroConfirmarNovaSenha('As senhas não coincidem.');
                                        } else {
                                            setErroConfirmarNovaSenha('');
                                        }
                                    }}
                                    secureTextEntry
                                />
                                {erroConfirmarNovaSenha ? (
                                    <Text style={estilos.paginaLogin_erro}>{erroConfirmarNovaSenha}</Text>
                                ) : null}
                            </>
                        )}

                        <View style={estilos.paginaLogin_modalBotoesContainer}>
                            <Botao
                                backgroundColor={cores.primaria}
                                pressedBackgroundColor={cores.primariaPressed}
                                onPress={fecharModalRecuperacao}
                                style={estilos.paginaLogin_modalBotao}
                            >
                                Cancelar
                            </Botao>
                            <Botao
                                backgroundColor={cores.secundaria}
                                pressedBackgroundColor={cores.secundariaPressed}
                                onPress={etapaRecuperacao === 1 ? verificarEmail : redefinirSenha}
                                disabled={carregandoRecuperacao}
                                style={estilos.paginaLogin_modalBotao}
                            >
                                {carregandoRecuperacao 
                                    ? 'Aguarde...' 
                                    : etapaRecuperacao === 1 
                                        ? 'Verificar' 
                                        : 'Redefinir'
                                }
                            </Botao>
                        </View>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}



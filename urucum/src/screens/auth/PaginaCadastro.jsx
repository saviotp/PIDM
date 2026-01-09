import { Image, Pressable, Text, View, KeyboardAvoidingView, ScrollView, Platform, Keyboard, Alert, BackHandler } from 'react-native';
import { useState, useEffect } from 'react';
import { BarraDeInput } from '../../components/forms';
import { Botao, Titulo } from '../../components/common';
import { BotaoAltoContraste } from '../../components/layout';
import { useEstilos } from '../../hooks/useEstilos';
import { useUsuario } from '../../contexts/UsuarioContext';

// Logos
const logoNormal = require('../../assets/images/logotipo.webp');
const logoAltoContraste = require('../../assets/images/logotipoAltoContraste.webp');

export default function PaginaCadastro({ navigation }) {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    
    // Estados de erro para validação inline
    const [erroNome, setErroNome] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [erroSenha, setErroSenha] = useState('');
    const [erroConfirmarSenha, setErroConfirmarSenha] = useState('');
    
    const { estilos, cores, altoContraste } = useEstilos();
    const { cadastrar, carregando } = useUsuario();

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

    // Função para validar email
    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    // Validação em tempo real
    const handleNomeChange = (text) => {
        setNome(text);
        if (!text.trim()) {
            setErroNome('Nome artístico é obrigatório.');
        } else {
            setErroNome('');
        }
    };

    const handleEmailChange = (text) => {
        setEmail(text);
        if (!text.trim()) {
            setErroEmail('E-mail é obrigatório.');
        } else if (!validarEmail(text)) {
            setErroEmail('E-mail inválido.');
        } else {
            setErroEmail('');
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
        // Também valida confirmar senha se já estiver preenchido
        if (confirmarSenha && text !== confirmarSenha) {
            setErroConfirmarSenha('As senhas não coincidem.');
        } else if (confirmarSenha) {
            setErroConfirmarSenha('');
        }
    };

    const handleConfirmarSenhaChange = (text) => {
        setConfirmarSenha(text);
        if (!text) {
            setErroConfirmarSenha('Confirmação de senha é obrigatória.');
        } else if (text !== senha) {
            setErroConfirmarSenha('As senhas não coincidem.');
        } else {
            setErroConfirmarSenha('');
        }
    };

    const handleCadastrar = async () => {
        Keyboard.dismiss();
        
        // Validações finais
        let temErro = false;
        
        if (!nome.trim()) {
            setErroNome('Nome artístico é obrigatório.');
            temErro = true;
        }
        
        if (!email.trim()) {
            setErroEmail('E-mail é obrigatório.');
            temErro = true;
        } else if (!validarEmail(email)) {
            setErroEmail('E-mail inválido.');
            temErro = true;
        }
        
        if (!senha) {
            setErroSenha('Senha é obrigatória.');
            temErro = true;
        } else if (senha.length < 8) {
            setErroSenha('A senha deve ter pelo menos 8 caracteres.');
            temErro = true;
        }
        
        if (!confirmarSenha) {
            setErroConfirmarSenha('Confirmação de senha é obrigatória.');
            temErro = true;
        } else if (senha !== confirmarSenha) {
            setErroConfirmarSenha('As senhas não coincidem.');
            temErro = true;
        }
        
        if (temErro) {
            Alert.alert('Erro', 'Por favor, corrija os erros antes de continuar.');
            return;
        }
        
        const resultado = await cadastrar(nome, email, senha);
        
        if (resultado.sucesso) {
            // Navega para o App e depois para a aba Perfil
            navigation.replace('App', { screen: 'Perfil' });
        } else {
            Alert.alert('Erro', resultado.erro || 'Erro ao cadastrar. Tente novamente.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={estilos.paginaCadastro_container}
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
                    style={estilos.paginaCadastro_logoFixo} 
                />
            </Pressable>
            <ScrollView contentContainerStyle={estilos.paginaCadastro_scrollContent}>
                <View style={[
                    estilos.paginaCadastro_conteudo,
                    keyboardVisible ? estilos.paginaCadastro_conteudoComTeclado : estilos.paginaCadastro_conteudoSemTeclado
                ]}>
                    <Titulo color={cores.primaria}>CADASTRO</Titulo>
                    <BarraDeInput label="Nome Artístico" value={nome} onChangeText={handleNomeChange} />
                    {erroNome ? <Text style={estilos.paginaCadastro_erro}>{erroNome}</Text> : null}
                    <BarraDeInput label="E-mail" value={email} onChangeText={handleEmailChange} />
                    {erroEmail ? <Text style={estilos.paginaCadastro_erro}>{erroEmail}</Text> : null}
                    <BarraDeInput label="Senha" value={senha} onChangeText={handleSenhaChange} secureTextEntry />
                    {erroSenha ? <Text style={estilos.paginaCadastro_erro}>{erroSenha}</Text> : null}
                    <BarraDeInput label="Confirme sua Senha" value={confirmarSenha} onChangeText={handleConfirmarSenhaChange} secureTextEntry />
                    {erroConfirmarSenha ? <Text style={estilos.paginaCadastro_erro}>{erroConfirmarSenha}</Text> : null}
                    <Botao onPress={handleCadastrar} disabled={carregando} style={{ minWidth: 140 }}>
                        {carregando ? 'Cadastrando...' : 'Cadastrar'}
                    </Botao>
                    <Pressable onPress={() => navigation.navigate('PaginaLogin')}>
                        <Text style={estilos.paginaCadastro_link}>Já possui uma conta? Faça Login</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
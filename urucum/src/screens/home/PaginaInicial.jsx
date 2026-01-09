import { Image, Pressable, ScrollView, View, Text, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react';
import { Perfil } from "../../components/profile";
import { Titulo } from "../../components/common";
import { BarraPesquisa } from "../../components/forms";
import { useEstilos } from "../../hooks/useEstilos";
import { useUsuario } from "../../contexts/UsuarioContext";
import { buscarTodosUsuarios, pesquisarUsuarios, escutarUsuarios } from "../../services/usuarioService";

// Logos
const logoNormal = require('../../assets/images/logotipo.webp');
const logoAltoContraste = require('../../assets/images/logotipoAltoContraste.webp');

export default function PaginaInicial() {
    const navigation = useNavigation();
    const { estilos, cores, altoContraste } = useEstilos();
    const { usuario } = useUsuario();
    
    const [usuarios, setUsuarios] = useState([]);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [termoPesquisa, setTermoPesquisa] = useState('');

    // Carregar usuários do Firebase
    useEffect(() => {
        const carregarUsuarios = async () => {
            setCarregando(true);
            const resultado = await buscarTodosUsuarios();
            if (resultado.sucesso) {
                setUsuarios(resultado.dados);
                setUsuariosFiltrados(resultado.dados);
            }
            setCarregando(false);
        };

        carregarUsuarios();

        // Escutar mudanças em tempo real
        const unsubscribe = escutarUsuarios((usuariosAtualizados) => {
            setUsuarios(usuariosAtualizados);
            if (!termoPesquisa) {
                setUsuariosFiltrados(usuariosAtualizados);
            }
        });

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    // Função de pesquisa
    const handlePesquisa = useCallback(async (termo) => {
        setTermoPesquisa(termo);
        
        if (!termo.trim()) {
            setUsuariosFiltrados(usuarios);
            return;
        }

        const resultado = await pesquisarUsuarios(termo);
        if (resultado.sucesso) {
            setUsuariosFiltrados(resultado.dados);
        }
    }, [usuarios]);

    return (
        <View style={estilos.paginaInicial_container}>
            <View style={estilos.paginaInicial_menu}>
                <Image
                    source={altoContraste ? logoAltoContraste : logoNormal}
                    style={estilos.paginaInicial_logo}
                />
                <Titulo style={estilos.paginaInicial_titulo}>Página Inicial</Titulo>
                <Pressable
                    onPress={() => navigation.navigate(usuario ? 'Perfil' : 'PaginaCadastro')}
                    style={estilos.paginaInicial_adicionarFotoPerfil}
                >
                    <Image
                        source={{ uri: usuario?.fotoPerfil || 'https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png' }}
                        style={estilos.paginaInicial_imagemPerfil}
                    />
                </Pressable>
            </View>
            
            {/* Barra de Pesquisa */}
            <BarraPesquisa 
                placeholder="Pesquisar por nome ou tag..."
                onPesquisar={handlePesquisa}
                style={{ marginHorizontal: '5%', marginBottom: 20 }}
            />
            
            {carregando ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={cores.primaria} />
                    <Text style={{ marginTop: 10, color: cores.textoPrimario }}>Carregando perfis...</Text>
                </View>
            ) : usuariosFiltrados.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: cores.textoPrimario, fontSize: 16 }}>
                        {termoPesquisa ? 'Nenhum resultado encontrado.' : 'Nenhum perfil cadastrado ainda.'}
                    </Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={estilos.paginaInicial_scrollContainer}>
                    {usuariosFiltrados
                        .filter((usuarioItem) => usuarioItem && usuarioItem.nome)
                        .map((usuarioItem) => (
                            <Pressable
                                key={usuarioItem.id}
                                onPress={() => navigation.navigate('PaginaPerfil', { usuario: usuarioItem })}
                                style={estilos.paginaInicial_perfilContainer}
                            >
                                <Perfil
                                    nome={usuarioItem.nome || 'Sem nome'}
                                    fotoPerfil={usuarioItem.fotoPerfil}
                                    fotoCapa={usuarioItem.fotoCapa}
                                />
                            </Pressable>
                        ))}
                </ScrollView>
            )}
        </View>
    );
}
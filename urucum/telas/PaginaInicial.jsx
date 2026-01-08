import { Image, Pressable, ScrollView, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Perfil from "../componentes/Perfil";
import Titulo from "../componentes/Titulo";
import estilosGlobais from "../estilos/estilosGlobais";

const usuarios = [
    {
        id: 'usuario1@email.com',
        nome: 'Usuário 1',
        biografia: 'Artista apaixonado por pintura.',
        numeroContato: '5599999999999',
        instagram: 'usuario1_art',
        fotoPerfil: 'https://forbes.com.br/wp-content/uploads/2022/02/money-reese-witherspoon-25-artistas-mais-bem-pagos-dos-EUA.jpg',
        fotoCapa: 'https://mondomoda.com.br/wp-content/uploads/2020/05/wassily-kandinsky-transverse-line-1923-40-domc3adnio-pc3bablico.jpg',
        tags: ['Pintura', 'Arte Moderna'],
        obras: [
            {
                titulo: 'Coração',
                foto: 'https://mondomoda.com.br/wp-content/uploads/2020/05/wassily-kandinsky-transverse-line-1923-40-domc3adnio-pc3bablico.jpg',
                descricao: 'Descrição da Obra 1',
            },
            {
                titulo: 'Abertura',
                foto: 'https://blog.useartools.com.br/wp-content/uploads/2022/12/pintura-de-kandinsky-amarelo-vermelho-azul-1925.jpeg',
                descricao: 'Descrição da Obra 2',
            },
        ],
        colecoes: [
            {
                titulo: 'Coleção 1',
                foto: 'https://blog.useartools.com.br/wp-content/uploads/2022/12/pintura-de-kandinsky-amarelo-vermelho-azul-1925.jpeg',
                obras: [
                    {
                        titulo: 'Coração',
                        foto: 'https://mondomoda.com.br/wp-content/uploads/2020/05/wassily-kandinsky-transverse-line-1923-40-domc3adnio-pc3bablico.jpg',
                        descricao: 'Descrição da Obra 1',
                    },
                    {
                        titulo: 'Abertura',
                        foto: 'https://blog.useartools.com.br/wp-content/uploads/2022/12/pintura-de-kandinsky-amarelo-vermelho-azul-1925.jpeg',
                        descricao: 'Descrição da Obra 2 GDSVUSDGFUSDFBIUFHSUHFSUFHGSYFGHSHFUYHFUYHSUYHGFSUYGFSUYFGSUY',
                    },
                ],
            },
            {
                titulo: 'Coleção 1',
                foto: 'https://blog.useartools.com.br/wp-content/uploads/2022/12/pintura-de-kandinsky-amarelo-vermelho-azul-1925.jpeg',
                obras: [
                    {
                        titulo: 'Coração',
                        foto: 'https://mondomoda.com.br/wp-content/uploads/2020/05/wassily-kandinsky-transverse-line-1923-40-domc3adnio-pc3bablico.jpg',
                        descricao: 'Descrição da Obra 1',
                    },
                    {
                        titulo: 'Abertura',
                        foto: 'https://blog.useartools.com.br/wp-content/uploads/2022/12/pintura-de-kandinsky-amarelo-vermelho-azul-1925.jpeg',
                        descricao: 'Descrição da Obra 2',
                    },
                ],
            },
            {
                titulo: 'Coleção 1',
                foto: 'https://blog.useartools.com.br/wp-content/uploads/2022/12/pintura-de-kandinsky-amarelo-vermelho-azul-1925.jpeg',
                obras: [
                    {
                        titulo: 'Coração',
                        foto: 'https://mondomoda.com.br/wp-content/uploads/2020/05/wassily-kandinsky-transverse-line-1923-40-domc3adnio-pc3bablico.jpg',
                        descricao: 'Descrição da Obra 1',
                    },
                    {
                        titulo: 'Abertura',
                        foto: 'https://blog.useartools.com.br/wp-content/uploads/2022/12/pintura-de-kandinsky-amarelo-vermelho-azul-1925.jpeg',
                        descricao: 'Descrição da Obra 2',
                    },
                ],
            },
        ],
    },
    {
        id: 'usuario2@email.com',
        nome: 'Usuário 2',
        biografia: 'Escultor e designer.',
        numeroContato: '5598888888888',
        instagram: 'usuario2_sculpt',
        fotoPerfil: 'https://i.pinimg.com/236x/aa/64/c4/aa64c423a074473617f44f8598eef7c0.jpg',
        fotoCapa: 'https://sme.goiania.go.gov.br/conexaoescola/wp-content/uploads/2020/10/Abstracionismo-5-e1601570421194.jpg',
        tags: ['Escultura', 'Design'],
        obras: [
            {
                titulo: 'Obra 1',
                foto: 'https://sme.goiania.go.gov.br/conexaoescola/wp-content/uploads/2020/10/Abstracionismo-5-e1601570421194.jpg',
                descricao: 'Descrição da Obra 1',
            },
        ],
        colecoes: [
            {
                titulo: 'Coleção 1',
                foto: 'https://www.davincivix.com.br/wp-content/uploads/galeria/fotos-2017/3-19.jpg',
                obras: [
                    {
                        titulo: 'Obra da Coleção 1',
                        foto: 'https://www.davincivix.com.br/wp-content/uploads/galeria/fotos-2017/3-19.jpg',
                        descricao: 'Descrição da Obra da Coleção 1',
                    },
                ],
            },
        ],
    },
];

export default function PaginaInicial() {
    const navigation = useNavigation();

    return (
        <View style={estilosGlobais.paginaInicial_container}>
            <View style={estilosGlobais.paginaInicial_menu}>
                <Image
                    source={require('../assets/images/logotipo.webp')}
                    style={estilosGlobais.paginaInicial_logo}
                />
                <Titulo style={estilosGlobais.paginaInicial_titulo}>Página Inicial</Titulo>
                <Pressable
                    onPress={() => navigation.navigate('PaginaCadastro')} // Redireciona para a tela de Cadastro
                    style={estilosGlobais.paginaInicial_adicionarFotoPerfil}
                >
                    <Image
                        source={{ uri: 'https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png' }} // Imagem de perfil vazia
                        style={estilosGlobais.paginaInicial_imagemPerfil}
                    />
                </Pressable>
            </View>
            <ScrollView contentContainerStyle={estilosGlobais.paginaInicial_scrollContainer}>
                {usuarios.map((usuario) => (
                    <Pressable
                        key={usuario.id}
                        onPress={() => navigation.navigate('PaginaPerfil', { usuario })}
                        style={estilosGlobais.paginaInicial_perfilContainer}
                    >
                        <Perfil
                            nome={usuario.nome}
                            fotoPerfil={usuario.fotoPerfil}
                            fotoCapa={usuario.fotoCapa}
                        />
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}
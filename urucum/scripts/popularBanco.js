/**
 * Script para popular o banco de dados Firebase com artistas fictícios
 * 
 * COMO USAR:
 * 1. Execute: node scripts/popularBanco.js
 * 2. Após executar, você pode apagar este arquivo
 * 
 * ATENÇÃO: Este script adiciona dados ao banco. Execute apenas uma vez!
 */

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCvhlG0B3xZpMe-4FK9Kifgmi-RmgRhs1k",
    authDomain: "urucum-react-native-project.firebaseapp.com",
    databaseURL: "https://urucum-react-native-project-default-rtdb.firebaseio.com",
    projectId: "urucum-react-native-project",
    storageBucket: "urucum-react-native-project.firebasestorage.app",
    messagingSenderId: "278867216585",
    appId: "1:278867216585:android:50f486e95560cc0e336518"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Fotos de perfil usando randomuser.me (API de avatares realistas)
const fotosPerfilReais = [
    'https://randomuser.me/api/portraits/women/1.jpg',
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/women/2.jpg',
    'https://randomuser.me/api/portraits/men/2.jpg',
    'https://randomuser.me/api/portraits/women/3.jpg',
    'https://randomuser.me/api/portraits/men/3.jpg',
    'https://randomuser.me/api/portraits/women/4.jpg',
    'https://randomuser.me/api/portraits/men/4.jpg',
    'https://randomuser.me/api/portraits/women/5.jpg',
    'https://randomuser.me/api/portraits/men/5.jpg',
    'https://randomuser.me/api/portraits/women/6.jpg',
    'https://randomuser.me/api/portraits/men/6.jpg',
    'https://randomuser.me/api/portraits/women/7.jpg',
    'https://randomuser.me/api/portraits/men/7.jpg',
    'https://randomuser.me/api/portraits/women/8.jpg',
];

// Fotos de obras de arte usando Lorem Picsum (imagens artísticas)
const fotosObrasReais = [
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1531913223931-b0d3198229ee?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518173946687-a4c036bc5aa8?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1555448248-2571daf6344b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1495462911434-be47104d70fa?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1579762714453-51d9c40bb36a?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551913902-c92207a0b522?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1583225214464-9296029427aa?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1577083552761-2c5a15a1c269?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=400&h=400&fit=crop',
];

let indiceObra = 0;
const getProximaFotoObra = () => {
    const foto = fotosObrasReais[indiceObra % fotosObrasReais.length];
    indiceObra++;
    return foto;
};

// Fotos de capa (paisagens artísticas)
const fotosCapaReais = [
    'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1531913223931-b0d3198229ee?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=800&h=300&fit=crop',
];

// Dados dos artistas com fotos reais
const artistas = [
    {
        id: 'artista_marina_silva',
        nome: 'Marina Silva',
        email: 'marina.silva@artista.com',
        senha: 'senha123',
        telefone: '+5585999001001',
        instagram: 'marina.silva.art',
        foto: fotosPerfilReais[0],
        fotoCapa: fotosCapaReais[0],
        bio: 'Artista visual cearense, especializada em pintura a óleo e técnicas mistas. Minha arte explora a conexão entre o ser humano e a natureza nordestina.',
        tags: ['Pintura', 'Óleo', 'Figurativo', 'Contemporâneo'],
    },
    {
        id: 'artista_pedro_costa',
        nome: 'Pedro Costa',
        email: 'pedro.costa@artista.com',
        senha: 'senha123',
        telefone: '+5585999002002',
        instagram: 'pedro.costa.ceramica',
        foto: fotosPerfilReais[1],
        fotoCapa: fotosCapaReais[1],
        bio: 'Escultor e ceramista. Transformo barro em histórias, criando peças que celebram a cultura popular brasileira.',
        tags: ['Escultura', 'Cerâmica', 'Figurativo', 'Clássico'],
    },
    {
        id: 'artista_ana_beatriz',
        nome: 'Ana Beatriz Mendes',
        email: 'ana.beatriz@artista.com',
        senha: 'senha123',
        telefone: '+5585999003003',
        instagram: 'anabeatriz.foto',
        foto: fotosPerfilReais[2],
        fotoCapa: fotosCapaReais[2],
        bio: 'Fotógrafa documental focada em registrar a vida cotidiana das comunidades tradicionais do Ceará.',
        tags: ['Fotografia', 'Contemporâneo', 'Figurativo'],
    },
    {
        id: 'artista_lucas_oliveira',
        nome: 'Lucas Oliveira',
        email: 'lucas.oliveira@artista.com',
        senha: 'senha123',
        telefone: '+5585999004004',
        instagram: 'lucas.digital.art',
        foto: fotosPerfilReais[3],
        fotoCapa: fotosCapaReais[3],
        bio: 'Artista digital e ilustrador. Crio mundos fantásticos misturando elementos da cultura pop com o folclore brasileiro.',
        tags: ['Arte Digital', 'Desenho', 'Contemporâneo', 'Experimental'],
    },
    {
        id: 'artista_fernanda_lima',
        nome: 'Fernanda Lima',
        email: 'fernanda.lima@artista.com',
        senha: 'senha123',
        telefone: '+5585999005005',
        instagram: 'fernanda.aquarelas',
        foto: fotosPerfilReais[4],
        fotoCapa: fotosCapaReais[4],
        bio: 'Aquarelista apaixonada pela flora brasileira. Cada pintura é um estudo botânico e uma celebração das cores da natureza.',
        tags: ['Aquarela', 'Pintura', 'Figurativo', 'Clássico'],
    },
    {
        id: 'artista_rafael_santos',
        nome: 'Rafael Santos',
        email: 'rafael.santos@artista.com',
        senha: 'senha123',
        telefone: '+5585999006006',
        instagram: 'rafael.grafite',
        foto: fotosPerfilReais[5],
        fotoCapa: fotosCapaReais[5],
        bio: 'Grafiteiro e muralista. Levo cores e mensagens de resistência para os muros da cidade.',
        tags: ['Pintura', 'Contemporâneo', 'Figurativo', 'Mista'],
    },
    {
        id: 'artista_julia_moreira',
        nome: 'Júlia Moreira',
        email: 'julia.moreira@artista.com',
        senha: 'senha123',
        telefone: '+5585999007007',
        instagram: 'julia.performance',
        foto: fotosPerfilReais[6],
        fotoCapa: fotosCapaReais[6],
        bio: 'Artista performática e instaladora. Meu trabalho questiona as fronteiras entre arte e vida cotidiana.',
        tags: ['Performance', 'Instalação', 'Contemporâneo', 'Experimental'],
    },
    {
        id: 'artista_carlos_eduardo',
        nome: 'Carlos Eduardo Pinto',
        email: 'carlos.eduardo@artista.com',
        senha: 'senha123',
        telefone: '+5585999008008',
        instagram: 'carloseduardo.gravura',
        foto: fotosPerfilReais[7],
        fotoCapa: fotosCapaReais[7],
        bio: 'Gravurista e xilogravador. Mantenho viva a tradição da literatura de cordel através das minhas gravuras.',
        tags: ['Gravura', 'Desenho', 'Clássico', 'Figurativo'],
    },
    {
        id: 'artista_isabela_rocha',
        nome: 'Isabela Rocha',
        email: 'isabela.rocha@artista.com',
        senha: 'senha123',
        telefone: '+5585999009009',
        instagram: 'isabela.abstrato',
        foto: fotosPerfilReais[8],
        fotoCapa: fotosCapaReais[8],
        bio: 'Pintora abstrata. Exploro cores, texturas e emoções em telas que convidam à contemplação.',
        tags: ['Pintura', 'Abstrato', 'Acrílico', 'Contemporâneo'],
    },
    {
        id: 'artista_thiago_almeida',
        nome: 'Thiago Almeida',
        email: 'thiago.almeida@artista.com',
        senha: 'senha123',
        telefone: '+5585999010010',
        instagram: 'thiago.multimidia',
        foto: fotosPerfilReais[9],
        fotoCapa: fotosCapaReais[9],
        bio: 'Artista multimídia. Trabalho na interseção entre tecnologia, arte e sociedade.',
        tags: ['Arte Digital', 'Instalação', 'Experimental', 'Contemporâneo'],
    },
    {
        id: 'artista_patricia_nunes',
        nome: 'Patrícia Nunes',
        email: 'patricia.nunes@artista.com',
        senha: 'senha123',
        telefone: '+5585999011011',
        instagram: 'patricia.ceramica',
        foto: fotosPerfilReais[10],
        fotoCapa: fotosCapaReais[10],
        bio: 'Ceramista contemporânea. Minhas peças fundem tradição e inovação, criando objetos únicos para o dia a dia.',
        tags: ['Cerâmica', 'Escultura', 'Contemporâneo', 'Figurativo'],
    },
    {
        id: 'artista_gabriel_freitas',
        nome: 'Gabriel Freitas',
        email: 'gabriel.freitas@artista.com',
        senha: 'senha123',
        telefone: '+5585999012012',
        instagram: 'gabriel.desenhos',
        foto: fotosPerfilReais[11],
        fotoCapa: fotosCapaReais[11],
        bio: 'Desenhista e ilustrador. Especializado em retratos hiper-realistas a grafite.',
        tags: ['Desenho', 'Figurativo', 'Clássico'],
    },
    {
        id: 'artista_camila_souza',
        nome: 'Camila Souza',
        email: 'camila.souza@artista.com',
        senha: 'senha123',
        telefone: '+5585999013013',
        instagram: 'camila.textil',
        foto: fotosPerfilReais[12],
        fotoCapa: fotosCapaReais[12],
        bio: 'Artista têxtil. Crio tapeçarias e bordados que contam histórias de mulheres brasileiras.',
        tags: ['Mista', 'Figurativo', 'Contemporâneo'],
    },
    {
        id: 'artista_diego_martins',
        nome: 'Diego Martins',
        email: 'diego.martins@artista.com',
        senha: 'senha123',
        telefone: '+5585999014014',
        instagram: 'diego.colagens',
        foto: fotosPerfilReais[13],
        fotoCapa: fotosCapaReais[13],
        bio: 'Collagista e artista visual. Recorto e reconstruo narrativas através de colagens analógicas e digitais.',
        tags: ['Colagem', 'Mista', 'Contemporâneo', 'Experimental'],
    },
    {
        id: 'artista_amanda_rodrigues',
        nome: 'Amanda Rodrigues',
        email: 'amanda.rodrigues@artista.com',
        senha: 'senha123',
        telefone: '+5585999015015',
        instagram: 'amanda.afroarte',
        foto: fotosPerfilReais[14],
        fotoCapa: fotosCapaReais[14],
        bio: 'Pintora e muralista. Minha arte celebra a ancestralidade afro-brasileira através de cores vibrantes e simbolismos.',
        tags: ['Pintura', 'Acrílico', 'Figurativo', 'Contemporâneo'],
    },
];

// Títulos e descrições para as obras
const obrasInfo = [
    { titulo: 'Sertão Dourado', descricao: 'Paisagem do sertão ao pôr do sol' },
    { titulo: 'Mulher Rendeira', descricao: 'Retrato de artesã nordestina' },
    { titulo: 'Jangadas ao Mar', descricao: 'Cena da praia de Fortaleza' },
    { titulo: 'Família Sertaneja', descricao: 'Escultura em cerâmica de família nordestina' },
    { titulo: 'O Vaqueiro', descricao: 'Busto de vaqueiro em terracota' },
    { titulo: 'Pescadores', descricao: 'Série fotográfica sobre pescadores' },
    { titulo: 'Mercado Central', descricao: 'O movimento do Mercado Central' },
    { titulo: 'Rendeiras', descricao: 'Documentação do ofício das rendeiras' },
    { titulo: 'Festa de Reisado', descricao: 'Manifestação cultural do interior' },
    { titulo: 'Curupira Cyberpunk', descricao: 'Releitura futurista do Curupira' },
    { titulo: 'Saci Urbano', descricao: 'Saci na cidade grande' },
    { titulo: 'Orquídeas Nativas', descricao: 'Estudo de orquídeas nativas' },
    { titulo: 'Ipê Amarelo', descricao: 'Ipê em flor' },
    { titulo: 'Cactos e Mandacarus', descricao: 'Flora da caatinga' },
    { titulo: 'Dragão do Mar', descricao: 'Mural em homenagem ao abolicionista' },
    { titulo: 'Favela Colorida', descricao: 'Intervenção urbana em comunidade' },
    { titulo: 'Corpo-Território', descricao: 'Registro de performance' },
    { titulo: 'Memórias Suspensas', descricao: 'Instalação com objetos de família' },
    { titulo: 'Lampião e Maria Bonita', descricao: 'Xilogravura do casal de cangaceiros' },
    { titulo: 'Padre Cícero', descricao: 'Retrato do padim Ciço' },
    { titulo: 'Cangaço', descricao: 'Série sobre o cangaço nordestino' },
    { titulo: 'Harmonia em Azul', descricao: 'Composição abstrata em tons de azul' },
    { titulo: 'Explosão de Cores', descricao: 'Abstrato vibrante' },
    { titulo: 'Dados Humanos', descricao: 'Instalação interativa sobre privacidade' },
    { titulo: 'Ecos Digitais', descricao: 'Projeção audiovisual' },
    { titulo: 'Vasos Orgânicos', descricao: 'Série de vasos com formas naturais' },
    { titulo: 'Tigelas do Mar', descricao: 'Tigelas inspiradas em conchas' },
    { titulo: 'Jardim de Cerâmica', descricao: 'Instalação com flores cerâmicas' },
    { titulo: 'Olhar Profundo', descricao: 'Retrato hiper-realista' },
    { titulo: 'Mãos que Contam', descricao: 'Série de estudos de mãos' },
    { titulo: 'Trama de Memórias', descricao: 'Tapeçaria com histórias familiares' },
    { titulo: 'Bordado Resistência', descricao: 'Bordado com mensagens feministas' },
    { titulo: 'Fragmentos Urbanos', descricao: 'Colagem sobre a vida na cidade' },
    { titulo: 'Sonhos Recortados', descricao: 'Série onírica em colagem' },
    { titulo: 'Passado Presente', descricao: 'Colagem com fotos antigas' },
    { titulo: 'Raízes', descricao: 'Celebração da ancestralidade' },
    { titulo: 'Orixás', descricao: 'Série sobre divindades afro-brasileiras' },
    { titulo: 'Turbantes', descricao: 'Retratos de mulheres negras' },
];

// Gerar obras para cada artista (2-4 obras cada)
const gerarObrasParaArtista = (artistaIndex) => {
    const numObras = 2 + (artistaIndex % 3); // 2, 3 ou 4 obras
    const obras = [];
    const startIndex = (artistaIndex * 3) % obrasInfo.length;
    
    for (let i = 0; i < numObras; i++) {
        const infoIndex = (startIndex + i) % obrasInfo.length;
        obras.push({
            id: `obra_${artistaIndex + 1}_${i + 1}`,
            titulo: obrasInfo[infoIndex].titulo,
            descricao: obrasInfo[infoIndex].descricao,
            foto: getProximaFotoObra(),
        });
    }
    return obras;
};

// Função principal para popular o banco
async function popularBanco() {
    console.log('🎨 Iniciando população do banco de dados...\n');
    
    let sucesso = 0;
    let erros = 0;
    
    for (let i = 0; i < artistas.length; i++) {
        const artista = artistas[i];
        try {
            const usuarioRef = ref(database, `usuarios/${artista.id}`);
            
            const dadosUsuario = {
                nome: artista.nome,
                email: artista.email,
                senha: artista.senha,
                telefone: artista.telefone,
                instagram: artista.instagram,
                biografia: artista.bio,
                foto: artista.foto,
                fotoPerfil: artista.foto,
                fotoCapa: artista.fotoCapa,
                tags: artista.tags,
                obras: gerarObrasParaArtista(i),
                colecoes: [],
                criadoEm: new Date().toISOString(),
                atualizadoEm: new Date().toISOString(),
            };
            
            await set(usuarioRef, dadosUsuario);
            console.log(`✅ ${artista.nome} adicionado com sucesso!`);
            sucesso++;
            
        } catch (erro) {
            console.error(`❌ Erro ao adicionar ${artista.nome}:`, erro.message);
            erros++;
        }
    }
    
    console.log('\n========================================');
    console.log(`📊 Resumo:`);
    console.log(`   ✅ Sucesso: ${sucesso} artistas`);
    console.log(`   ❌ Erros: ${erros} artistas`);
    console.log('========================================\n');
    
    console.log('🎉 Processo finalizado!');
    console.log('💡 Você pode apagar este arquivo após a execução.\n');
    
    process.exit(0);
}

// Executar
popularBanco();

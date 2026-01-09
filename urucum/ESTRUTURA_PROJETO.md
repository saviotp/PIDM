# Estrutura do Projeto Urucum ✅ REORGANIZADO

Este documento descreve a nova estrutura do projeto após a reorganização completa.

## ✅ Status da Migração: COMPLETA

O projeto foi reorganizado com sucesso! A nova estrutura está em `src/`.

## Nova Estrutura de Pastas

```
src/
├── assets/                          # Recursos estáticos
│   ├── icons/                       # Ícones do app
│   │   └── arrow-left.png
│   └── images/                      # Imagens do app
│       ├── logotipo.webp
│       └── logotipoAltoContraste.webp
│
├── components/                      # Componentes reutilizáveis
│   ├── common/                      # Componentes genéricos
│   │   ├── Botao.jsx               # Botão estilizado
│   │   ├── BotaoVoltar.jsx         # Botão de voltar
│   │   ├── Titulo.jsx              # Título estilizado
│   │   └── index.js                # Barrel export
│   │
│   ├── forms/                       # Componentes de formulário
│   │   ├── BarraDeInput.jsx        # Input de texto
│   │   ├── BarraPesquisa.jsx       # Barra de pesquisa
│   │   └── index.js
│   │
│   ├── layout/                      # Componentes de layout
│   │   ├── BotaoAltoContraste.jsx  # Toggle de alto contraste
│   │   └── index.js
│   │
│   ├── modals/                      # Modais reutilizáveis
│   │   ├── ModalImagemTelaCheia.jsx  # Visualizar imagem fullscreen
│   │   └── index.js
│   │
│   └── profile/                     # Componentes de perfil
│       ├── Perfil.jsx              # Card de perfil resumido
│       ├── AdicionarObra.jsx       # Modal de adicionar obra
│       ├── EditarObra.jsx          # Modal de editar obra
│       ├── AdicionarColecao.jsx    # Modal de adicionar coleção
│       ├── AdicionarTags.jsx       # Modal de adicionar tags
│       ├── BotaoAdicionarObraOuColecao.jsx
│       └── index.js
│
├── contexts/                        # Contextos React
│   ├── TemaContext.js              # Contexto de tema (cores)
│   ├── UsuarioContext.js           # Contexto de usuário/auth
│   └── index.js
│
├── hooks/                           # Hooks personalizados
│   ├── useEstilos.js               # Hook para estilos dinâmicos
│   └── index.js
│
├── navigation/                      # Configuração de navegação
│   ├── AppNavigator.jsx            # Navegador principal (Tab + Stack + Auth)
│   └── index.js
│
├── screens/                         # Telas do app
│   ├── auth/                        # Telas de autenticação
│   │   ├── PaginaLogin.jsx
│   │   ├── PaginaCadastro.jsx
│   │   └── index.js
│   │
│   ├── home/                        # Tela inicial e visualização
│   │   ├── PaginaInicial.jsx
│   │   ├── VisualizarObra.jsx      # Visualizar obras
│   │   ├── VisualizarColecao.jsx   # Visualizar coleções
│   │   └── index.js
│   │
│   └── profile/                     # Telas de perfil
│       ├── PaginaPerfil.jsx        # Visualizar perfil de outro usuário
│       ├── PaginaEditarPerfil.jsx  # Editar próprio perfil
│       └── index.js
│
├── services/                        # Serviços externos
│   ├── firebase/
│   │   └── config.js               # Configuração do Firebase
│   ├── cloudinaryService.js        # Upload de imagens
│   ├── usuarioService.js           # Operações de usuário
│   └── index.js
│
├── styles/                          # Estilos
│   ├── cores.js                    # Definição de cores (temas)
│   ├── estilosDinamicos.js         # Estilos dinâmicos
│   └── index.js
│
└── utils/                           # Funções utilitárias
    ├── formatadores.js             # Formatação de telefone, data, etc
    ├── validadores.js              # Validação de email, senha, etc
    └── index.js
```

## Componentes Reutilizáveis Criados

### 1. ModalImagemTelaCheia (src/components/modals/)
Usado em: `VisualizarObra.jsx`, `VisualizarColecao.jsx`

### 2. Formatadores (utils/formatadores.js)
Funções centralizadas para formatação:
- `formatarTelefone(valor)` - Formata para exibição (XX) XXXXX-XXXX
- `formatarTelefoneParaExibicao(valor)` - +55 para WhatsApp
- `formatarTelefoneParaSalvar(valor)` - Apenas números com +55

### 3. Validadores (utils/validadores.js)
Funções de validação:
- `validarEmail(email)` - Valida formato de email
- `validarSenha(senha)` - Mínimo 6 caracteres
- `validarTelefone(telefone)` - Verifica formato brasileiro

## Limpeza das Pastas Antigas

Após confirmar que o app está funcionando, você pode remover:
- `telas/` (movido para `src/screens/`)
- `componentes/` (movido para `src/components/`)
- `contextos/` (movido para `src/contexts/`)
- `estilos/` (movido para `src/styles/`)
- `servidor/` (movido para `src/services/`)
- `firebase/` (movido para `src/services/firebase/`)
- `assets/` (movido para `src/assets/`)
- `App.old.js` (backup do App.js anterior)

**Comando para limpeza:**
```bash
rm -rf telas componentes contextos estilos servidor firebase
rm -rf assets/icons assets/images
rm App.old.js
```

## Barrel Exports Utilizados

Cada pasta possui um `index.js` para facilitar imports:

```javascript
// Exemplo de uso:
import { Botao, Titulo, BotaoVoltar } from '../../components/common';
import { BarraDeInput, BarraPesquisa } from '../../components/forms';
import { PaginaLogin, PaginaCadastro } from '../screens/auth';
```

## Benefícios da Nova Estrutura

1. **Organização clara** - Cada tipo de arquivo em sua pasta
2. **Imports simplificados** - Usando barrel exports
3. **Componentes reutilizáveis** - ModalImagemTelaCheia usado em múltiplas telas
4. **Separação de responsabilidades** - Serviços, contextos e hooks separados
5. **Fácil manutenção** - Estrutura padronizada e documentada


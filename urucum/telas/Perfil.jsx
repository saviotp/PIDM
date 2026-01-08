import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import estilosGlobais from '../estilos/estilosGlobais';

export default function Perfil({ nome, fotoCapa, fotoPerfil }) {
    return (
        <Pressable>
            <View style={estilosGlobais.perfilTela_adicionarFotoCapa}>
                <Image source={{ uri: fotoCapa }} style={estilosGlobais.perfilTela_imagemCapa} />
            </View>

            <View style={estilosGlobais.perfilTela_adicionarFotoPerfil}>
                <Image source={{ uri: fotoPerfil }} style={estilosGlobais.perfilTela_imagemPerfil} />
            </View>

            <Text style={estilosGlobais.perfilTela_nomeArtista}>{nome}</Text>
        </Pressable>
    );
}
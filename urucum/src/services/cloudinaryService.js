// Serviço de upload de imagens para o Cloudinary

const CLOUDINARY_CLOUD_NAME = 'dcgebue3x';
// IMPORTANTE: Você precisa criar um upload preset "unsigned" no dashboard do Cloudinary:
// 1. Acesse https://console.cloudinary.com/settings/upload
// 2. Clique em "Add upload preset"
// 3. Defina o nome como "urucum_upload"
// 4. Defina "Signing Mode" como "Unsigned"
// 5. Salve
const CLOUDINARY_UPLOAD_PRESET = 'urucum_upload';

/**
 * Faz upload de uma imagem para o Cloudinary
 * @param {string} imageUri - URI local da imagem
 * @param {string} folder - Pasta de destino no Cloudinary (ex: 'perfil', 'obras', 'colecoes')
 * @returns {Promise<{sucesso: boolean, url?: string, erro?: string}>}
 */
export async function uploadImagem(imageUri, folder = 'geral') {
    try {
        // Prepara o FormData para o upload
        const formData = new FormData();
        
        // Extrai a extensão do arquivo
        const uriParts = imageUri.split('.');
        const fileType = uriParts[uriParts.length - 1] || 'jpg';
        
        formData.append('file', {
            uri: imageUri,
            type: `image/${fileType === 'jpg' ? 'jpeg' : fileType}`,
            name: `upload_${Date.now()}.${fileType}`,
        });
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', `urucum/${folder}`);
        
        // Faz o upload para o Cloudinary
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );
        
        const data = await response.json();
        
        if (data.secure_url) {
            return { 
                sucesso: true, 
                url: data.secure_url,
                publicId: data.public_id,
            };
        } else {
            console.error('Erro no upload:', data);
            return { 
                sucesso: false, 
                erro: data.error?.message || 'Erro ao fazer upload da imagem' 
            };
        }
    } catch (erro) {
        console.error('Erro ao fazer upload para Cloudinary:', erro);
        return { sucesso: false, erro: erro.message };
    }
}

/**
 * Gera uma URL otimizada do Cloudinary
 * @param {string} publicId - ID público da imagem no Cloudinary
 * @param {object} options - Opções de transformação
 * @returns {string} URL otimizada
 */
export function gerarUrlOtimizada(publicId, options = {}) {
    const {
        width = 'auto',
        height = 'auto',
        crop = 'fill',
        quality = 'auto',
        format = 'auto',
    } = options;
    
    const transformations = `w_${width},h_${height},c_${crop},q_${quality},f_${format}`;
    
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}

export default { uploadImagem, gerarUrlOtimizada };

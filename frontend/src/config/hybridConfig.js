// Configuração para modo híbrido com sua API
export const HYBRID_CONFIG = {
    // SUA API REAL - Render.com
    REAL_API: {
        baseURL: 'https://prismaflow-api.onrender.com/api',
        entities: ['auth', 'auth/login'] // Só auth vai para API real
    },

    // JSON Server - Dados mock (todo o resto)
    MOCK_API: {
        baseURL: 'http://localhost:3001',
        entities: ['supplier', 'customer', 'product', 'invoice', 'users'] // Mock
    }
};

// Função para determinar qual API usar
export const getApiForEntity = (entity) => {
    if (HYBRID_CONFIG.REAL_API.entities.includes(entity)) {
        return HYBRID_CONFIG.REAL_API;
    }
    return HYBRID_CONFIG.MOCK_API;
};
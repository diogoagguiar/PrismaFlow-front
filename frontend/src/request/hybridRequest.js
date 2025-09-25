import axios from 'axios';
import { getApiForEntity } from '@/config/hybridConfig';

class HybridRequest {
    async request({ entity, method, endpoint, data, options = {} }) {
        const apiConfig = getApiForEntity(entity);
        const url = `${apiConfig.baseURL}${endpoint}`;

        console.log(`🌐 [${apiConfig.baseURL.includes('render.com') ? 'API REAL' : 'JSON SERVER'}] ${method} ${url}`);

        try {
            const config = {
                method,
                url,
                data,
                params: options,
                timeout: 30000 // 10 segundos para API remota
            };

            // Adiciona token JWT apenas para API real
            if (apiConfig.baseURL.includes('render.com')) {
                const authState = localStorage.getItem('auth');
                if (authState) {
                    const auth = JSON.parse(authState);
                    if (auth?.current?.token) {
                        config.headers = {
                            'Authorization': `Bearer ${auth.current.token}`,
                            'Content-Type': 'application/json'
                        };
                    }
                }
            }

            const response = await axios(config);

            // SUA API REAL retorna { status, message, data, token }
            if (apiConfig.baseURL.includes('render.com')) {
                console.log('✅ Resposta API real:', response.data);
                return response.data;
            }

            // JSON Server retorna dados diretamente
            return response.data;

        } catch (error) {
            console.error(`❌ Erro na requisição para ${url}:`, error.response?.data || error.message);

            // Tratamento específico para API remota
            if (error.code === 'ECONNABORTED') {
                throw new Error('Timeout - API demorou muito para responder');
            }

            throw error;
        }
    }

    // Métodos compatíveis
    async list({ entity, options = {} }) {
        return this.request({
            entity,
            method: 'GET',
            endpoint: `/${entity}`,
            options
        });
    }

    async post({ entity, jsonData }) {
        return this.request({
            entity,
            method: 'POST',
            endpoint: `/${entity}`,
            data: jsonData
        });
    }

    async get({ entity, id }) {
        return this.request({
            entity,
            method: 'GET',
            endpoint: id ? `/${entity}/${id}` : `/${entity}`
        });
    }

    async patch({ entity, id, jsonData }) {
        return this.request({
            entity,
            method: 'PATCH',
            endpoint: `/${entity}/${id}`,
            data: jsonData
        });
    }

    async delete({ entity, id }) {
        return this.request({
            entity,
            method: 'DELETE',
            endpoint: `/${entity}/${id}`
        });
    }
}

export const hybridRequest = new HybridRequest();
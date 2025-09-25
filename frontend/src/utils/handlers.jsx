import { message } from 'antd';

export const successHandler = (response, options = {}) => {
    const { notifyOnSuccess = true, notifyOnFailed = true } = options;

    if (response?.status >= 200 && response.status < 300) {
        if (notifyOnSuccess) {
            message.success(response.data?.message || 'Operação realizada com sucesso');
        }
        return response.data;
    } else {
        if (notifyOnFailed) {
            message.error(response.data?.message || 'Erro na operação');
        }
        throw new Error(response.data?.message || 'Erro na operação');
    }
};

export const errorHandler = (error) => {
    console.error('❌ Error:', error);

    const errorMessage = error.response?.data?.message ||
        error.message ||
        'Erro de conexão';

    message.error(errorMessage);
    throw error;
};
import { request } from '@/request';

export const authService = {
  async login({ loginData }) {
    // Adaptado para API Spring Boot
    const response = await request.post({
      entity: 'auth/login',
      jsonData: loginData
    });

    return {
      success: true,
      result: {
        token: response.token,
        user: response.data
      }
    };
  },

  async register({ registerData }) {
    const response = await request.post({
      entity: 'auth/register',
      jsonData: registerData
    });

    return {
      success: true,
      result: response.data
    };
  },

  async logout() {
    return { success: true };
  }
};
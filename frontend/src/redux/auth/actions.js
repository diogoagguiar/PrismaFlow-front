import * as actionTypes from './types';
import * as authService from '@/auth';
import { request } from '@/request';


export const login =
  ({ loginData }) =>
    async (dispatch) => {
      dispatch({
        type: actionTypes.REQUEST_LOADING,
      });

      try {
        console.log('🔐 Tentando login na API real...', loginData);

        // ✅ SUA API REAL - Spring Boot
        const response = await request.post({
          entity: 'auth/login',
          jsonData: {
            username: loginData.email, // Ajuste conforme seu form
            password: loginData.password
          }
        });

        console.log('📨 Resposta da sua API:', response);

        // Estrutura da SUA API: { status, message, data, token }
        if (response.token) {
          const auth_state = {
            current: {
              token: response.token,
              user: response.data // { id, username, email, role }
            },
            isLoggedIn: true,
            isLoading: false,
            isSuccess: true,
          };

          window.localStorage.setItem('auth', JSON.stringify(auth_state));
          window.localStorage.removeItem('isLogout');

          dispatch({
            type: actionTypes.REQUEST_SUCCESS,
            payload: auth_state.current,
          });

          console.log('✅ Login realizado com sua API real!');
        } else {
          throw new Error(response.message || 'Login falhou - sem token retornado');
        }
      } catch (error) {
        console.error('❌ Erro no login com sua API:', error);

        // Fallback: tenta login mock se API real falhar
        console.log('🔄 Tentando fallback para JSON Server...');
        // ... código de fallback opcional

        dispatch({
          type: actionTypes.REQUEST_FAILED,
        });
      }
    };

export const register =
  ({ registerData }) =>
    async (dispatch) => {
      dispatch({
        type: actionTypes.REQUEST_LOADING,
      });

      try {
        console.log('👤 Tentando registro na API real...');

        const response = await request.post({
          entity: 'auth/register',
          jsonData: {
            username: registerData.username,
            email: registerData.email,
            password: registerData.password,
            role: registerData.role || 'EMPLOYEE'
          }
        });

        if (response.token) {
          const auth_state = {
            current: {
              token: response.token,
              user: response.data
            },
            isLoggedIn: true,
            isLoading: false,
            isSuccess: true,
          };

          window.localStorage.setItem('auth', JSON.stringify(auth_state));

          dispatch({
            type: actionTypes.REQUEST_SUCCESS,
            payload: auth_state.current,
          });

          console.log('✅ Registro realizado com sua API real!');
        } else {
          dispatch({ type: actionTypes.REQUEST_FAILED });
        }
      } catch (error) {
        console.error('❌ Erro no registro:', error);
        dispatch({ type: actionTypes.REQUEST_FAILED });
      }
    };

export const verify =
  ({ userId, emailToken }) =>
    async (dispatch) => {
      dispatch({
        type: actionTypes.REQUEST_LOADING,
      });
      const data = await authService.verify({ userId, emailToken });

      if (data.success === true) {
        const auth_state = {
          current: data.result,
          isLoggedIn: true,
          isLoading: false,
          isSuccess: true,
        };
        window.localStorage.setItem('auth', JSON.stringify(auth_state));
        window.localStorage.removeItem('isLogout');
        dispatch({
          type: actionTypes.REQUEST_SUCCESS,
          payload: data.result,
        });
      } else {
        dispatch({
          type: actionTypes.REQUEST_FAILED,
        });
      }
    };

export const resetPassword =
  ({ resetPasswordData }) =>
    async (dispatch) => {
      dispatch({
        type: actionTypes.REQUEST_LOADING,
      });
      const data = await authService.resetPassword({ resetPasswordData });

      if (data.success === true) {
        const auth_state = {
          current: data.result,
          isLoggedIn: true,
          isLoading: false,
          isSuccess: true,
        };
        window.localStorage.setItem('auth', JSON.stringify(auth_state));
        window.localStorage.removeItem('isLogout');
        dispatch({
          type: actionTypes.REQUEST_SUCCESS,
          payload: data.result,
        });
      } else {
        dispatch({
          type: actionTypes.REQUEST_FAILED,
        });
      }
    };

export const logout = () => async (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT_SUCCESS,
  });
  const result = window.localStorage.getItem('auth');
  const tmpAuth = JSON.parse(result);
  const settings = window.localStorage.getItem('settings');
  const tmpSettings = JSON.parse(settings);
  window.localStorage.removeItem('auth');
  window.localStorage.removeItem('settings');
  window.localStorage.setItem('isLogout', JSON.stringify({ isLogout: true }));
  const data = await authService.logout();
  if (data.success === false) {
    const auth_state = {
      current: tmpAuth,
      isLoggedIn: true,
      isLoading: false,
      isSuccess: true,
    };
    window.localStorage.setItem('auth', JSON.stringify(auth_state));
    window.localStorage.setItem('settings', JSON.stringify(tmpSettings));
    window.localStorage.removeItem('isLogout');
    dispatch({
      type: actionTypes.LOGOUT_FAILED,
      payload: data.result,
    });
  } else {
    // on lgout success
  }
};

export const updateProfile =
  ({ entity, jsonData }) =>
    async (dispatch) => {
      let data = await request.updateAndUpload({ entity, id: '', jsonData });

      if (data.success === true) {
        dispatch({
          type: actionTypes.REQUEST_SUCCESS,
          payload: data.result,
        });
        const auth_state = {
          current: data.result,
          isLoggedIn: true,
          isLoading: false,
          isSuccess: true,
        };
        window.localStorage.setItem('auth', JSON.stringify(auth_state));
      }
    };

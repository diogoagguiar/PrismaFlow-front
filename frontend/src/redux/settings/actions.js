import * as actionTypes from './types';
import { request } from '@/request';

// Função auxiliar para formatar os dados de settings recebidos da API
const dispatchSettingsData = (datas) => {
  const settingsCategory = {};
  // Garante que a função não falhe se a resposta não for um array
  if (!Array.isArray(datas)) return settingsCategory;

  datas.map((data) => {
    settingsCategory[data.settingCategory] = {
      ...settingsCategory[data.settingCategory],
      [data.settingKey]: data.settingValue,
    };
  });

  return settingsCategory;
};

export const settingsAction = {
  // Ação para resetar o estado para o valor inicial
  resetState: () => (dispatch) => {
    dispatch({
      type: actionTypes.RESET_STATE,
    });
  },

  // Ação para atualizar a moeda (ex: BRL, USD)
  updateCurrency:
    ({ data }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.UPDATE_CURRENCY,
          payload: data,
        });
      },

  // Ação para buscar a lista inicial de configurações
  list:
    ({ entity }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.REQUEST_LOADING,
        });
        try {
          let data = await request.list({ entity });
          // ✅ LÓGICA CORRIGIDA: Verifica se os dados foram recebidos
          if (data) {
            const payload = dispatchSettingsData(data);
            window.localStorage.setItem('settings', JSON.stringify(payload));
            dispatch({
              type: actionTypes.REQUEST_SUCCESS,
              payload,
            });
          } else {
            dispatch({
              type: actionTypes.REQUEST_FAILED,
            });
          }
        } catch (error) {
          dispatch({
            type: actionTypes.REQUEST_FAILED,
          });
        }
      },

  // Ação para atualizar uma única configuração
  update:
    ({ entity, settingKey, jsonData }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.REQUEST_LOADING,
        });
        try {
          let updateData = await request.patch({
            entity: entity + '/updateBySettingKey/' + settingKey,
            jsonData,
          });
          // ✅ LÓGICA CORRIGIDA: Verifica se a atualização foi bem-sucedida
          if (updateData) {
            // Após atualizar, busca a lista completa novamente
            let listData = await request.list({ entity });
            if (listData) {
              const payload = dispatchSettingsData(listData);
              window.localStorage.setItem('settings', JSON.stringify(payload));
              dispatch({
                type: actionTypes.REQUEST_SUCCESS,
                payload,
              });
            } else {
              dispatch({ type: actionTypes.REQUEST_FAILED });
            }
          } else {
            dispatch({
              type: actionTypes.REQUEST_FAILED,
            });
          }
        } catch (error) {
          dispatch({ type: actionTypes.REQUEST_FAILED });
        }
      },

  // Ação para atualizar múltiplas configurações de uma vez
  updateMany:
    ({ entity, jsonData }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.REQUEST_LOADING,
        });
        try {
          let updateData = await request.patch({
            entity: entity + '/updateManySetting',
            jsonData,
          });
          // ✅ LÓGICA CORRIGIDA: Verifica se a atualização foi bem-sucedida
          if (updateData) {
            let listData = await request.list({ entity });
            if (listData) {
              const payload = dispatchSettingsData(listData);
              window.localStorage.setItem('settings', JSON.stringify(payload));
              dispatch({
                type: actionTypes.REQUEST_SUCCESS,
                payload,
              });
            } else {
              dispatch({ type: actionTypes.REQUEST_FAILED });
            }
          } else {
            dispatch({
              type: actionTypes.REQUEST_FAILED,
            });
          }
        } catch (error) {
          dispatch({ type: actionTypes.REQUEST_FAILED });
        }
      },

  // Ação para fazer upload de um ficheiro relacionado a uma configuração
  upload:
    ({ entity, settingKey, jsonData }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.REQUEST_LOADING,
        });
        try {
          let uploadData = await request.upload({
            entity: entity,
            id: settingKey,
            jsonData,
          });
          // ✅ LÓGICA CORRIGIDA: Verifica se o upload foi bem-sucedido
          if (uploadData) {
            let listData = await request.list({ entity });
            if (listData) {
              const payload = dispatchSettingsData(listData);
              window.localStorage.setItem('settings', JSON.stringify(payload));
              dispatch({
                type: actionTypes.REQUEST_SUCCESS,
                payload,
              });
            } else {
              dispatch({ type: actionTypes.REQUEST_FAILED });
            }
          } else {
            dispatch({
              type: actionTypes.REQUEST_FAILED,
            });
          }
        } catch (error) {
          dispatch({ type: actionTypes.REQUEST_FAILED });
        }
      },
};
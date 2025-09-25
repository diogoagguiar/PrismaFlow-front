import * as actionTypes from './types';
import { request } from '@/request';

export const crud = {
  resetState:
    (props = {}) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.RESET_STATE,
        });
      },
  resetAction:
    ({ actionType }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.RESET_ACTION,
          keyState: actionType,
          payload: null,
        });
      },
  currentItem:
    ({ data }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.CURRENT_ITEM,
          payload: { ...data },
        });
      },
  currentAction:
    ({ actionType, data }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.CURRENT_ACTION,
          keyState: actionType,
          payload: { ...data },
        });
      },
  list:
    ({ entity, options = { page: 1, items: 10 } }) =>
      async (dispatch) => {
        console.log('🚀 CRUD ACTION LIST - Iniciando', { entity, options });

        dispatch({
          type: actionTypes.REQUEST_LOADING,
          keyState: 'list',
        });

        try {
          let data = await request.list({ entity, options });

          console.log('📦 Dados recebidos do request.list:', {
            entity: entity,
            data: data,
            isArray: Array.isArray(data),
            length: Array.isArray(data) ? data.length : 'N/A'
          });

          if (data && Array.isArray(data)) {
            const result = {
              items: data, // ✅ Já é array - use diretamente
              pagination: {
                current: options?.page || 1,
                pageSize: options?.items || 10,
                total: data.length,
              },
            };

            console.log('🎯 Payload para dispatch:', result);

            dispatch({
              type: actionTypes.REQUEST_SUCCESS,
              keyState: 'list',
              payload: result,
            });

            console.log('✅ Dispatch realizado com sucesso!');

          } else {
            console.warn('⚠️ Dados não são array ou estão vazios:', data);
            dispatch({
              type: actionTypes.REQUEST_FAILED,
              keyState: 'list'
            });
          }
        } catch (error) {
          console.error('❌ Erro na action list:', error);
          dispatch({
            type: actionTypes.REQUEST_FAILED,
            keyState: 'list'
          });
        }
      },
  create:
    ({ entity, jsonData, withUpload = false }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.REQUEST_LOADING,
          keyState: 'create',
        });
        try {
          let data = null;
          if (withUpload) {
            data = await request.createAndUpload({ entity, jsonData });
          } else {
            data = await request.create({ entity, jsonData });
          }
          // ✅ LÓGICA CORRIGIDA
          if (data) {
            dispatch({
              type: actionTypes.REQUEST_SUCCESS,
              keyState: 'create',
              payload: data,
            });
            dispatch({
              type: actionTypes.CURRENT_ITEM,
              payload: data,
            });
          } else {
            dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'create' });
          }
        } catch (error) {
          dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'create' });
        }
      },
  read:
    ({ entity, id }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.REQUEST_LOADING,
          keyState: 'read',
        });
        try {
          let data = await request.read({ entity, id });
          // ✅ LÓGICA CORRIGIDA
          if (data) {
            dispatch({
              type: actionTypes.CURRENT_ITEM,
              payload: data,
            });
            dispatch({
              type: actionTypes.REQUEST_SUCCESS,
              keyState: 'read',
              payload: data,
            });
          } else {
            dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'read' });
          }
        } catch (error) {
          dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'read' });
        }
      },
  update:
    ({ entity, id, jsonData, withUpload = false }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.REQUEST_LOADING,
          keyState: 'update',
        });
        try {
          let data = null;
          if (withUpload) {
            data = await request.updateAndUpload({ entity, id, jsonData });
          } else {
            data = await request.update({ entity, id, jsonData });
          }
          // ✅ LÓGICA CORRIGIDA
          if (data) {
            dispatch({
              type: actionTypes.REQUEST_SUCCESS,
              keyState: 'update',
              payload: data,
            });
            dispatch({
              type: actionTypes.CURRENT_ITEM,
              payload: data,
            });
          } else {
            dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'update' });
          }
        } catch (error) {
          dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'update' });
        }
      },

  delete:
    ({ entity, id }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.REQUEST_LOADING,
          keyState: 'delete',
        });
        try {
          let data = await request.delete({ entity, id });
          if (data) {
            dispatch({
              type: actionTypes.REQUEST_SUCCESS,
              keyState: 'delete',
              payload: data,
            });
          } else {
            dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'delete' });
          }
        } catch (error) {
          dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'delete' });
        }
      },

  search:
    ({ entity, options = {} }) =>
      async (dispatch) => {
        dispatch({
          type: actionTypes.REQUEST_LOADING,
          keyState: 'search',
        });
        try {
          let data = await request.search({ entity, options });
          // ✅ LÓGICA CORRIGIDA
          if (data) {
            dispatch({
              type: actionTypes.REQUEST_SUCCESS,
              keyState: 'search',
              payload: data,
            });
          } else {
            dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'search' });
          }
        } catch (error) {
          dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'search' });
        }
      },
};
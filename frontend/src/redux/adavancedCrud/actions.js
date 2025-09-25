import * as actionTypes from './types';
import { request } from '@/request';

export const erp = {
  resetState: () => (dispatch) => {
    dispatch({
      type: actionTypes.RESET_STATE,
    });
  },
  resetAction:
    ({ actionType }) =>
      (dispatch) => {
        dispatch({
          type: actionTypes.RESET_ACTION,
          keyState: actionType,
          payload: null,
        });
      },
  currentItem:
    ({ data }) =>
      (dispatch) => {
        dispatch({
          type: actionTypes.CURRENT_ITEM,
          payload: { ...data },
        });
      },
  currentAction:
    ({ actionType, data }) =>
      (dispatch) => {
        dispatch({
          type: actionTypes.CURRENT_ACTION,
          keyState: actionType,
          payload: { ...data },
        });
      },
  list:
    ({ entity, options = { page: 1, items: 10 } }) =>
      async (dispatch) => {
        dispatch({ type: actionTypes.REQUEST_LOADING, keyState: 'list' });
        try {
          let data = await request.list({ entity, options });
          // ✅ LÓGICA CORRIGIDA
          if (data) {
            const result = {
              items: data,
              pagination: {
                current: options?.page,
                pageSize: options?.items,
                total: data.length,
              },
            };
            dispatch({
              type: actionTypes.REQUEST_SUCCESS,
              keyState: 'list',
              payload: result,
            });
          } else {
            dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'list' });
          }
        } catch (error) {
          dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'list' });
        }
      },
  create:
    ({ entity, jsonData }) =>
      async (dispatch) => {
        dispatch({ type: actionTypes.REQUEST_LOADING, keyState: 'create' });
        try {
          let data = await request.create({ entity, jsonData });
          // ✅ LÓGICA CORRIGIDA
          if (data) {
            dispatch({
              type: actionTypes.REQUEST_SUCCESS,
              keyState: 'create',
              payload: data,
            });
            dispatch({ type: actionTypes.CURRENT_ITEM, payload: data });
          } else {
            dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'create' });
          }
        } catch (error) {
          dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'create' });
        }
      },
  createInvoice:
    ({ entity, jsonData }) =>
      async (dispatch) => {
        dispatch({ type: actionTypes.REQUEST_LOADING, keyState: 'createInvoice' });
        try {
          let data = await request.create({ entity, jsonData });
          // ✅ LÓGICA CORRIGIDA
          if (data) {
            dispatch({
              type: actionTypes.REQUEST_SUCCESS,
              keyState: 'createInvoice',
              payload: data,
            });
            if (data.invoice) {
              dispatch({ type: actionTypes.CURRENT_ITEM, payload: data.invoice });
            }
          } else {
            dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'createInvoice' });
          }
        } catch (error) {
          dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'createInvoice' });
        }
      },
  read:
    ({ entity, id }) =>
      async (dispatch) => {
        dispatch({ type: actionTypes.REQUEST_LOADING, keyState: 'read' });
        try {
          let data = await request.read({ entity, id });
          // ✅ LÓGICA CORRIGIDA
          if (data) {
            dispatch({ type: actionTypes.CURRENT_ITEM, payload: data });
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
    ({ entity, id, jsonData }) =>
      async (dispatch) => {
        dispatch({ type: actionTypes.REQUEST_LOADING, keyState: 'update' });
        try {
          let data = await request.update({ entity, id, jsonData });
          // ✅ LÓGICA CORRIGIDA
          if (data) {
            dispatch({
              type: actionTypes.REQUEST_SUCCESS,
              keyState: 'update',
              payload: data,
            });
            dispatch({ type: actionTypes.CURRENT_ITEM, payload: data });
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
        dispatch({ type: actionTypes.REQUEST_LOADING, keyState: 'delete' });
        try {
          let data = await request.delete({ entity, id });
          // ✅ LÓGICA CORRIGIDA
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
    ({ entity, options }) =>
      async (dispatch) => {
        dispatch({ type: actionTypes.REQUEST_LOADING, keyState: 'search' });
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

  summary:
    ({ entity, options }) =>
      async (dispatch) => {
        dispatch({ type: actionTypes.REQUEST_LOADING, keyState: 'summary' });
        try {
          // MUDANÇA IMPORTANTE: A chamada para 'summary' foi substituída por 'list'
          let data = await request.list({ entity, options });
          // ✅ LÓGICA CORRIGIDA
          if (data) {
            dispatch({
              type: actionTypes.REQUEST_SUCCESS,
              keyState: 'summary',
              payload: data, // Usamos a lista completa como resumo
            });
          } else {
            dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'summary' });
          }
        } catch (error) {
          dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'summary' });
        }
      },

  mail:
    ({ entity, jsonData }) =>
      async (dispatch) => {
        dispatch({ type: actionTypes.REQUEST_LOADING, keyState: 'mail' });
        try {
          let data = await request.mail({ entity, jsonData });
          // ✅ LÓGICA CORRIGIDA
          if (data) {
            dispatch({
              type: actionTypes.REQUEST_SUCCESS,
              keyState: 'mail',
              payload: data,
            });
          } else {
            dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'mail' });
          }
        } catch (error) {
          dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'mail' });
        }
      },

  convert:
    ({ entity, id }) =>
      async (dispatch) => {
        // Adicionado try-catch e dispatch de estado para consistência
        dispatch({ type: actionTypes.REQUEST_LOADING, keyState: 'convert' });
        try {
          await request.convert({ entity, id });
          dispatch({ type: actionTypes.REQUEST_SUCCESS, keyState: 'convert' });
        } catch (error) {
          dispatch({ type: actionTypes.REQUEST_FAILED, keyState: 'convert' });
        }
      },
};
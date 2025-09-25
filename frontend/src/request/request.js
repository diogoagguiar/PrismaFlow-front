import { hybridRequest } from './hybridRequest';

// Mantém interface compatível
export const request = {
  list: (params) => hybridRequest.list(params),
  create: ({ entity, jsonData }) => hybridRequest.post({ entity, jsonData }),
  read: ({ entity, id }) => hybridRequest.get({ entity, id }),
  update: ({ entity, id, jsonData }) => hybridRequest.patch({ entity, id, jsonData }),
  delete: ({ entity, id }) => hybridRequest.delete({ entity, id }),
  search: (params) => hybridRequest.list(params),
  post: (params) => hybridRequest.post(params),
  get: (params) => hybridRequest.get(params),
  patch: (params) => hybridRequest.patch(params)
};

export default request;
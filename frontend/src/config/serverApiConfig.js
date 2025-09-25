// Mantém apontando para JSON Server como fallback
export const API_BASE_URL = 'http://localhost:3001/';
export const BASE_URL = 'http://localhost:3001/';

// ... resto do código

// ... resto do código mantido

// export const API_BASE_URL =
//     import.meta.env.PROD || import.meta.env.VITE_DEV_REMOTE == 'remote'
//         ? import.meta.env.VITE_BACKEND_SERVER + 'api/'
//         // Alterado para apontar para o json-server
//         : 'http://localhost:3001/';

// export const BASE_URL =
//     import.meta.env.PROD || import.meta.env.VITE_DEV_REMOTE
//         ? import.meta.env.VITE_BACKEND_SERVER
//         // Alterado para apontar para o json-server
//         : 'http://localhost:3001/';

export const WEBSITE_URL = import.meta.env.PROD
    ? 'http://cloud.idurarapp.com/'
    : 'http://localhost:3000/';

export const DOWNLOAD_BASE_URL =
    import.meta.env.PROD || import.meta.env.VITE_DEV_REMOTE
        ? import.meta.env.VITE_BACKEND_SERVER + 'download/'
        // Alterado para apontar para o json-server (geralmente não usado pelo json-server, mas alterado para consistência)
        : 'http://localhost:3001/download/';

export const ACCESS_TOKEN_NAME = 'x-auth-token';

export const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL;
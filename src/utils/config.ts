const env = import.meta.env;

const config = {
    api_url: env.VITE_API_URL || '',
    api_timeout: Number(env.VITE_API_TIMEOUT) || 20000,
    default_language: env.VITE_DEFAULT_LANGUAGE || 'en',
    dom_root_id: '__AJ_APP_ROOT__',
    asset_path: env.BASE_URL || '/',
};

export default config;

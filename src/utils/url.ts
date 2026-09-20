import config from './config';

export function removeMultipleSlashes(str: string) {
    return str.replace(/\/+/g, '/');
}

export function assetUrl(path: string) {
    return removeMultipleSlashes(`/${config.asset_path}/${path}`);
}

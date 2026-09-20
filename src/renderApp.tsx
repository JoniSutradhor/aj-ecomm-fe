import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import config from 'utils/config';
import './index.scss';
import App from 'core_components/App';

const container = document.getElementById(config.dom_root_id) as HTMLElement;
const root = createRoot(container);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);

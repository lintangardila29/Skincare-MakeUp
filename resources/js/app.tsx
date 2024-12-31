import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import Layout from './Layout';

const appName = import.meta.env.VITE_APP_NAME || 'Kabupaten Pekalongan';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const page = resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        );

        return page.then((module: any) => {
            const PageComponent = module.default;

            PageComponent.layout ??= (page: any) => <Layout>{page}</Layout>;

            return PageComponent;
        });
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: 'blue',
    },
});

import localforage from 'localforage';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import './style.css';

const initApp = async () => {
    try {
        await localforage.ready();
        const isDark = await localforage.getItem<boolean>('theme');
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else if (isDark === false) {
            document.documentElement.classList.remove('dark');
        }

        const app = createApp(App);
        const pinia = createPinia();

        app.use(pinia);
        app.use(router);

        app.mount('#app');

    } catch (error) {
        console.error('Error initializing app:', error);

        // Fallback initialization --> incase if something goes wrong
        const app = createApp(App);
        app.use(createPinia());
        app.use(router);
        app.mount('#app');
    }
}

initApp()
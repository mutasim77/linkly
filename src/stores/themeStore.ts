import { defineStore } from 'pinia'
import { ref } from 'vue'
import { saveTheme, getTheme } from '../lib/storage'

export const useThemeStore = defineStore('theme', () => {
    const isDark = ref<boolean>(false)

    const toggleTheme = async (): Promise<void> => {
        isDark.value = !isDark.value

        // Perhaps this is the correct way to do it(for now)!
        if (isDark.value) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

        await saveTheme(isDark.value)
    }

    const initTheme = async (): Promise<void> => {
        const savedTheme = await getTheme();

        if (savedTheme !== null) {
            isDark.value = savedTheme
        } else {
            isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
            await saveTheme(isDark.value)
        }

        if (isDark.value) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    return { isDark, toggleTheme, initTheme }
});
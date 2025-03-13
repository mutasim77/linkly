<template>
  <div :class="{ 'dark': isDarkTheme }" class="min-h-screen">
    <div class="min-h-screen bg-background text-foreground transition-colors duration-300">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useThemeStore } from './stores/themeStore';

const themeStore = useThemeStore();
const isDarkTheme = computed(() => themeStore.isDark);

watch(isDarkTheme, (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, { immediate: true });

onMounted(() => {
  themeStore.initTheme();
})
</script>
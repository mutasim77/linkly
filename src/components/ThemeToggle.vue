<template>
  <Button variant="ghost" size="icon" @click="toggleTheme" class="relative h-9 w-9 rounded-full">
    <div class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <SunIcon class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </div>

    <span class="sr-only">Toggle theme</span>
  </Button>
</template>

<script setup lang="ts">
import { useThemeStore } from '../stores/themeStore';
import { SunIcon, MoonIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';

const themeStore = useThemeStore();
const toggleTheme = () => themeStore.toggleTheme();
</script>
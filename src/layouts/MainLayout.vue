<template>
    <div class="flex flex-col min-h-screen">
        <AppHeader />
        <main class="flex-grow py-8">
            <div class="max-w-4xl mx-auto px-4 sm:px-6">
                <router-view />
            </div>
        </main>
        <footer
            class="border-t bg-muted/30 py-6 text-sm text-muted-foreground/70 flex items-center text-center gap-2 justify-center">
            <span class="flex items-center gap-1">
                Made with
                <HeartIcon class="h-3 w-3 text-primary animate-pulse" />
                by
                <a href="http://mutasim.top" class="text-primary" target="_blank">Mut</a>
            </span>
        </footer>
    </div>
</template>

<script setup lang="ts">
import AppHeader from "../components/AppHeader.vue";
import { HeartIcon } from "lucide-vue-next";
</script>

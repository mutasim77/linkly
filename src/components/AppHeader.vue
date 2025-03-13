<template>
  <header
    class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center gap-2 group">
            <div
              class="flex items-center justify-center h-8 w-8 rounded-md bg-primary text-primary-foreground group-hover:scale-110 transition-transform duration-300">
              <LinkIcon class="h-5 w-5" />
            </div>
            <span class="font-bold text-xl text-foreground">
              <span class="text-primary">Link</span>ly
            </span>
          </router-link>
        </div>

        <div class="flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger class="h-9 bg-transparent focus:bg-transparent data-[state=open]:bg-muted/50">
                  Menu
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul class="grid w-[200px] gap-1 p-2">
                    <NavigationMenuLink asChild>
                      <router-link to="/"
                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        :class="{ 'bg-accent/50': $route.name === 'home' }">
                        <div class="flex items-center gap-2">
                          <HomeIcon class="h-4 w-4" />
                          <span class="text-sm font-medium">Home</span>
                        </div>
                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Manage your links
                        </p>
                      </router-link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <router-link to="/about"
                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        :class="{ 'bg-accent/50': $route.name === 'about' }">
                        <div class="flex items-center gap-2">
                          <InfoIcon class="h-4 w-4" />
                          <span class="text-sm font-medium">About</span>
                        </div>
                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Learn about Linkly
                        </p>
                      </router-link>
                    </NavigationMenuLink>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <ThemeToggle />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import ThemeToggle from './ThemeToggle.vue';
import { LinkIcon, HomeIcon, InfoIcon } from 'lucide-vue-next';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';

const $route = useRoute();
</script>
<template>
  <Card class="overflow-hidden group hover:shadow-lg transition-all duration-300 flex md:flex-row flex-col h-[235px]">
    <div class="relative overflow-hidden md:w-1/3 w-full h-48 md:h-auto shrink-0">
      <div class="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent z-10"></div>

      <img v-if="ogData.image" :src="ogData.image" :alt="link.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        @error="handleImageError" loading="lazy" />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/60">
        <div class="rounded-full p-3 bg-background">
          <LinkIcon class="h-6 w-6 text-primary opacity-70" />
        </div>
      </div>

      <div
        class="absolute top-3 left-3 z-20 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs flex items-center gap-1.5 max-w-[calc(100%-24px)]">
        <div v-if="isYoutubeLink" class="text-red-500">
          <YoutubeIcon class="h-3.5 w-3.5" />
        </div>
        <img v-else :src="faviconUrl" alt="favicon" class="h-3.5 w-3.5 rounded-sm" @error="handleFaviconError" />
        <span class="truncate font-medium">{{ getDomain(link.url) }}</span>
      </div>

      <div v-if="isYoutubeLink"
        class="absolute inset-0 flex items-center justify-center z-20 opacity-80 group-hover:opacity-90 transition-opacity">
        <div class="h-12 w-12 rounded-full bg-red-600 flex items-center justify-center">
          <PlayIcon class="h-6 w-6 text-white" />
        </div>
      </div>
    </div>

    <div class="flex flex-col flex-grow relative">
      <CardContent class="flex-grow flex flex-col p-5">
        <div>
          <h3 class="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {{ link.name }}
          </h3>
          <p class="text-sm text-muted-foreground truncate mt-1 mb-1">
            {{ formatUrl(link.url) }}
          </p>
        </div>

        <p v-if="ogData.description" class="text-sm text-muted-foreground mt-2 line-clamp-2">
          {{ ogData.description }}
        </p>

        <div class="mt-auto pt-3">
          <div v-if="link.tags && link.tags.length > 0" class="flex flex-wrap gap-1.5 mb-2">
            <Badge v-for="tag in link.tags" :key="tag" variant="secondary"
              class="cursor-pointer hover:bg-primary/20 transition-colors text-xs" @click="$emit('tag-click', tag)">
              {{ tag }}
            </Badge>
          </div>

          <div class="text-xs text-muted-foreground mt-2">
            Added {{ formatDate(link.createdAt) }}
          </div>
        </div>
      </CardContent>

      <div class="flex justify-between items-center px-5 py-3 bg-muted/10 border-t">
        <Button variant="ghost" size="sm" @click="copyToClipboard(link.url)" class="gap-1 text-xs h-8">
          <CheckIcon v-if="copySuccess" class="h-3.5 w-3.5 text-green-500" />
          <CopyIcon v-else class="h-3.5 w-3.5" />
          {{ copySuccess ? 'Copied' : 'Copy' }}
        </Button>

        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" @click="$emit('edit', link)" class="gap-1 text-xs h-8">
            <PencilIcon class="h-3.5 w-3.5" />
            Edit
          </Button>

          <Button variant="default" size="sm" class="gap-1 text-xs h-8" as="a" :href="link.url" target="_blank"
            rel="noopener noreferrer">
            <ExternalLinkIcon class="h-3.5 w-3.5" />
            Visit
          </Button>
        </div>
      </div>

      <Button variant="ghost" size="icon" @click="$emit('delete', link.id)"
        class="absolute top-3 right-3 h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
        <TrashIcon class="h-4 w-4" />
        <span class="sr-only">Delete</span>
      </Button>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Link } from '../types';
import {
  Card,
  CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  PencilIcon,
  TrashIcon,
  ExternalLinkIcon,
  CopyIcon,
  CheckIcon,
  LinkIcon,
  YoutubeIcon,
  PlayIcon
} from 'lucide-vue-next';
import {
  getOpenGraphData,
  isYoutubeLink as isYoutube,
  getLinkImage,
  getDomain,
  getFavicon,
  OpenGraphData
} from '../lib/openGraph';
import { formatDate, formatUrl } from '../lib/utils';

const props = defineProps<{ link: Link }>()

defineEmits<{
  (e: 'edit', link: Link): void
  (e: 'delete', id: string): void
  (e: 'tag-click', tag: string): void
}>()

const copySuccess = ref(false)
const showFallbackImage = ref(false)
const showFallbackFavicon = ref(false)
const ogData = ref<OpenGraphData>({
  title: props.link.name,
  description: '',
  image: getLinkImage(props.link.url, props.link.name),
  url: props.link.url
});

const isYoutubeLink = computed(() => {
  return isYoutube(props.link.url)
});

const faviconUrl = computed(() => {
  if (showFallbackFavicon.value) {
    return '/favicon-fallback.svg'
  }
  return getFavicon(props.link.url)
});

const handleImageError = () => {
  showFallbackImage.value = true
  ogData.value.image = getLinkImage(props.link.url, props.link.name)
}

const handleFaviconError = () => {
  showFallbackFavicon.value = true
}

const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

// Fetch OG -> when component mounts
onMounted(async () => {
  try {
    const data = await getOpenGraphData(props.link.url);
    ogData.value = data;
  } catch (error) {
    console.error('Error fetching OpenGraph data:', error);
  }
});
</script>

<style scoped>
@media (min-width: 768px) {
  .card {
    height: 180px;
  }
}

.card {
  @apply transition-all duration-300;
}

.card:hover {
  @apply shadow-xl translate-y-[-2px];
}
</style>
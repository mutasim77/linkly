<template>
  <Card class="overflow-hidden border-2 border-primary/20 shadow-lg">
    <CardHeader class="bg-muted/30 pb-4">
      <CardTitle class="flex items-center gap-2 text-primary">
        <PlusIcon v-if="!isEditing" class="h-5 w-5" />
        <PencilIcon v-else class="h-5 w-5" />
        {{ isEditing ? 'Edit Link' : 'Add New Link' }}
      </CardTitle>
      <CardDescription>
        {{ isEditing ? 'Update your link details' : 'Add a new link to your collection' }}
      </CardDescription>
    </CardHeader>
    <CardContent class="pt-6">
      <form @submit.prevent="submitForm" class="space-y-5">
        <div class="space-y-2">
          <Label for="name" class="text-sm font-medium">Link Name</Label>
          <Input id="name" v-model="form.name" type="text" placeholder="Give your link a memorable name"
            class="transition-all" :class="{ 'border-primary': form.name }" required />
        </div>

        <div class="space-y-2">
          <Label for="url" class="text-sm font-medium">URL</Label>
          <div class="relative">
            <GlobeIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="url" v-model="form.url" type="url" placeholder="https://example.com" class="pl-10 transition-all"
              :class="{ 'border-primary': form.url }" required />
          </div>
        </div>

        <div class="space-y-2">
          <Label for="tags" class="text-sm font-medium">Tags (comma separated)</Label>
          <div class="relative">
            <TagIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="tags" v-model="tagsInput" type="text" placeholder="research, javascript, tutorial"
              class="pl-10 transition-all" :class="{ 'border-primary': tagsInput }" />
          </div>

          <div v-if="tagsPreview.length > 0" class="pt-2">
            <p class="text-xs text-muted-foreground mb-2">
              {{ tagsPreview.length === 1 ? '1 Tag' : `${tagsPreview.length} Tags` }}:
            </p>
            <div class="flex flex-wrap gap-2">
              <Badge v-for="tag in tagsPreview" :key="tag" variant="secondary" class="animate-in fade-in duration-300">
                {{ tag }}
              </Badge>
            </div>
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter class="flex justify-end space-x-2 border-t bg-muted/20 py-4">
      <Button variant="outline" @click="$emit('cancel')" class="gap-1">
        <XIcon class="h-4 w-4" />
        Cancel
      </Button>
      <Button type="submit" @click="submitForm" class="gap-1">
        <CheckIcon class="h-4 w-4" />
        {{ isEditing ? 'Update' : 'Save' }}
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Link, LinkFormData } from '../types';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  PlusIcon,
  PencilIcon,
  CheckIcon,
  XIcon,
  TagIcon,
  GlobeIcon
} from 'lucide-vue-next';

const props = defineProps<{ link: Link | null }>()

const emit = defineEmits<{
  (e: 'submit', formData: LinkFormData): void
  (e: 'cancel'): void
}>();

const isEditing = computed(() => !!props.link);

const form = ref<{
  name: string
  url: string
  tags: string[]
}>({
  name: '',
  url: '',
  tags: []
});

const tagsInput = ref('');

const resetForm = (): void => {
  form.value = {
    name: '',
    url: '',
    tags: []
  }
  tagsInput.value = ''
}

// init form when editing
watch(() => props.link, (newLink) => {
  if (newLink) {
    form.value = {
      name: newLink.name,
      url: newLink.url,
      tags: [...(newLink.tags || [])]
    }
    tagsInput.value = (newLink.tags || []).join(', ')
  } else {
    resetForm()
  }
}, { immediate: true });

const tagsPreview = computed<string[]>(() => {
  if (!tagsInput.value) return []
  return tagsInput.value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
});

const submitForm = (): void => {
  if (form.value.url && !form.value.url.startsWith('http')) {
    form.value.url = 'https://' + form.value.url;
  }

  const formData: LinkFormData = {
    name: form.value.name,
    url: form.value.url,
    tags: tagsPreview.value
  }

  emit('submit', formData)
  if (!isEditing.value) {
    resetForm()
  }
}
</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
<template>
    <div class="relative w-full max-w-lg">
        <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <SearchIcon class="h-4 w-4 text-muted-foreground" />
        </div>
        <input type="search" :value="modelValue" @input="handleInput"
            class="w-full pl-10 pr-10 h-10 rounded-md border border-input bg-background py-2 text-sm text-foreground ring-offset-background transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            :class="{ 'border-primary': modelValue }" placeholder="Search links by name..." />
        <Button v-if="modelValue" @click="$emit('update:modelValue', '')" variant="ghost" size="icon"
            class="absolute inset-y-0 right-1 h-7 w-7 my-auto">
            <XCircleIcon class="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            <span class="sr-only">Clear search</span>
        </Button>
    </div>
</template>

<script setup lang="ts">
import { SearchIcon, XCircleIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

defineProps<{ modelValue: string }>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("update:modelValue", target.value);
}
</script>

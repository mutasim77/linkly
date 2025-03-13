<template>
    <div>
        <section class="py-12 relative overflow-hidden">
            <div class="absolute inset-0 -z-10 bg-[radial-gradient(45%_35%_at_50%_37%,var(--primary)/15%,transparent)]">
            </div>
            <div class="text-center max-w-3xl mx-auto px-4">
                <h1 class="text-4xl font-extrabold text-foreground sm:text-5xl animate-in-slide-up-fade">
                    <span class="text-primary bg-clip-text animate-gradient-x">Linkly</span>
                    - Tab Management Simplified
                </h1>
                <p
                    class="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto animate-in-slide-up-fade [animation-delay:150ms]">
                    🔍 Store, organize, and find your important links in
                    seconds. Never lose a tab again!
                </p>

                <div class="mt-10 flex justify-center gap-4 animate-in-slide-up-fade [animation-delay:300ms]">
                    <Button @click="toggleAddForm" class="gap-2" size="lg">
                        <PlusIcon v-if="!showAddForm" class="h-5 w-5" />
                        <XIcon v-else class="h-5 w-5" />
                        {{ showAddForm ? "Cancel" : "Add New Link" }}
                    </Button>

                    <Button v-if="!showAddForm && filteredLinks.length > 0" @click="scrollToLinks" variant="outline"
                        size="lg" class="gap-2">
                        <ArrowDownIcon class="h-5 w-5" />
                        Browse Links
                    </Button>
                </div>

                <div v-if="filteredLinks.length > 0"
                    class="mt-12 grid grid-cols-3 gap-4 max-w-xl mx-auto animate-in-slide-up-fade [animation-delay:450ms]">
                    <div class="bg-muted/50 rounded-lg p-4 text-center">
                        <div class="text-3xl font-bold text-primary">
                            {{ filteredLinks.length }}
                        </div>
                        <div class="text-sm text-muted-foreground">Links</div>
                    </div>
                    <div class="bg-muted/50 rounded-lg p-4 text-center">
                        <div class="text-3xl font-bold text-primary">
                            {{ allTags.length }}
                        </div>
                        <div class="text-sm text-muted-foreground">Tags</div>
                    </div>
                    <div class="bg-muted/50 rounded-lg p-4 text-center">
                        <div class="text-3xl font-bold text-primary">
                            {{ getUniqueDomainsCount() }}
                        </div>
                        <div class="text-sm text-muted-foreground">Domains</div>
                    </div>
                </div>
            </div>
        </section>

        <section v-if="showAddForm || editingLink" class="mb-8">
            <LinkForm :link="editingLink" @submit="handleFormSubmit" @cancel="handleFormCancel" />
        </section>

        <section class="mb-8">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div class="w-full md:w-auto">
                    <SearchBar v-model="searchQuery" @update:modelValue="handleSearchUpdate" />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="outline">
                            <span v-if="activeTag">Filter: {{ activeTag }}</span>
                            <span v-else>Filter by Tag</span>
                            <ChevronDownIcon class="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem @click="clearTagFilter">
                            All Tags
                        </DropdownMenuItem>
                        <DropdownMenuSeparator v-if="allTags.length > 0" />
                        <template v-if="allTags.length > 0">
                            <DropdownMenuItem v-for="tag in allTags" :key="tag" @click="setTagFilter(tag)" :class="{
                                'bg-accent text-accent-foreground':
                                    tag === activeTag,
                            }">
                                {{ tag }}
                            </DropdownMenuItem>
                        </template>
                        <DropdownMenuItem v-else disabled>
                            No tags found
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </section>

        <section id="links-section">
            <div v-if="filteredLinks.length > 0" class="grid grid-cols-1 gap-6">
                <LinkCard v-for="(link, index) in filteredLinks" :key="link.id" :link="link" @edit="startEditing"
                    @delete="deleteLink" @tag-click="setTagFilter" class="animate-in-slide-up-fade"
                    :style="{ 'animation-delay': `${index * 100}ms` }" />
            </div>

            <div v-else-if="isLinksLoaded" class="text-center py-16">
                <div class="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <AlertTriangleIcon class="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 class="mt-4 text-xl font-medium text-foreground">
                    {{
                        searchQuery || activeTag
                            ? "No matching links found"
                            : "No links yet"
                    }}
                </h3>
                <p class="mt-2 text-muted-foreground">
                    {{
                        searchQuery || activeTag
                            ? "Try a different search or filter"
                            : 'Click the "Add New Link" button to get started'
                    }}
                </p>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useLinkStore } from "../stores/linkStore";
import LinkCard from "../components/LinkCard.vue";
import LinkForm from "../components/LinkForm.vue";
import SearchBar from "../components/SearchBar.vue";
import type { Link, LinkFormData } from "../types";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
    PlusIcon,
    XIcon,
    ChevronDownIcon,
    AlertTriangleIcon,
    ArrowDownIcon,
} from "lucide-vue-next";

const linkStore = useLinkStore();
const showAddForm = ref(false);
const editingLink = ref<Link | null>(null);
const isLinksLoaded = ref(false);

const filteredLinks = computed(() => linkStore.filteredLinks);
const allTags = computed(() => linkStore.allTags);
const searchQuery = computed({
    get: () => linkStore.searchQuery,
    set: (value: string) => linkStore.setSearchQuery(value),
});
const activeTag = computed(() => linkStore.activeTag);

onMounted(async () => {
    if (!linkStore.isInitialized) {
        await linkStore.loadLinks();
    }

    isLinksLoaded.value = true;
});

// calc number of unique domains in the links
const getUniqueDomainsCount = (): number => {
    try {
        const domains = new Set<string>();
        filteredLinks.value.forEach((link) => {
            try {
                const url = new URL(link.url);
                domains.add(url.hostname);
            } catch (e) { } // Skip invalid URLs
        });
        return domains.size;
    } catch (e) {
        console.error("Error counting domains:", e);
        return 0;
    }
}

const scrollToLinks = (): void => {
    const linksSection = document.getElementById("links-section");
    if (linksSection) {
        linksSection.scrollIntoView({ behavior: "smooth" });
    }
}

const toggleAddForm = (): void => {
    showAddForm.value = !showAddForm.value;
    if (showAddForm.value) {
        editingLink.value = null;
    }
}

const handleFormSubmit = async (formData: LinkFormData): Promise<void> => {
    if (editingLink.value) {
        await linkStore.updateLink(editingLink.value.id, formData);
        editingLink.value = null;
    } else {
        await linkStore.addLink(formData);
        showAddForm.value = false;
    }
}

const handleFormCancel = (): void => {
    showAddForm.value = false;
    editingLink.value = null;
}

const startEditing = (link: Link): void => {
    editingLink.value = link;
    showAddForm.value = false;
}

// TODO: -> change it later to -> shadcn pretty dialog
const deleteLink = async (id: string): Promise<void> => {
    if (confirm("Are you sure you want to delete this link?")) {
        await linkStore.removeLink(id);
    }
}

const setTagFilter = (tag: string): void => {
    linkStore.setActiveTag(tag);
}

const clearTagFilter = (): void => {
    linkStore.setActiveTag("");
}

// stop! editing if searching or filtering
watch([searchQuery, activeTag], () => {
    editingLink.value = null;
});
</script>

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { saveLinks, getLinks } from "../lib/storage";
import { v4 as uuidv4 } from "uuid";
import type { Link, LinkFormData } from "../types";

export const useLinkStore = defineStore("links", () => {
  const isInitialized = ref<boolean>(false);
  const searchQuery = ref<string>("");
  const activeTag = ref<string>("");
  const links = ref<Link[]>([]);

  const filteredLinks = computed<Link[]>(() => {
    let result = links.value;

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase().trim();
      result = result.filter((link) => link.name.toLowerCase().includes(query));
    }

    if (activeTag.value) {
      result = result.filter(
        (link) => link.tags && link.tags.includes(activeTag.value),
      );
    }
    return result;
  });

  const allTags = computed<string[]>(() => {
    const tagSet = new Set<string>();

    links.value.forEach((link) => {
      if (link.tags) {
        link.tags.forEach((tag) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet);
  });

  const addLink = async (linkData: LinkFormData): Promise<Link> => {
    const newLink: Link = {
      id: uuidv4(),
      name: linkData.name,
      url: linkData.url,
      tags: linkData.tags ? [...linkData.tags] : [],
      createdAt: new Date().toISOString(),
    }

    links.value.push(newLink);

    try {
      const linksToSave = links.value.map((link) => ({
        id: link.id,
        name: link.name,
        url: link.url,
        tags: link.tags ? [...link.tags] : [],
        createdAt: link.createdAt,
        updatedAt: link.updatedAt,
      }));

      await saveLinks(linksToSave);
    } catch (error) {
      console.error("Error in addLink:", error);
    }
    return newLink;
  }

  const updateLink = async (id: string, updatedLink: Partial<Link>): Promise<boolean> => {
    const index = links.value.findIndex((link) => link.id === id);

    if (index !== -1) {
      links.value[index] = {
        ...links.value[index],
        name: updatedLink.name || links.value[index].name,
        url: updatedLink.url || links.value[index].url,
        tags: updatedLink.tags
          ? [...updatedLink.tags]
          : links.value[index].tags,
        updatedAt: new Date().toISOString(),
      };

      try {
        const linksToSave = links.value.map((link) => ({
          id: link.id,
          name: link.name,
          url: link.url,
          tags: link.tags ? [...link.tags] : [],
          createdAt: link.createdAt,
          updatedAt: link.updatedAt,
        }));

        await saveLinks(linksToSave);
        return true;
      } catch (error) {
        console.error("Error in updateLink:", error);
        return false;
      }
    }
    return false;
  }

  const removeLink = async (id: string): Promise<boolean> => {
    const index = links.value.findIndex((link) => link.id === id);

    if (index !== -1) {
      links.value.splice(index, 1);

      try {
        const linksToSave = links.value.map((link) => ({
          id: link.id,
          name: link.name,
          url: link.url,
          tags: link.tags ? [...link.tags] : [],
          createdAt: link.createdAt,
          updatedAt: link.updatedAt,
        }));

        await saveLinks(linksToSave);
        return true;
      } catch (error) {
        console.error("Error in removeLink:", error);
        return false;
      }
    }
    return false;
  }

  const loadLinks = async (): Promise<void> => {
    if (!isInitialized.value) {
      try {
        const storedLinks = await getLinks();

        if (storedLinks && Array.isArray(storedLinks)) {
          links.value = storedLinks;
        } else {
          links.value = [];
        }
        isInitialized.value = true;
      } catch (error) {
        console.error("Error loading links:", error);
        links.value = [];
      }
    }
  }

  const setSearchQuery = (query: string): void => {
    searchQuery.value = query;
  }

  const setActiveTag = (tag: string): void => {
    activeTag.value = tag;
  }

  loadLinks();

  return {
    links,
    filteredLinks,
    allTags,
    searchQuery,
    activeTag,
    isInitialized,
    addLink,
    updateLink,
    removeLink,
    loadLinks,
    setSearchQuery,
    setActiveTag,
  }
});

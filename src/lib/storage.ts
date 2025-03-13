import localforage from 'localforage'
import type { Link } from '../types'

localforage.config({
    name: 'linkly',
    storeName: 'linkly_storage',
    description: 'Linkly link storage'
});

export const saveLinks = async (links: Link[]): Promise<boolean> => {
    try {
        // serialize
        const cleanLinks = links.map(link => ({
            id: link.id,
            name: link.name,
            url: link.url,
            tags: Array.isArray(link.tags) ? [...link.tags] : [],
            createdAt: link.createdAt,
            updatedAt: link.updatedAt
        }));

        await localforage.setItem('links', cleanLinks);
        return true;
    } catch (error) {
        console.error('Error saving links:', error);
        throw error;
    }
}

export const getLinks = async (): Promise<Link[]> => {
    try {
        const links = await localforage.getItem<Link[]>('links');
        if (!links) return [];

        return links.map(link => ({
            id: link.id || '',
            name: link.name || '',
            url: link.url || '',
            tags: Array.isArray(link.tags) ? [...link.tags] : [],
            createdAt: link.createdAt || new Date().toISOString(),
            updatedAt: link.updatedAt
        }));
    } catch (error) {
        console.error('Error getting links:', error);
        return [];
    }
}

export const saveTheme = async (isDark: boolean): Promise<boolean> => {
    try {
        await localforage.setItem('theme', isDark);
        return true;
    } catch (error) {
        console.error('Error saving theme:', error);
        return false;
    }
}

export const getTheme = async (): Promise<boolean | null> => {
    try {
        return await localforage.getItem<boolean>('theme');
    } catch (error) {
        console.error('Error getting theme:', error);
        return null;
    }
}
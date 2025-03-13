export interface OpenGraphData {
    title: string;
    description: string;
    image: string;
    url: string;
    siteName?: string;
    type?: string;
}

// extract YouTube video ID from URL
export const getYoutubeVideoId = (url: string): string | null => {
    try {
        const urlObj = new URL(url);
        // youtube.com URLs
        if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
            const videoId = urlObj.searchParams.get('v');
            if (videoId) return videoId;
        }
        // youtu.be URLs
        if (urlObj.hostname === 'youtu.be') {
            const path = urlObj.pathname.substring(1); // Remove leading slash
            if (path) return path;
        }
        return null;
    } catch (e) {
        console.error('Error extracting YouTube video ID:', e);
        return null;
    }
}

// get YouTube thumbnail URL
export const getYoutubeThumbnail = (videoId: string): string => {
    // YouTube provides several thumbnail options:
    // - maxresdefault.jpg (high quality ->> may not exist for all videos)
    // - hqdefault.jpg (high quality)
    // - mqdefault.jpg (medium quality)
    // - default.jpg (standard quality) 
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // we'll be using high quality
}

// check if URL is a YouTube link
export const isYoutubeLink = (url: string): boolean => {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname === 'www.youtube.com' ||
            urlObj.hostname === 'youtube.com' ||
            urlObj.hostname === 'youtu.be';
    } catch (e) {
        return false;
    }
}

// get domain-specific favicon
export const getFavicon = (url: string): string => {
    try {
        const urlObj = new URL(url);
        const domain = urlObj.hostname.replace('www.', '');

        // google's favicon service
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

    } catch (e) {
        return '';
    }
}

// get the main domain from a URL
export const getDomain = (url: string): string => {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace('www.', '');
    } catch (e) {
        return url;
    }
}

// get clean path from URL
export const getCleanPath = (url: string): string => {
    try {
        const urlObj = new URL(url);
        let path = urlObj.pathname;

        // Remove trailing slash
        if (path.endsWith('/') && path !== '/') {
            path = path.slice(0, -1);
        }

        // Remove leading slash for display purposes
        if (path.startsWith('/') && path !== '/') {
            path = path.substring(1);
        }

        return path === '/' ? '' : path;
    } catch (e) {
        return '';
    }
}

// generate a placeholder image with site initial
export const getPlaceholderImage = (url: string, title: string): string => {
    try {
        // get the domain and first letter
        const domain = getDomain(url);
        const initial = (title || domain).charAt(0).toUpperCase();

        // get a color based on the domain
        const hue = domain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;
        const color = `hsl(${hue}, 70%, 50%)`;
        const textColor = 'white';

        // Create a data URL for an SVG
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <rect width="100" height="100" fill="${color}"/>
            <text x="50" y="50" font-family="Arial, sans-serif" font-size="50" font-weight="bold" fill="${textColor}" text-anchor="middle" dominant-baseline="central">${initial}</text>
            </svg>
        `;

        return `data:image/svg+xml;base64,${btoa(svg)}`;
    } catch (e) {
        return `https://placehold.co/600x400/f5f5f5/a3a3a3?text=${encodeURIComponent(url)}`;
    }
};

// get OG image URL based on the link type
export const getLinkImage = (url: string, title: string = ''): string => {
    try {
        // if it's a YT link
        if (isYoutubeLink(url)) {
            const videoId = getYoutubeVideoId(url);
            if (videoId) {
                return getYoutubeThumbnail(videoId);
            }
        }

        // get domain-specific image for well-known sites
        const domain = getDomain(url);

        // for GH repositories
        if (domain === 'github.com') {
            const parts = url.split('/');
            if (parts.length >= 5) {
                const username = parts[3];
                return `https://opengraph.githubassets.com/1/${username}/${parts[4]}`;
            }
        }

        // for Medium articles
        if (domain === 'medium.com') {
            return `https://miro.medium.com/fit/c/1400/420/${getCleanPath(url)}`;
        }

        // domain favicon at larger size
        return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=128`;

    } catch (e) {
        console.error('Error getting link image:', e);
        return getPlaceholderImage(url, title);
    }
}

export const getOpenGraphData = async (url: string): Promise<OpenGraphData> => {
    try {
        const isYoutube = isYoutubeLink(url);
        const domain = getDomain(url);
        const path = getCleanPath(url);

        const data: OpenGraphData = {
            title: path || domain,
            description: ``,
            image: getLinkImage(url, path || domain),
            url: url,
            siteName: domain,
            type: 'website'
        }

        // Generate a more realistic description based on the domain
        if (domain === 'github.com') {
            data.description = `GitHub repository for ${path.split('/')[1]}`;
        } else if (domain === 'medium.com') {
            data.description = `Article on Medium about ${path.replace(/-/g, ' ')}`;
        } else if (domain === 'dev.to') {
            data.description = `Developer article about ${path.replace(/-/g, ' ')}`;
        } else if (domain === 'stackoverflow.com') {
            data.description = `Stack Overflow Q&A about programming`;
        } else if (domain === 'docs.microsoft.com') {
            data.description = `Microsoft documentation`;
        } else if (domain === 'developer.mozilla.org') {
            data.description = `MDN Web Docs - Resources for developers, by developers`;
        } else {
            data.description = `Content from ${domain}`;
        }

        // YouTube-specific handling
        if (isYoutube) {
            const videoId = getYoutubeVideoId(url);
            if (videoId) {
                data.image = getYoutubeThumbnail(videoId);
                data.type = 'video';
                // Extract title from URL if possible
                const urlParams = new URL(url).searchParams;
                const title = urlParams.get('title') || path;
                data.title = title ? decodeURIComponent(title.replace(/\+/g, ' ')) : 'YouTube Video';
                data.description = `Video on YouTube`;
            }
        }

        return data;
    } catch (e) {
        console.error('Error fetching Open Graph data:', e);
        return {
            title: url,
            description: '',
            image: getPlaceholderImage(url, ''),
            url: url
        }
    }
}
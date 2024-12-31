export const getImageSrc = (src?: string | null) => {
    if (!src) {
        return `${import.meta.env.VITE_APP_URL}/storage/avatars/default.gif`;
    }

    if (src.startsWith("http")) {
        return src;
    }

    return `${import.meta.env.VITE_APP_URL}/storage/${src}`;
};

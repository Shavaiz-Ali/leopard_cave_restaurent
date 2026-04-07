export const formatDate = (gaDate: string) => {
    if (!gaDate) return "";

    const y = gaDate.slice(0, 4);
    const m = gaDate.slice(4, 6);
    const d = gaDate.slice(6, 8);

    const date = new Date(`${y}-${m}-${d}`);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const formatK = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
};

export const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
};
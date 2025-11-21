export function calcAvgLevel(data: { level: number }[]) {
    if (!data.length) return 0;
    const sum = data.reduce((acc, item) => acc + item.level, 0);
    const avg = sum / data.length;
    return Math.round(avg * 100) / 100;
}
export function calcAvgLevel(data: { level: number }[]) {
    if (!data.length) return 0;
    const sum = data.reduce((acc, item) => acc + item.level, 0);
    return sum / data.length;
}
export function arrayFromLength(number: number) {
    return Array.from(new Array(number).keys()).map(k => k+1);
}

export function formatPrice(priceStr: string) {
    const priceArr = priceStr.split(' - ');
    const [low, high] = priceArr.map(price => parseInt(price.replace(/[^0-9]/g, '')));

    return {
        low,
        high
    }
}

export function formatPeriod(periodStr: string) {
    const periodArr = periodStr.split(' - ');
    const [start, end] = periodArr.map(year => parseInt(year));

    return {
        start,
        end
    }
}
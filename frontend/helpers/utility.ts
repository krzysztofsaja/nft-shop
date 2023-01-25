// truncates an address
export function truncateAddress(acc: string): string {
    if (acc !== '') return acc.slice(0, 5) + '...' + acc.slice(-3);
    else return '';
}

// converts a block timestamp number to a date object
export function blockTimestampToDate(timestamp: number): Date {
    return new Date(timestamp * 1000); // converts to ms, and then to number
}


// returns a random unique string
export function randomUniqueString(): string {
    return `${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

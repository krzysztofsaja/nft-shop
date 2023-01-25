function DollarAmount({amount}: {amount: string}) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return <span>{formatter.format(Number(amount))}</span>;
}

export default DollarAmount;

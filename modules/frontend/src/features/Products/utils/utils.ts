const formatCurrency = new Intl.NumberFormat('de-DE', {
	style: 'currency',
	currency: 'EUR',
})

export const toEuro = (num: number): string => {
	return formatCurrency.format(num)
}

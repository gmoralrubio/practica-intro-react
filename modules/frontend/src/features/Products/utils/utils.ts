export const toEuro = (num: number): string => {
	return new Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'EUR',
	}).format(num)
}

const formatCurrency = new Intl.NumberFormat('de-DE', {
	style: 'currency',
	currency: 'EUR',
})

export const toEuro = (num: number): string => {
	return formatCurrency.format(num)
}
export const formatDate = (date: Date) => {
	return date.toLocaleDateString('es-ES', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	})
}

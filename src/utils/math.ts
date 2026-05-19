export function calculateTotal(a: any, b: any): number {
	if (Number.isNaN(a)) {
		return 0
	}

	if (Number.isNaN(b)) {
		return 0
	}

	if (Number.isNaN(a * b)) {
		return 0
	}

	return a * b
}

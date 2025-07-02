export const isSingleDigit = (number: number): boolean | undefined => {
	const numberStr = number.toString();
	if (numberStr.length === 1) {
		return true;
	} else if (numberStr.length > 1) {
		return false;
	}
};

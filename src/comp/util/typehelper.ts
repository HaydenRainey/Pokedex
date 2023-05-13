function capitalizeWord(str: string | undefined) {
	if (str === undefined) return str;

	const firstLetter = str.charAt(0);
	const capitalized = firstLetter.toUpperCase() + str.substring(1);
	return capitalized;
}

function toPascalCase(str: string): string {
	return str.replace(/\w+/g, (match: string) => {
		return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
	});
}

export { capitalizeWord, toPascalCase };

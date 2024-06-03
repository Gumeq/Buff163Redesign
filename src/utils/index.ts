import { FilterProps } from "@/types";

export const transformString = (input: string): string => {
	return input.replace(/\s*\|\s*/g, "_").replace(/\s+/g, "_");
};

export async function fetchSkin(filters: FilterProps) {
	const apiname = transformString(filters.name);

	const url = `https://cs-skin-api.p.rapidapi.com/${apiname}`;
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key":
				"2e46f9f2damshb8f260d716df443p12ebc2jsne2504b131331",
			"X-RapidAPI-Host": "cs-skin-api.p.rapidapi.com",
		},
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
}

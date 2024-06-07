import { FilterProps } from "@/types";
import { useEffect, useState } from "react";
import { fetchSkin } from "@/utils";
import { useSkins } from "@/context/SkinsContext";

const SkinsCardSearch = (searchParams: FilterProps) => {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const { item, setItem } = useSkins();

	// GET THE NAME FROM THE USER , SEARCH THE API, RETURN RESULTS, EZ
	useEffect(() => {
		const getData = async () => {
			try {
				const result = await fetchSkin({ name: searchParams.name });
				setData(result);
			} catch (err) {
				console.error("Failed to fetch data", err);
			} finally {
				setLoading(false);
			}
		};

		getData();
	}, [searchParams.name, setItem]);
	// REPEAT EVERY TIME THE NAME CHANGES, OR THE ITEM IS FOUND

	if (loading) return <p>Loading...</p>;
	console.log(item);

	return (
		<div className="">
			<div>
				{data && (
					<div className="flex flex-row items-center gap-2">
						<img
							src={data.img}
							alt={data.name}
							className="max-h-24 max-w-24 bg-dark-2 rounded-lg"
						/>
						<h2 className="text-nowrap">{data.name}</h2>
					</div>
				)}
			</div>
		</div>
	);
};

export default SkinsCardSearch;

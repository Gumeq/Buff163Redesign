import { FilterProps } from "@/types";
import { useEffect, useState } from "react";
import { fetchSkin } from "@/utils";
import { useSkins } from "@/context/SkinsContext";

const SkinsCardSearch = (searchParams: FilterProps) => {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const { item, setItem } = useSkins();

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

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

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

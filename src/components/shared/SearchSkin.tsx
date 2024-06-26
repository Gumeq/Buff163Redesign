"use client";

import { SearchSkinsProps } from "@/types";
import {
	Combobox,
	ComboboxButton,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
	Transition,
} from "@headlessui/react";

import { skins } from "@/constants";

import { useState, Fragment } from "react";
import SkinsCardSearch from "./SkinsCardSearch";

const SearchSkin = ({ skin, setSkin }: SearchSkinsProps) => {
	// QUERY OR THE NAME OF THE SKIN YOU'RE SEARCHING FOR
	const [query, setQuery] = useState("");

	// HEAR ME OUT... FILTERING
	const filteredSkins =
		// START FILTERING WHEN STRING IS > 2, THERE IS NO SKIS WITH LESS THAN 2 LETTERS
		// ALSO SPEEDS UP SEARCH AND MAKES LESS API CALLS
		query.length <= 2
			? []
			: // CHATGPT WROTE THIS PART, IT WORKS,I GUESS IDK, JS IS WEIRD WITH STRINGS...
			  skins.filter((item) =>
					item
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, ""))
			  );

	return (
		<div className="">
			<Combobox value={skin} onChange={setSkin}>
				<div className="relative w-full">
					<ComboboxButton className="absolute top-[5px]">
						<img
							src="/assets/icons/search (2).svg"
							alt="icon"
							width={30}
							height={30}
							className="ml-2"
						/>
					</ComboboxButton>
					<ComboboxInput
						className="search-manufacturer__input"
						placeholder="Search for Counter-Strike 2 Items"
						displayValue={(skins: string) => skins}
						onChange={(e) => setQuery(e.target.value)}
					/>

					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<ComboboxOptions className="search-manufacturer__options">
							{filteredSkins.length === 0 && query !== "" ? (
								<ComboboxOption value={query} className="">
									No skin with name: "{query}"
								</ComboboxOption>
							) : (
								filteredSkins.splice(0, 5).map((item) => (
									<ComboboxOption
										key={item}
										className={({ focus }) => ` 
										relative search-manufacturer__option
										${focus ? "bg-dark-4 text-white" : "text-white"}
										`}
										value={item}
									>
										<SkinsCardSearch name={item} />
									</ComboboxOption>
								))
							)}
						</ComboboxOptions>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
};

export default SearchSkin;

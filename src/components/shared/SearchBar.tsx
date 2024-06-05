"use client";
import React from "react";
import { useState } from "react";
import SearchSkin from "./SearchSkin";

const SearchBar = () => {
	const [skin, setSkin] = useState("");
	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form action="" className="" onSubmit={handleSearch}>
			<div className="max-w-80">
				<SearchSkin skin={skin} setSkin={setSkin} />
			</div>
		</form>
	);
};

export default SearchBar;

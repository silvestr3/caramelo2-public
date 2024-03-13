import React, { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
	searchTerm: string;
	setSearchTerm: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
	return (
		<div className="relative flex items-center">
			<Search className="absolute left-2 opacity-60" />
			<Input
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="pl-12 h-12"
			/>
		</div>
	);
};

export default SearchBar;

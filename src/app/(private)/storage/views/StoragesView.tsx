"use client";
import SearchBar from "@/components/global/SearchBar";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IStorage } from "@/types/Storage";
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { Plus, Download, ArrowLeftRight, History } from "lucide-react";
import { useEffect, useState } from "react";
import { StorageColumns } from "../components/StorageColumns";

interface StoragesViewProps {
	storages: IStorage[];
}

const StoragesView = ({ storages }: StoragesViewProps) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [StoragesDisplay, setStoragesDisplay] = useState<IStorage[]>(storages);

	const handleFilter = () => {
		const filteredStorages = storages.filter((storage: IStorage) => {
			for (const [_, value] of Object.entries(storage)) {
				if (String(value).toLowerCase().includes(searchTerm.toLowerCase())) {
					return storage;
				}
			}
		});

		setStoragesDisplay(filteredStorages);
	};

	useEffect(() => {
		handleFilter();
	}, [searchTerm, storages]);

	return (
		<>
			<div className="grid grid-cols-2">
				<div>
					<h2 className="text-3xl font-semibold prompt">สถานที่จัดเก็บ</h2>
					<h6 className="prompt">รวมทั้งหมด: {StoragesDisplay.length}</h6>
				</div>
				<div className="flex flex-col gap-2">
					<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
					<div className="flex justify-end gap-1">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Button variant={"outline"}>
										<Plus />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>เพิ่มสถานที่จัดเก็บ</p>
								</TooltipContent>
							</Tooltip>

							<Tooltip>
								<TooltipTrigger>
									<Button variant={"outline"}>
										<ArrowLeftRight />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>โอนสินค้า</p>
								</TooltipContent>
							</Tooltip>

							<Tooltip>
								<TooltipTrigger>
									<Button variant={"outline"}>
										<History />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>ประวัติการโอนสินค้า</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
			</div>

			<ScrollArea className="mt-3">
				<DataTable data={StoragesDisplay} columns={StorageColumns} />
			</ScrollArea>
		</>
	);
};

export default StoragesView;

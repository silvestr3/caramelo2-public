"use client";

import { DataTable } from "@/components/ui/data-table";
import { IBike } from "@/types/Bike";
import React, { useEffect, useState } from "react";
import { BikeColumns } from "../components/BikeColumn";
import SearchBar from "@/components/global/SearchBar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Import, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface InventoryViewProps {
	bikes: IBike[];
}

const InventoryView = ({ bikes }: InventoryViewProps) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [BikesDisplay, setBikesDisplay] = useState<IBike[]>(bikes);
	const [includeSold, setIncludeSold] = useState<boolean>(false);

	const router = useRouter();

	const toogleIncludeSold = () => {
		setIncludeSold((state) => !state);
	};

	const handleFilter = () => {
		const filteredBikes = bikes
			.filter((Bike: IBike) => {
				for (const [_, value] of Object.entries(Bike)) {
					if (String(value).toLowerCase().includes(searchTerm.toLowerCase())) {
						return Bike;
					}
				}
			})
			.filter((bike: IBike) => {
				if (!includeSold) return !bike.sold;
				else return bike;
			});

		setBikesDisplay(filteredBikes);
	};

	useEffect(() => {
		handleFilter();
	}, [searchTerm, bikes, includeSold]);

	return (
		<>
			<div className="grid grid-cols-2">
				<div>
					<h2 className="text-3xl font-semibold prompt">สินค้า</h2>
					<h6 className="prompt">รวมทั้งหมด: {BikesDisplay.length}</h6>
				</div>
				<div className="flex flex-col gap-2">
					<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
					<div className="flex justify-end gap-1">
						<TooltipProvider>
							<Tooltip>
								<Link href={`/inventory/new`}>
									<TooltipTrigger className="border rounded-sm shadow-sm p-1 hover:bg-slate-100">
										<Plus />
									</TooltipTrigger>
								</Link>
								<TooltipContent>
									<p>เพิ่มสินค้า</p>
								</TooltipContent>
							</Tooltip>

							<Tooltip>
								<Link href={`/inventory/import`}>
									<TooltipTrigger className="border rounded-sm shadow-sm p-1 hover:bg-slate-100">
										<Import />
									</TooltipTrigger>
								</Link>
								<TooltipContent>
									<p>นำเข้าข้อมูลสินค้า</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
			</div>

			<div className="flex items-center">
				<Checkbox
					checked={includeSold}
					onCheckedChange={toogleIncludeSold}
					id="include-sold"
				/>
				<label
					className="ms-2 text-sm font-bold text-gray-900 prompt"
					htmlFor="include-sold"
				>
					รวมขายแล้ว
				</label>
			</div>

			<ScrollArea className="h-[85%] mt-1">
				<DataTable data={BikesDisplay} columns={BikeColumns} />
			</ScrollArea>
		</>
	);
};

export default InventoryView;

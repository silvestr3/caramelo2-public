"use client";
import SearchBar from "@/components/global/SearchBar";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ICustomer } from "@/types/Customer";
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { Plus, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { CustomerColumns } from "../components/CustomerColumns";

interface CustomersViewProps {
	customers: ICustomer[];
}

const CustomersView = ({ customers }: CustomersViewProps) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [CustomersDisplay, setCustomersDisplay] =
		useState<ICustomer[]>(customers);

	const handleFilter = () => {
		const filteredCustomers = customers.filter((customer: ICustomer) => {
			for (const [_, value] of Object.entries(customer)) {
				if (String(value).toLowerCase().includes(searchTerm.toLowerCase())) {
					return customer;
				}
			}
		});

		setCustomersDisplay(filteredCustomers);
	};

	useEffect(() => {
		handleFilter();
	}, [searchTerm, customers]);

	return (
		<>
			<div className="grid grid-cols-2">
				<div>
					<h2 className="text-3xl font-semibold prompt">ลูกค้า</h2>
					<h6 className="prompt">รวมทั้งหมด: {CustomersDisplay.length}</h6>
				</div>
				<div className="flex flex-col gap-2">
					<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
					<div className="flex justify-end gap-1">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger className="border rounded-sm shadow-sm p-1 hover:bg-slate-100">
									<Plus />
								</TooltipTrigger>
								<TooltipContent>
									<p>เพิ่มลูกค้า</p>
								</TooltipContent>
							</Tooltip>

							<Tooltip>
								<TooltipTrigger className="border rounded-sm shadow-sm p-1 hover:bg-slate-100">
									<Download />
								</TooltipTrigger>
								<TooltipContent>
									<p>ส่งออกลูกค้า</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
			</div>

			<ScrollArea className="mt-3">
				<DataTable data={CustomersDisplay} columns={CustomerColumns} />
			</ScrollArea>
		</>
	);
};

export default CustomersView;

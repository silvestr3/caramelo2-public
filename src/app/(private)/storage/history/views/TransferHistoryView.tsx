"use client";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { IBike } from "@/types/Bike";
import { IStorage } from "@/types/Storage";
import { DateRangePicker } from "@/components/global/DateRangePicker";
import { DateRange } from "react-day-picker";
import React, { useEffect, useState } from "react";
import { getStorageTransferHistory } from "@/services/StorageService";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/ui/data-table";
import { TransferHistoryColumns } from "../components/TransferHistoryColumns";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface TransferHistoryItem {
	id: number;
	transfer_date: Date | string;
	bikes: IBike[];
	origin: IStorage;
	destination: IStorage;
}

interface TransferHistoryViewProps {
	transferHistory: TransferHistoryItem[];
}

const TransferHistoryView = ({ transferHistory }: TransferHistoryViewProps) => {
	const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
	const [historyDisplay, setHistoryDisplay] =
		useState<TransferHistoryItem[]>(transferHistory);

	const handleSelectDateRange = (newValue: DateRange) => {
		setDateRange(newValue);
	};

	const handleGetFilteredHistory = async () => {
		const startDate = dateRange?.from;
		const endDate = dateRange?.to;

		const filteredHistory = await getStorageTransferHistory(startDate, endDate);
		setHistoryDisplay(filteredHistory);
	};

	useEffect(() => {
		handleGetFilteredHistory();
	}, [dateRange]);

	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/storage">สถานที่จัดเก็บ</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>History</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<Separator className="my-2" />
			<div className="grid grid-cols-2">
				<div>
					<h2 className="text-3xl font-semibold prompt">Transfer history</h2>
					<h6 className="prompt">รวมทั้งหมด: {historyDisplay.length}</h6>
				</div>

				<div className="flex justify-end gap-2">
					<DateRangePicker date={dateRange} setDate={setDateRange} />
				</div>
			</div>

			<ScrollArea className="h-[85%] mt-5">
				<DataTable data={historyDisplay} columns={TransferHistoryColumns} />
			</ScrollArea>
		</>
	);
};

export default TransferHistoryView;

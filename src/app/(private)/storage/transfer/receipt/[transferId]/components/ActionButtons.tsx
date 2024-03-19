"use client";
import TransferReceiptTemplate from "@/components/pdf/TransferReceiptTemplate";
import { Button } from "@/components/ui/button";
import { IBike } from "@/types/Bike";
import { IStorage } from "@/types/Storage";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Printer } from "lucide-react";

import Link from "next/link";
import React from "react";

interface TransferHistoryItem {
	id: number;
	transfer_date: Date | string;
	bikes: IBike[];
	origin: IStorage;
	destination: IStorage;
}

interface ActionButtonsProps {
	item: TransferHistoryItem;
}

const ActionButtons = ({ item }: ActionButtonsProps) => {
	return (
		<div className="flex justify-between container mt-2">
			<Link href={`/storage/history`}>
				<Button variant={"outline"}>Return</Button>
			</Link>
			<PDFDownloadLink
				fileName={`transfer-${item.id + 1}.pdf`}
				document={<TransferReceiptTemplate item={item} />}
			>
				<Button className="flex justify-between gap-2">
					<Printer size={"1.2rem"} opacity={"60%"} />
					Print
				</Button>
			</PDFDownloadLink>
		</div>
	);
};

export default ActionButtons;

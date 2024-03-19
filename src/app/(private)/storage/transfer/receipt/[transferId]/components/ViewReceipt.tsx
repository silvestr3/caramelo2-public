"use client";
import React from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { IBike } from "@/types/Bike";
import { IStorage } from "@/types/Storage";
import TransferReceiptTemplate from "@/components/pdf/TransferReceiptTemplate";

interface TransferHistoryItem {
	id: number;
	transfer_date: Date | string;
	bikes: IBike[];
	origin: IStorage;
	destination: IStorage;
}

interface ViewReceiptProps {
	item: TransferHistoryItem;
}

const ViewReceipt = ({ item }: ViewReceiptProps) => {
	return (
		<PDFViewer className="h-full w-full">
			<TransferReceiptTemplate item={item} />
		</PDFViewer>
	);
};

export default ViewReceipt;

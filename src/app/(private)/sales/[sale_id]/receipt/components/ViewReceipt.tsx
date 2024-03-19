"use client";
import React from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import SaleReceiptTemplate from "@/components/pdf/SaleReceiptTemplate";
import { IOrder } from "@/types/Order";

interface ViewReceiptProps {
	order: IOrder;
}

const ViewReceipt = ({ order }: ViewReceiptProps) => {
	return (
		<PDFViewer className="h-full w-full">
			<SaleReceiptTemplate order={order} />
		</PDFViewer>
	);
};

export default ViewReceipt;

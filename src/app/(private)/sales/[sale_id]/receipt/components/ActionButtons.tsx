"use client";
import SaleReceiptTemplate from "@/components/pdf/SaleReceiptTemplate";
import { Button } from "@/components/ui/button";
import { IOrder } from "@/types/Order";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Printer } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ActionButtonProps {
	order: IOrder;
}
const ActionButtons = ({ order }: ActionButtonProps) => {
	return (
		<div className="flex justify-between container mt-2">
			<Link href={`/sales/${order.id}`}>
				<Button variant={"outline"}>Return</Button>
			</Link>
			<PDFDownloadLink
				fileName={`PH${`${order.id}`.padStart(8, "0")}.pdf`}
				document={<SaleReceiptTemplate order={order} />}
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

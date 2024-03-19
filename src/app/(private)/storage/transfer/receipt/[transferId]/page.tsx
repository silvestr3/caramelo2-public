import { getTransferItem } from "@/services/StorageService";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import React from "react";
import Link from "next/link";
import ViewReceipt from "./components/ViewReceipt";
import ActionButtons from "./components/ActionButtons";

interface TransferReceiptParams {
	params: {
		transferId: number;
	};
}

const TransferReceipt = async ({ params }: TransferReceiptParams) => {
	const item = await getTransferItem(params.transferId);

	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/storage">ประวัติการขาย</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/storage/history">Transfer history</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Receipt</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Separator className="my-2" />

			<div className="h-[90%]">
				<ViewReceipt item={item} />
			</div>

			<ActionButtons item={item} />
		</>
	);
};

export default TransferReceipt;

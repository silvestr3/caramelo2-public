import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getOrder } from "@/services/OrderService";
import { IOrder } from "@/types/Order";
import Link from "next/link";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import SaleReceiptTemplate from "@/components/pdf/SaleReceiptTemplate";
import ViewReceipt from "./components/ViewReceipt";
import ActionButtons from "./components/ActionButtons";

interface ViewReceiptParams {
	params: {
		sale_id: string;
	};
}

const SaleReceipt = async ({ params }: ViewReceiptParams) => {
	const order = (await getOrder(parseInt(params.sale_id)).then((res) => {
		if (!res?.ok) {
			return null;
		}
		return res.json();
	})) as IOrder;
	const documentID = `${order.id}`.padStart(8, "0");

	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/sales">ประวัติการขาย</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href={`/sales/${order.id}`}>PH-{documentID}</Link>
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
				<ViewReceipt order={order} />
			</div>
			<ActionButtons order={order} />
		</>
	);
};

export default SaleReceipt;

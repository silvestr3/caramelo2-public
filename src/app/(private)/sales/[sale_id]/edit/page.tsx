import { getOrder } from "@/services/OrderService";
import { IOrder } from "@/types/Order";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import React from "react";
import { Calendar, User } from "lucide-react";
import { getDate } from "@/util/GetDateString";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Table,
	TableCaption,
	TableBody,
	TableRow,
	TableCell,
} from "@/components/ui/table";
import EditForm from "./components/EditForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EditSaleParams {
	params: {
		sale_id: string;
	};
}

const EditSale = async ({ params }: EditSaleParams) => {
	const order = (await getOrder(parseInt(params.sale_id)).then((res) => {
		if (!res.ok) {
			return null;
		}
		return res.json();
	})) as IOrder;

	const documentID = `${order.id}`.padStart(8, "0");

	const orderBike = order.bikes[0];
	const data = [
		{ label: "ยี่ห้อ", data: orderBike.brand },
		{ label: "ชื่อรุ่น", data: orderBike.model_name },
		{ label: "สี", data: orderBike.color },
		{ label: "รหัสรุ่น", data: orderBike.model_code },
		{ label: "เลขตัวเครื่อง", data: orderBike.engine },
		{ label: "เลขตัวถัง", data: orderBike.chassi },
		{ label: "ป้ายทะเบียน", data: orderBike.registration_plate },
		{ label: "บันทึกเพิ่มเติม", data: orderBike.notes },
		{ label: "ชนิดรถ", data: orderBike.category },
	];

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
						<BreadcrumbPage>แก้ไข</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Separator className="my-2" />

			<div className="py-2 grid grid-cols-2 place-content-start gap-x-5 h-full">
				<div>
					<h2 className="text-3xl font-semibold prompt">
						แก้ไข การขาย PH-{documentID}
					</h2>
				</div>

				<div className="justify-self-end flex flex-col gap-2 items-end">
					<h3 className="text-xl flex items-center justify-between gap-2">
						<User opacity={"60%"} />
						{order.customer}
					</h3>
					<h4 className="flex items-center justify-between gap-2">
						<Calendar opacity={"60%"} />
						{getDate(order.sale_date)}
					</h4>
				</div>

				<div>
					<h4 className="text-lg">Product information</h4>
					<ScrollArea className="h-[80%] w-full rounded-md mt-3">
						<Table>
							<TableCaption>Order PH-{documentID} information</TableCaption>
							<TableBody>
								{data.map((row) => (
									<TableRow>
										<TableCell className="font-medium">{row.label}</TableCell>
										<TableCell className="text-right">{row.data}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</ScrollArea>
				</div>

				<div className="relative">
					<Separator orientation="vertical" className="absolute h-[85%]" />
					<ScrollArea className="container h-[90%]">
						<EditForm order={order} />
					</ScrollArea>
					<div className="flex justify-between container items-center">
						<Link href={`/sales/${order.id}`}>
							<Button variant={"outline"}>Cancel</Button>
						</Link>
						<Button type="submit" form="editorder">
							Edit
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditSale;

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
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableRow,
} from "@/components/ui/table";
import { getOrder } from "@/services/OrderService";
import { IOrder } from "@/types/Order";
import {
	Calendar,
	Frown,
	Pencil,
	ShoppingCart,
	Trash2,
	User,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import ActionButtons from "./components/ActionButtons";

interface ViewOrderParams {
	params: {
		sale_id: string;
	};
}

const ViewOrder = async ({ params }: ViewOrderParams) => {
	const order = (await getOrder(parseInt(params.sale_id)).then((res) => {
		if (!res.ok) {
			return null;
		}
		return res.json();
	})) as IOrder;

	if (order === null) {
		return (
			<div className="grid place-items-center h-full w-full">
				<div className="flex items-center justify-center flex-col gap-3">
					<Frown size={"6rem"} opacity={"60%"} />
					<h1>This order was not found</h1>
					<Link href={"/sales"}>
						<Button>Back</Button>
					</Link>
				</div>
			</div>
		);
	}

	const getDate = (date: Date) => {
		return new Date(date).toLocaleDateString("th-TH", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

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
		{ label: "สถานที่เก็บ", data: orderBike.storage_place },
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
						<BreadcrumbPage>PH-{documentID}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<Separator className="my-2" />

			<div className="py-2 grid grid-cols-2 gap-x-5">
				<div>
					<h2 className="text-3xl font-semibold prompt">
						การขาย PH-{documentID}
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

					<div className="container flex flex-col justify-between h-[85%]">
						{order.additional_fees?.length! > 0 && (
							<div>
								<h4 className="text-lg">Additional Fees</h4>
								<ScrollArea className="h-[200px]">
									<Table>
										<TableBody>
											{order.additional_fees?.map((fee) => (
												<TableRow>
													<TableCell className="font-medium">
														{fee.description}
													</TableCell>
													<TableCell className="font-medium text-right">
														{fee.amount}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</ScrollArea>
							</div>
						)}

						<div>
							<h4 className="text-lg">Price information</h4>
							<Table>
								<TableBody>
									<TableRow>
										<TableCell className="font-medium">Product price</TableCell>
										<TableCell className="font-medium text-right">
											{orderBike.sale_price}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">Discount</TableCell>
										<TableCell className="font-medium text-right">
											{order.discount}
										</TableCell>
									</TableRow>

									<TableRow>
										<TableCell className="font-medium">Down payment</TableCell>
										<TableCell className="font-medium text-right">
											{order.down_payment}
										</TableCell>
									</TableRow>

									<TableRow>
										<TableCell className="font-medium">Total</TableCell>
										<TableCell className="font-medium text-right">
											{order.total}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
							<Separator className="my-5" />
						</div>
						<ActionButtons order={order} />
					</div>
				</div>
			</div>
		</>
	);
};

export default ViewOrder;

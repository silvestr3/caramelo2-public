import React from "react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { ScrollArea } from "@/components/ui/scroll-area";

import { getBike } from "@/services/InventoryService";
import { Separator } from "@/components/ui/separator";
import { IBike } from "@/types/Bike";
import { Button } from "@/components/ui/button";
import { Frown, Pencil, Receipt, ShoppingCart, Trash2 } from "lucide-react";
import ActionButtons from "./components/ActionButtons";
import Link from "next/link";

interface ViewBikeParams {
	params: {
		bike_id: string;
	};
}

const ViewBike = async ({ params }: ViewBikeParams) => {
	const bike = (await getBike(parseInt(params.bike_id)).then((res) => {
		if (!res.ok) {
			return null;
		}
		return res.json();
	})) as IBike;

	if (bike === null) {
		return (
			<div className="grid place-items-center h-full w-full">
				<div className="flex items-center justify-center flex-col gap-3">
					<Frown size={"6rem"} opacity={"60%"} />
					<h1>This bike was not found</h1>
					<Link href={"/inventory"}>
						<Button>Back</Button>
					</Link>
				</div>
			</div>
		);
	}

	const data = [
		{ label: "ยี่ห้อ", data: bike.brand },
		{ label: "ชื่อรุ่น", data: bike.model_name },
		{ label: "สี", data: bike.color },
		{ label: "รหัสรุ่น", data: bike.model_code },
		{ label: "เลขตัวเครื่อง", data: bike.engine },
		{ label: "เลขตัวถัง", data: bike.chassi },
		{ label: "ป้ายทะเบียน", data: bike.registration_plate },
		{ label: "สถานที่เก็บ", data: bike.storage_place },
		{ label: "บันทึกเพิ่มเติม", data: bike.notes },
		{ label: "ชนิดรถ", data: bike.category },
	];

	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/inventory">สินค้า</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{bike.model_name}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<Separator className="my-2" />

			<div className="py-2 grid grid-cols-2 gap-x-5">
				<div>
					<h2 className="text-3xl font-semibold prompt">{bike.model_name}</h2>
					<h3 className="text-xl prompt opacity-60">{bike.model_code}</h3>
				</div>

				<div className="justify-self-end flex flex-col items-end">
					<span
						className={`text-xs font-bold me-2 px-2.5 py-0.5 rounded-full w-fit ${
							bike.sold
								? "bg-red-400 text-red-900"
								: "bg-emerald-400 text-emerald-900"
						}`}
					>
						{bike.sold ? "ขายแล้ว" : "มีอยู่"}
					</span>
				</div>

				<div>
					<h4 className="text-lg">Product information</h4>
					<ScrollArea className="h-[80%] w-full rounded-md mt-3">
						<Table>
							<TableCaption>{bike.model_name} information</TableCaption>
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
						<div>
							<h4 className="text-lg">Price information</h4>
							<Table>
								<TableBody>
									<TableRow>
										<TableCell className="font-medium">Sale price</TableCell>
										<TableCell>{bike.sale_price}</TableCell>
									</TableRow>

									<TableRow>
										<TableCell className="font-medium">
											Wholesale price
										</TableCell>
										<TableCell>{bike.wholesale_price}</TableCell>
									</TableRow>

									<TableRow>
										<TableCell className="font-medium">
											Wholesale price NET
										</TableCell>
										<TableCell>{bike.wholesale_price_net}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
							<Separator className="my-5" />
						</div>

						{bike.sold && (
							<div>
								<h4 className="text-lg">Sale information</h4>
								<Table>
									<TableBody>
										<TableRow>
											<TableCell className="font-medium">Sold At</TableCell>
											<TableCell className="text-right">SOLD DATE</TableCell>
										</TableRow>

										<TableRow>
											<TableCell className="font-medium">Customer</TableCell>
											<TableCell className="text-right">
												SOLD CUSTOMER
											</TableCell>
										</TableRow>

										<TableRow>
											<TableCell className="font-medium">View sale</TableCell>
											<TableCell className="text-right">
												<Button className="gap-2" variant={"outline"}>
													<Receipt size={"1rem"} />
													Sale
												</Button>
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</div>
						)}

						{!bike.sold && <ActionButtons bike={bike} />}
					</div>
				</div>
			</div>
		</>
	);
};

export default ViewBike;

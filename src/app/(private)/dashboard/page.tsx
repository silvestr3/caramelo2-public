import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCaption } from "@/components/ui/table";
import {
	Contact,
	Receipt,
	ShoppingCart,
	UsersRound,
	Warehouse,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import LatestSales from "./components/LatestSales";
import { getLatestOrders } from "@/services/OrderService";
import { ScrollArea } from "@/components/ui/scroll-area";

const Dashboard = async () => {
	const buttonStyle =
		"group shadow border border-double rounded-lg flex justify-center items-center h-[150px] w-full cursor-pointer hover:border-transparent ";

	const latestOrders = await getLatestOrders().then((res) => res.json());

	const menuPages = [
		{
			href: "/inventory",
			style: buttonStyle + "bg-emerald-100 hover:bg-emerald-200",
			icon: <ShoppingCart />,
			label: "สินค้า",
		},
		{
			href: "/customers",
			style: buttonStyle + "bg-teal-100 hover:bg-teal-200",
			icon: <UsersRound />,
			label: "ลูกค้า",
		},
		{
			href: "/sales",
			style: buttonStyle + "bg-orange-100 hover:bg-orange-200",
			icon: <Receipt />,
			label: "ขาย",
		},
		{
			href: "/storage",
			style: buttonStyle + "bg-rose-100 hover:bg-rose-200",
			icon: <Warehouse />,
			label: "สถานที่จัดเก็บ",
		},
		{
			href: "/empmloyees",
			style: buttonStyle + "bg-sky-100 hover:bg-sky-200",
			icon: <Contact />,
			label: "พนักงาน",
		},
	];

	return (
		<>
			<div className="mb-3">
				<h2 className="text-3xl font-semibold">ยินดีต้อนรับ, ไจโกะ</h2>
			</div>
			<div className="grid grid-cols-3 mt-5 gap-5">
				{menuPages.map((button) => (
					<Link className={button.style} href={button.href}>
						<div className="flex gap-5 items-center">
							{button.icon}
							{button.label}
						</div>
					</Link>
				))}
			</div>

			<Separator className="my-5" />

			<ScrollArea className="h-[40%]">
				<LatestSales sales={latestOrders} />
			</ScrollArea>
		</>
	);
};

export default Dashboard;

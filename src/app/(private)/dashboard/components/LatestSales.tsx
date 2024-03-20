import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { IOrder } from "@/types/Order";
import { getDate } from "@/util/GetDateString";
import { Receipt } from "lucide-react";
import Link from "next/link";
import React from "react";

interface LatestSalesProps {
	sales: IOrder[];
}

const LatestSales = ({ sales }: LatestSalesProps) => {
	return (
		<Table>
			<TableCaption>Latest orders</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Customer</TableHead>
					<TableHead>Product</TableHead>
					<TableHead>Sale date</TableHead>
					<TableHead>Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{sales.map((sale) => (
					<TableRow key={sale.id}>
						<TableCell>{sale.customer}</TableCell>
						<TableCell>
							{sale.bikes.map((bike) => (
								<div key={bike.id} className="flex flex-col">
									<span>{bike.model_name}</span>
									<span className="opacity-60">{bike.model_code}</span>
								</div>
							))}
						</TableCell>
						<TableCell>{getDate(sale.sale_date)}</TableCell>
						<TableCell>{sale.total}</TableCell>
						<TableCell className="text-right">
							<Link href={`/sales/${sale.id}/receipt`}>
								<Button variant={"outline"}>
									<Receipt opacity={"60%"} />
								</Button>
							</Link>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default LatestSales;

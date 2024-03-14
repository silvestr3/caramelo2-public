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
					<TableRow>
						<TableCell>{sale.customer}</TableCell>
						<TableCell>
							{sale.bikes.map((bike) => (
								<div className="flex flex-col">
									<span>{bike.model_name}</span>
									<span className="opacity-60">{bike.model_code}</span>
								</div>
							))}
						</TableCell>
						<TableCell>{sale.sale_date.toString()}</TableCell>
						<TableCell>{sale.total}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default LatestSales;

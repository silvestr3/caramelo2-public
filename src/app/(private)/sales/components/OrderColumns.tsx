"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Eye,
	MoreHorizontal,
	Pencil,
	Receipt,
	ShoppingCart,
	Trash2,
} from "lucide-react";
import Link from "next/link";
import { IOrder } from "@/types/Order";

export const OrderColumns: ColumnDef<IOrder>[] = [
	{
		accessorKey: "sale_date",
		header: "Sale Date",
	},
	{
		header: "Customer Name",
		cell: ({ row }) => {
			const order = row.original;
			const customer = order.customer;

			return <div>{customer}</div>;
		},
	},
	{
		header: "Product",
		cell: ({ row }) => {
			const order = row.original;
			const bike = order.bikes[0];

			return <div>{bike.model_name}</div>;
		},
	},
	{
		accessorKey: "total",
		header: "Total",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const order = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<Link href={`/sales/${order.id}`}>
							<DropdownMenuItem className="flex justify-between">
								<Eye className="opacity-60" />
								ดู
							</DropdownMenuItem>
						</Link>
						<Link href={`/sales/${order.id}/edit`}>
							<DropdownMenuItem className="flex justify-between">
								<Pencil className="opacity-60" />
								แก้ไข
							</DropdownMenuItem>
						</Link>
						<Link href={`/sales/${order.id}/receipt`}>
							<DropdownMenuItem className="flex justify-between">
								<Receipt className="opacity-60" />
								Receipt
							</DropdownMenuItem>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

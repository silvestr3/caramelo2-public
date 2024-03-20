"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IOrder } from "@/types/Order";
import { getDate } from "@/util/GetDateString";
import OrderRowButtons from "./OrderRowButtons";

export const OrderColumns: ColumnDef<IOrder>[] = [
	{
		accessorKey: "sale_date",
		header: "Sale Date",
		cell: ({ row }) => {
			const order = row.original;
			const date = getDate(order.sale_date);

			return <div>{date}</div>;
		},
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

			return <OrderRowButtons order={order} />;
		},
	},
];

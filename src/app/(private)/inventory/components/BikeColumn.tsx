"use client";

import { IBike } from "@/types/Bike";
import { ColumnDef } from "@tanstack/react-table";

import BikeRowButtons from "./BikeRowButtons";
import BikeRowBadge from "./BikeRowBadge";

export const BikeColumns: ColumnDef<IBike>[] = [
	{
		accessorKey: "brand",
		header: "ยี่ห้อ",
	},
	{
		accessorKey: "model_name",
		header: "ชื่อรุ่น",
	},
	{
		accessorKey: "model_code",
		header: "รหัสรุ่น",
	},
	{
		accessorKey: "engine",
		header: "เลขตัวเครื่อง",
	},
	{
		accessorKey: "sold",
		header: "สถานะ",
		cell: ({ row }) => {
			const bike = row.original;

			return <BikeRowBadge bike={bike} />;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const bike = row.original;

			return <BikeRowButtons bike={bike} />;
		},
	},
];

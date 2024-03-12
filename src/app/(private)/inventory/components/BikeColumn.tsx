"use client";

import { IBike } from "@/types/Bike";
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
	ShoppingCart,
	Trash2,
} from "lucide-react";

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
			const sold = row.getValue("sold");

			if (sold) {
				return (
					<span className="bg-red-300 text-red-800 text-xs font-bold me-2 px-2.5 py-0.5 rounded-full border border-red-800 ">
						ขายแล้ว
					</span>
				);
			}

			return (
				<span className="bg-emerald-300 text-emerald-800 text-xs font-bold me-2 px-2.5 py-0.5 rounded-full border border-emerald-800">
					มีอยู่
				</span>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const payment = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem className="flex justify-between">
							<Eye className="opacity-60" />
							ดู
						</DropdownMenuItem>
						<DropdownMenuItem className="flex justify-between">
							<Pencil className="opacity-60" />
							แก้ไข
						</DropdownMenuItem>
						<DropdownMenuItem className="flex justify-between">
							<ShoppingCart className="opacity-60" />
							เพิ่ม
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="flex justify-between">
							<Trash2 className="opacity-60" />
							ลบ
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

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
import Link from "next/link";
import { ICustomer } from "@/types/Customer";

export const CustomerColumns: ColumnDef<ICustomer>[] = [
	{
		accessorKey: "name",
		header: "ชื่อลูกค้า",
	},
	{
		accessorKey: "phone",
		header: "เบอร์โทรศัพท์",
	},
	{
		accessorKey: "address",
		header: "ที่อยู่",
	},
	{
		accessorKey: "province",
		header: "จังหวัด",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const customer = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<Link href={`#`}>
							<DropdownMenuItem className="flex justify-between">
								<Eye className="opacity-60" />
								ดู
							</DropdownMenuItem>
						</Link>
						<Link href={`#`}>
							<DropdownMenuItem className="flex justify-between">
								<Pencil className="opacity-60" />
								แก้ไข
							</DropdownMenuItem>
						</Link>
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

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
	ShoppingCart,
	Trash2,
} from "lucide-react";
import Link from "next/link";
import { IStorage } from "@/types/Storage";

export const StorageColumns: ColumnDef<IStorage>[] = [
	{
		accessorKey: "storage_name",
		header: "Storage Name",
	},
	{
		accessorKey: "address",
		header: () => {
			return <div className="text-left pl-2">Address</div>;
		},
		cell: ({ row }) => {
			const storage = row.original;
			return <div className="text-left font-sm">{storage.address}</div>;
		},
	},
	{
		accessorKey: "phone",
		header: "Phone",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const storage = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<Link href={`/storage/${storage.id}`}>
							<DropdownMenuItem className="flex justify-between">
								<Eye className="opacity-60" />
								ดู
							</DropdownMenuItem>
						</Link>
						<Link href={`/storage/${storage.id}/edit`}>
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

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { IEmployee } from "@/types/IEmployee";
import { Badge } from "@/components/ui/badge";

export const EmployeeColumns: ColumnDef<IEmployee>[] = [
	{
		accessorKey: "name",
		header: "ชื่อลูกค้า",
	},
	{
		accessorKey: "username",
		header: "ชื่อผู้ใช้",
	},
	{
		accessorKey: "role",
		header: "บทบาท",
		cell: ({ row }) => {
			return row.original.role === "adm" ? (
				<Badge>ผู้จัดการ</Badge>
			) : (
				<Badge variant={"secondary"}>พนักงาน</Badge>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const employee = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<Link href={`/employees/${employee.id}`}>
							<DropdownMenuItem className="flex justify-between">
								<Eye className="opacity-60" />
								ดู
							</DropdownMenuItem>
						</Link>
						<Link href={`/employees/${employee.id}/edit`}>
							<DropdownMenuItem className="flex justify-between">
								<Pencil className="opacity-60" />
								แก้ไข
							</DropdownMenuItem>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

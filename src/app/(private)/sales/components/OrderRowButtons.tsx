import React from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Pencil, Receipt } from "lucide-react";
import Link from "next/link";
import { IOrder } from "@/types/Order";
import { useSession } from "next-auth/react";

const OrderRowButtons = ({ order }: { order: IOrder }) => {
	const { data: session } = useSession();
	const userInfo = session?.user;

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
				{userInfo?.role === "adm" && (
					<Link href={`/sales/${order.id}/edit`}>
						<DropdownMenuItem className="flex justify-between">
							<Pencil className="opacity-60" />
							แก้ไข
						</DropdownMenuItem>
					</Link>
				)}
				<Link href={`/sales/${order.id}/receipt`}>
					<DropdownMenuItem className="flex justify-between">
						<Receipt className="opacity-60" />
						Receipt
					</DropdownMenuItem>
				</Link>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default OrderRowButtons;

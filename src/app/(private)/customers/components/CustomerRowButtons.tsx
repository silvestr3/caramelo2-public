import { ICustomer } from "@/types/Customer";
import React, { useContext } from "react";
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
import { OrderContext } from "@/context/OrderContext";

const CustomerRowButtons = ({ customer }: { customer: ICustomer }) => {
	const { addCustomerToOrder } = useContext(OrderContext);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<Link href={`/customers/${customer.id}`}>
					<DropdownMenuItem className="flex justify-between">
						<Eye className="opacity-60" />
						ดู
					</DropdownMenuItem>
				</Link>
				<Link href={`/customers/${customer.id}/edit`}>
					<DropdownMenuItem className="flex justify-between">
						<Pencil className="opacity-60" />
						แก้ไข
					</DropdownMenuItem>
				</Link>
				<DropdownMenuItem
					onClick={() => addCustomerToOrder(customer)}
					className="flex justify-between"
				>
					<ShoppingCart className="opacity-60" />
					Add
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default CustomerRowButtons;

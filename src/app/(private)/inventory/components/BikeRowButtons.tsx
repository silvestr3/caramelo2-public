import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Pencil, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { OrderContext } from "@/context/OrderContext";
import { Button } from "@/components/ui/button";
import { IBike } from "@/types/Bike";

const BikeRowButtons = ({ bike }: { bike: IBike }) => {
	const { addBikeToOrder } = useContext(OrderContext);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<Link href={`/inventory/${bike.id}`}>
					<DropdownMenuItem className="flex justify-between">
						<Eye className="opacity-60" />
						ดู
					</DropdownMenuItem>
				</Link>
				<Link href={`/inventory/${bike.id}/edit`}>
					<DropdownMenuItem className="flex justify-between">
						<Pencil className="opacity-60" />
						แก้ไข
					</DropdownMenuItem>
				</Link>
				<DropdownMenuItem
					onClick={() => addBikeToOrder(bike)}
					className="flex justify-between"
				>
					<ShoppingCart className="opacity-60" />
					เพิ่ม
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default BikeRowButtons;

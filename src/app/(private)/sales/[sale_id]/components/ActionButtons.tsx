import { Button } from "@/components/ui/button";
import { IOrder } from "@/types/Order";
import { Trash2, Pencil, ShoppingCart, Receipt } from "lucide-react";
import Link from "next/link";
import React from "react";
import DeleteOrderDialog from "./DeleteOrderDialog";

interface ActionButtonsProps {
	order: IOrder;
}

const ActionButtons = ({ order }: ActionButtonsProps) => {
	return (
		<div className="w-full flex justify-between">
			<DeleteOrderDialog order={order}>
				<Button className="flex items-center gap-2" variant={"destructive"}>
					<Trash2 size={"1rem"} opacity={"60%"} />
					Delete
				</Button>
			</DeleteOrderDialog>

			<div className="flex gap-1">
				<Link href={`/sales/${order.id}/edit`}>
					<Button className="flex items-center gap-2">
						<Pencil size={"1rem"} opacity={"60%"} />
						Edit
					</Button>
				</Link>

				<Button className="flex items-center gap-2">
					<Receipt size={"1rem"} opacity={"60%"} />
					Receipt
				</Button>
			</div>
		</div>
	);
};

export default ActionButtons;

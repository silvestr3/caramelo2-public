"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { deleteOrder } from "@/services/OrderService";
import { IOrder } from "@/types/Order";
import { getDate } from "@/util/GetDateString";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface DeleteOrderDialogProps {
	order: IOrder;
	children: React.ReactNode;
}

const DeleteOrderDialog = ({ order, children }: DeleteOrderDialogProps) => {
	const router = useRouter();

	const handleDeleteOrder = async () => {
		const del = await deleteOrder(order.id);

		if (del) {
			router.push("/sales");
			toast.success(`Order ${order.id} has been deleted`, {
				description: getDate(new Date()),
			});
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Confirm delete order {order.id}?</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					<h4>The following products will return to inventory: </h4>
					<ul className="mt-2">
						{order.bikes.map((bike) => (
							<li>{bike.model_name}</li>
						))}
					</ul>
				</DialogDescription>
				<DialogFooter className="sm:justify-between">
					<DialogClose asChild>
						<Button variant="secondary">Cancel</Button>
					</DialogClose>
					<Button
						onClick={handleDeleteOrder}
						className="flex items-center gap-2"
						variant={"destructive"}
					>
						<Trash2 size={"1rem"} opacity={"60%"} />
						Yes, delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteOrderDialog;

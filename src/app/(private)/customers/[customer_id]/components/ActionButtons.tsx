import { Button } from "@/components/ui/button";
import { ICustomer } from "@/types/Customer";
import { Trash2, Pencil, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import DeleteCustomerDialog from "./DeleteCustomerDialog";

const ActionButtons = ({ customer }: { customer: ICustomer }) => {
	return (
		<div className="w-full flex justify-between">
			<DeleteCustomerDialog customer={customer}>
				<Button className="flex items-center gap-2" variant={"destructive"}>
					<Trash2 size={"1rem"} opacity={"60%"} />
					Delete
				</Button>
			</DeleteCustomerDialog>

			<div className="flex gap-1">
				<Link href={`/customers/${customer.id}/edit`}>
					<Button className="flex items-center gap-2">
						<Pencil size={"1rem"} opacity={"60%"} />
						Edit
					</Button>
				</Link>
				<Button className="flex items-center gap-2">
					<ShoppingCart size={"1rem"} opacity={"60%"} />
					New
				</Button>
			</div>
		</div>
	);
};

export default ActionButtons;

import { Button } from "@/components/ui/button";
import { IBike } from "@/types/Bike";
import { Trash2, Pencil, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ActionButtonsProps {
	bike: IBike;
}

const ActionButtons = ({ bike }: ActionButtonsProps) => {
	return (
		<div className="w-full flex justify-between">
			<Button className="flex items-center gap-2" variant={"destructive"}>
				<Trash2 size={"1rem"} opacity={"60%"} />
				Delete
			</Button>

			<div className="flex gap-1">
				<Link href={`/inventory/${bike.id}/edit`}>
					<Button className="flex items-center gap-2">
						<Pencil size={"1rem"} opacity={"60%"} />
						Edit
					</Button>
				</Link>
				<Button className="flex items-center gap-2">
					<ShoppingCart size={"1rem"} opacity={"60%"} />
					Add
				</Button>
			</div>
		</div>
	);
};

export default ActionButtons;

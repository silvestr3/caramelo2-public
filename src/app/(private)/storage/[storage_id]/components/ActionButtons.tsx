import { Button } from "@/components/ui/button";
import { IStorage } from "@/types/Storage";
import { Trash2, Pencil, ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import DeleteStorageDialog from "./DeleteStorageDialog";

const ActionButtons = ({ storage }: { storage: IStorage }) => {
	return (
		<div className="w-full flex justify-between col-span-2">
			<DeleteStorageDialog storage={storage}>
				<Button className="flex items-center gap-2" variant={"destructive"}>
					<Trash2 size={"1rem"} opacity={"60%"} />
					Delete
				</Button>
			</DeleteStorageDialog>

			<Link href={`/storage/${storage.id}/edit`}>
				<Button className="flex items-center gap-2">
					<Pencil size={"1rem"} opacity={"60%"} />
					Edit
				</Button>
			</Link>
		</div>
	);
};

export default ActionButtons;

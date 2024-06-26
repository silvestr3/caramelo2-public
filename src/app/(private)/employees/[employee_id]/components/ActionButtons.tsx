"use client";

import { Button } from "@/components/ui/button";
import { IEmployee } from "@/types/IEmployee";
import { Trash2, Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";
import DeleteEmployeeDialog from "./DeleteEmployeeDialog";
import { useSession } from "next-auth/react";

const ActionButtons = ({ employee }: { employee: IEmployee }) => {
	const { data: session } = useSession();
	const userInfo = session?.user;

	return (
		<div className="col-span-2 flex items-end justify-between py-5">
			{userInfo?.username !== employee.username && (
				<DeleteEmployeeDialog employee={employee}>
					<Button className="flex items-center gap-2" variant={"destructive"}>
						<Trash2 size={"1rem"} opacity={"60%"} />
						Delete
					</Button>
				</DeleteEmployeeDialog>
			)}

			<Link href={`/employees/${employee.id}/edit`}>
				<Button className="flex items-center gap-2" variant={"default"}>
					<Pencil size={"1rem"} opacity={"60%"} />
					Edit
				</Button>
			</Link>
		</div>
	);
};

export default ActionButtons;

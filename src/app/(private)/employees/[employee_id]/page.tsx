import { getEmployee } from "@/services/EmployeeService";
import { IEmployee } from "@/types/IEmployee";
import React from "react";

import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Pencil, Trash2 } from "lucide-react";
import ActionButtons from "./components/ActionButtons";
import { Badge } from "@/components/ui/badge";

interface ViewEmployeeProps {
	params: {
		employee_id: string;
	};
}

const ViewEmployee = async ({ params }: ViewEmployeeProps) => {
	const employee = (await getEmployee(
		parseInt(params.employee_id)
	)) as IEmployee;

	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/employees">พนักงาน</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{employee.name}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<Separator className="my-2" />

			<div className="py-2 grid grid-cols-2 gap-x-5 h-full">
				<div className="col-span-2 flex items-center justify-between">
					<div className="place-self-start">
						<h2 className="text-3xl font-semibold">{employee.name}</h2>
						<h3>{employee.username}</h3>
					</div>

					{employee.role === "adm" ? (
						<Badge className="place-self-start text-xs font-bold">
							ผู้จัดการ
						</Badge>
					) : (
						<Badge
							variant={"secondary"}
							className="place-self-start text-xs font-bold"
						>
							พนักงาน
						</Badge>
					)}
				</div>

				<ActionButtons employee={employee} />
			</div>
		</>
	);
};

export default ViewEmployee;

import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import EmployeeForm from "../../new/components/EmployeeForm";
import { getEmployee } from "@/services/EmployeeService";

interface EditEmployeeParams {
	params: {
		employee_id: string;
	};
}

const EditEmployee = async ({ params }: EditEmployeeParams) => {
	const employee = await getEmployee(parseInt(params.employee_id));

	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/employees">ลูกค้า</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href={`/employees/${params.employee_id}`}>
							{employee.name}
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Edit</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Separator className="my-2" />

			<div className="py-2 grid grid-cols-2 place-content-start gap-x-5 h-full">
				<div className="col-span-2 max-h-[20%]">
					<h2 className="text-3xl font-semibold prompt">
						Edit employee - {employee.name}
					</h2>
				</div>

				<EmployeeForm employee={employee} />
			</div>
		</>
	);
};

export default EditEmployee;

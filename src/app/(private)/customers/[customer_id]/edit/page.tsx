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
import CustomerForm from "../../new/components/CustomerForm";
import { getCustomer } from "@/services/CustomerService";

interface EditCustomerParams {
	params: {
		customer_id: string;
	};
}

const EditCustomer = async ({ params }: EditCustomerParams) => {
	const customer = await getCustomer(parseInt(params.customer_id)).then(
		(res) => {
			if (!res.ok) {
				return null;
			}

			return res.json();
		}
	);

	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/customers">ลูกค้า</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href={`/customers/${customer.id}`}>
							{customer.name}
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
						Edit customer - {customer.name}
					</h2>
				</div>

				<CustomerForm customer={customer} />
			</div>
		</>
	);
};

export default EditCustomer;

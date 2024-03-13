import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getBike } from "@/services/InventoryService";
import { Separator } from "@/components/ui/separator";

interface EditBikeParams {
	params: {
		bike_id: string;
	};
}

const EditBike = async ({ params }: EditBikeParams) => {
	const bike = await getBike(parseInt(params.bike_id)).then((res) => {
		if (!res.ok) {
			return null;
		}

		return res.json();
	});

	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/inventory">สินค้า</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href={`/inventory/${bike.id}`}>
							{bike.model_name}
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Edit</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Separator className="my-2" />
		</>
	);
};

export default EditBike;

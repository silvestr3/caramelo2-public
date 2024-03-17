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
import BikeForm from "../../new/components/BikeForm";
import { getStorages } from "@/services/StorageService";

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

	const storages = await getStorages().then((res) => res.json());

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

			<div className="py-2 grid grid-cols-2 place-content-start gap-x-5 h-full">
				<div className="col-span-2 max-h-[20%]">
					<h2 className="text-3xl font-semibold prompt">
						Edit product - {bike.model_name}
					</h2>
				</div>

				<BikeForm bike={bike} />
			</div>
		</>
	);
};

export default EditBike;

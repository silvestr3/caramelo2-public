import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import React from "react";
import BikeForm from "./components/BikeForm";
import { getStorages } from "@/services/StorageService";

const CreateBike = async () => {
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
						<BreadcrumbPage>Register product</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<Separator className="my-2" />

			<div className="py-2 grid grid-cols-2 place-content-start gap-x-5 h-full">
				<div className="col-span-2 max-h-[20%]">
					<h2 className="text-3xl font-semibold prompt">New product</h2>
				</div>

				<BikeForm storages={storages} />
			</div>
		</>
	);
};

export default CreateBike;

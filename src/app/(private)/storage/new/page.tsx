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
import StorageForm from "./components/StorageForm";
import { getStorages } from "@/services/StorageService";

const CreateBike = async () => {
	const storages = await getStorages().then((res) => res.json());

	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/storage">สถานที่จัดเก็บ</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Register new storage</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<Separator className="my-2" />

			<div className="py-2 grid grid-cols-2 place-content-start gap-x-5 h-full">
				<div className="col-span-2 max-h-[20%]">
					<h2 className="text-3xl font-semibold prompt">New storage</h2>
				</div>

				<StorageForm />
			</div>
		</>
	);
};

export default CreateBike;

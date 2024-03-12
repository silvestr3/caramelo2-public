import { DataTable } from "@/components/ui/data-table";
import { IBike } from "@/types/Bike";
import React from "react";
import { BikeColumns } from "../components/BikeColumn";

interface InventoryViewProps {
	bikes: IBike[];
}

const InventoryView = ({ bikes }: InventoryViewProps) => {
	console.log(bikes);
	return (
		<div className="overflow-y-auto max-h-full">
			<DataTable data={bikes} columns={BikeColumns} />
		</div>
	);
};

export default InventoryView;

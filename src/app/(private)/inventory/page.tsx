import { getBikes } from "@/services/InventoryService";
import React from "react";
import InventoryView from "./views/InventoryView";

const Inventory = async () => {
	const bikes = await getBikes().then((res) => res.json());

	return (
		<>
			<InventoryView bikes={bikes} />;
		</>
	);
};

export default Inventory;

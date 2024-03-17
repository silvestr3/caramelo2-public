import { IStorage } from "@/types/Storage";

export const price_info = (storages: IStorage[]) => [
	{
		name: "storage_place",
		label: "Storage place",
		placeholder: "NPG",
		options: storages.map((storage) => {
			return {
				label: storage.storage_name,
				value: `${storage.id}`,
			};
		}),
	},
	{
		name: "wholesale_price",
		label: "Wholesale price",
		placeholder: "Wholesale Price",
	},
	{
		name: "wholesale_price_net",
		label: "Wholesale price NET",
		placeholder: "Wholesale Price NET",
	},

	{
		name: "sale_price",
		label: "Sale price",
		placeholder: "Sale price",
	},
];

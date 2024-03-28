import { IBike } from "@/types/Bike";
import { ICustomer } from "@/types/Customer";
import { IEmployee } from "@/types/IEmployee";
import { IStorage } from "@/types/Storage";

interface HandleFilterProps {
	searchTerm: string;
	objList: IBike[] | ICustomer[] | IEmployee[] | IStorage[];
}

export const handleFilter = ({ searchTerm, objList }: HandleFilterProps) => {
	const filteredObjects = objList.filter((obj: any) => {
		for (const [_, value] of Object.entries(obj)) {
			if (String(value).toLowerCase().includes(searchTerm.toLowerCase())) {
				return obj;
			}
		}
	});

	return filteredObjects;
};

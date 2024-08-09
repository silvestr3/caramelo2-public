import { IBike } from "@/types/Bike";
import { ICustomer } from "@/types/Customer";
import { Gift } from "@/types/Gift";
import { IEmployee } from "@/types/IEmployee";
import { IStorage } from "@/types/Storage";

interface HandleFilterProps {
  searchTerm: string;
  objList: IBike[] | ICustomer[] | IEmployee[] | IStorage[] | Gift[];
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

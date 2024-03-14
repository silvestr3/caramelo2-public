import React from "react";
import CustomersView from "./views/CustomersView";
import { getCustomers } from "@/services/CustomerService";

const Customers = async () => {
	const customers = await getCustomers().then((res) => res.json());

	return <CustomersView customers={customers} />;
};

export default Customers;

import React from "react";
import CustomersView from "./views/CustomersView";
import { getCustomers } from "@/services/CustomerService";

const Customers = async () => {
	const customers = await getCustomers();

	return <CustomersView customers={customers} />;
};

export default Customers;

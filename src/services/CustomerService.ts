"use server";
import { ICustomer } from "@/types/Customer";
import { authorizedFetch } from "@/util/AuthorizedFetch";
import { revalidatePath, revalidateTag } from "next/cache";

export const getCustomers = async () => {
	"use server";
	const response = await authorizedFetch(`${process.env.API_URL}/customers`, {
		next: {
			revalidate: 0,
		},
	});

	return response;
};

export const createCustomer = async (payload: ICustomer) => {
	"use server";
	const response = await authorizedFetch(`${process.env.API_URL}/customers/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (response.status === 201) {
		revalidatePath("/customers");
	}

	return response;
};

export const getCustomer = async (customer_id: number) => {
	"use server";
	const response = await authorizedFetch(
		`${process.env.API_URL}/customers/${customer_id}/`,
		{
			next: {
				tags: ["getCustomer", `${customer_id}`],
				revalidate: 0,
			},
		}
	);

	return response;
};

export const editCustomer = async (customer_id: number, payload: ICustomer) => {
	"use server";
	const response = await authorizedFetch(
		`${process.env.API_URL}/customers/${customer_id}/`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		}
	);

	if (response.status == 200) {
		revalidateTag("getCustomer");
	}

	return response;
};

export const deleteCustomer = async (customer_id: number) => {
	"use server";
	const response = await authorizedFetch(
		`${process.env.API_URL}/customers/${customer_id}/`,
		{
			method: "DELETE",
		}
	);

	if (response.status == 204) {
		revalidatePath("/customers");
	}

	return response;
};

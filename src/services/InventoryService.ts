"use server";
import { IBike } from "@/types/Bike";
import { authorizedFetch } from "@/util/AuthorizedFetch";
import { revalidatePath, revalidateTag } from "next/cache";

export const getBikes = async () => {
	"use server";
	const response = await authorizedFetch(`${process.env.API_URL}/inventory/`, {
		next: {
			revalidate: 0,
		},
	});

	return response;
};

export const createBike = async (payload: IBike) => {
	"use server";
	const response = await authorizedFetch(`${process.env.API_URL}/inventory/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (response.status === 201) {
		revalidatePath("/inventory");
	}
	return response;
};

export const getBike = async (bike_id: number) => {
	"use server";
	const response = await authorizedFetch(
		`${process.env.API_URL}/inventory/${bike_id}/`,
		{
			next: {
				tags: ["getBike", `${bike_id}`],
				revalidate: 0,
			},
		}
	);

	return response;
};

export const editBike = async (bike_id: number, payload: IBike) => {
	"use server";
	const response = await authorizedFetch(
		`${process.env.API_URL}/inventory/${bike_id}/`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		}
	);

	if (response.status == 200) {
		revalidateTag("getBike");
	}
	return response;
};

export const deleteBike = async (bike_id: number) => {
	"use server";
	const response = await authorizedFetch(
		`${process.env.API_URL}/inventory/${bike_id}/`,
		{
			method: "DELETE",
		}
	);

	if (response.status == 204) {
		revalidatePath("/inventory");
	}

	return response;
};

export const getStorageBikes = async (storage_id: number) => {
	"use server";
	const response = await authorizedFetch(
		`${process.env.API_URL}/inventory/?storage=${storage_id}`,
		{}
	);

	return response;
};

export const importInventory = async (payload: {
	storage: number;
	bikes: IBike[];
}) => {
	"use server";
	const response = await authorizedFetch(
		`${process.env.API_URL}/inventory/import_inventory/`,
		{
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	if (response.status === 200) {
		revalidatePath("/inventory");
	}

	return response;
};
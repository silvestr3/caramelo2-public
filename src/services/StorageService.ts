"use server";
import { IStorage } from "@/types/Storage";
import { authorizedFetch } from "@/util/AuthorizedFetch";
import { getDate } from "@/util/GetDateString";
import { revalidatePath, revalidateTag } from "next/cache";

export const getStorages = async () => {
	"use server";
	const response = await authorizedFetch(`${process.env.API_URL}/storage/`, {
		next: {
			revalidate: 0,
		},
	});

	return response;
};

export const createStorage = async (payload: IStorage) => {
	"use server";
	const response = await authorizedFetch(`${process.env.API_URL}/storage/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (response.status === 201) {
		revalidatePath("/storages");
	}

	return response;
};

export const getStorage = async (storage_id: number) => {
	"use server";
	const response = await authorizedFetch(
		`${process.env.API_URL}/storage/${storage_id}/`,
		{
			next: {
				tags: ["getStorage", `${storage_id}`],
				revalidate: 0,
			},
		}
	);

	return response;
};

export const editStorage = async (storage_id: number, payload: IStorage) => {
	"use server";
	const response = await authorizedFetch(
		`${process.env.API_URL}/storage/${storage_id}/`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		}
	);

	if (response.status == 200) {
		revalidateTag("getStorage");
	}

	return response;
};

export const deleteStorage = async (storage_id: number) => {
	"use server";
	const response = await authorizedFetch(
		`${process.env.API_URL}/storage/${storage_id}/`,
		{
			method: "DELETE",
		}
	);

	if (response.status === 200) {
		revalidatePath("/storages");
		return true;
	}

	return null;
};

type TransferStorageDataType = {
	origin: number;
	destination: number;
	bikes: number[];
};

export const transferProducts = async (payload: TransferStorageDataType) => {
	"use server";
	const response = await authorizedFetch(
		`${process.env.API_URL}/storage/transfer/`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		}
	);

	if (response.status == 200) {
		return { status: "success", data: response.json() };
	} else {
		return { status: "error", data: response.json() };
	}
};

export const getStorageTransferHistory = async (
	startDate?: Date,
	endDate?: Date
) => {
	"use server";
	let request_params = [] as string[];

	if (startDate) {
		request_params.push(`startDate=${getDate(startDate)}`);
	}

	if (endDate) {
		request_params.push(`endDate=${getDate(endDate)}`);
	}
	const response = await authorizedFetch(
		`${process.env.API_URL}/storage/transfer/history/?${request_params.join(
			"&"
		)}`,
		{}
	);

	return response;
};

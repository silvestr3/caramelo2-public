"use server";
import { IStorage } from "@/types/Storage";
import { authorizedFetch } from "@/util/AuthorizedFetch";
import { revalidatePath, revalidateTag } from "next/cache";
import { DateType } from "react-tailwindcss-datepicker";

export const getStorages = async () => {
	"use server";
	const response = await authorizedFetch(`${process.env.API_URL}/storage/`, {
		next: {
			revalidate: 0,
		},
	}).then((res) => res.json());

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
		return { status: "success", data: response.json() };
	} else {
		return { status: "error", data: response.json() };
	}
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
	).then((res) => res.json());

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
		return { status: "success", data: response.json() };
	} else {
		return { status: "error", data: response.json() };
	}
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
		return { status: "success", data: response.json() };
	} else {
		return { status: "error", data: response.json() };
	}
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
	startDate?: DateType,
	endDate?: DateType
) => {
	"use server";
	let request_params = [] as string[];

	if (startDate) {
		request_params.push(`startDate=${startDate}`);
	}

	if (endDate) {
		request_params.push(`endDate=${endDate}`);
	}
	const response = await authorizedFetch(
		`${process.env.API_URL}/storage/transfer/history/?${request_params.join(
			"&"
		)}`,
		{}
	);
	if (response.status == 200) {
		return response.json();
	} else {
		return { status: "error", data: response.json() };
	}
};

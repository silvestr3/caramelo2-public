"use server";

import { authorizedFetch } from "@/util/AuthorizedFetch";

export const getSalesVolumeReport = async () => {
	"use server";

	const response = await authorizedFetch(
		`${process.env.API_URL}/reports/sales/volume`,
		{
			next: {
				revalidate: 0,
			},
		}
	);

	return response?.json();
};

export const getSalesPaymentMethodsReport = async () => {
	"use server";

	const response = await authorizedFetch(
		`${process.env.API_URL}/reports/sales/payment_method`,
		{
			next: {
				revalidate: 0,
			},
		}
	);

	return response?.json();
};

export const getInventoryBrandsReport = async () => {
	"use server";

	const response = await authorizedFetch(
		`${process.env.API_URL}/reports/inventory/brands`,
		{
			next: {
				revalidate: 0,
			},
		}
	);

	return response?.json();
};

export const getInventoryModelsReport = async () => {
	"use server";

	const response = await authorizedFetch(
		`${process.env.API_URL}/reports/inventory/models`,
		{
			next: {
				revalidate: 0,
			},
		}
	);

	return response?.json();
};

export const getInventoryStoragesReport = async () => {
	"use server";

	const response = await authorizedFetch(
		`${process.env.API_URL}/reports/inventory/storages`,
		{
			next: {
				revalidate: 0,
			},
		}
	);

	return response?.json();
};

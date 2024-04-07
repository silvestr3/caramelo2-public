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

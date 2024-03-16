"use server";
import { IOrder } from "@/types/Order";
import { authorizedFetch } from "@/util/AuthorizedFetch";
import { revalidatePath, revalidateTag } from "next/cache";

export const getOrders = async () => {
	"use server";
	const response = await authorizedFetch(`${process.env.API_URL}/order/`, {
		next: {
			revalidate: 0,
		},
	});

	return response;
};

export const createOrder = async (payload: IOrder) => {
	"use server";
	const response = await authorizedFetch(`${process.env.API_URL}/order/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (response.status === 200) {
		revalidatePath("/inventory");
		revalidatePath("/sales");
	}

	return response;
};

export const getOrder = async (order_id: number) => {
	"use server";
	const response = await authorizedFetch(
		`${process.env.API_URL}/order/${order_id}/`,
		{
			next: {
				tags: ["getOrder", `${order_id}`],
				revalidate: 0,
			},
		}
	);

	return response;
};

type EditOrderFormDataType = {
	bikePrice: number;
	paymentMethod: string;
	notes: string;
	additionalFees: { id: number; description: string; amount: number }[];
	discount: number;
	downPayment: number;
};

export const editOrder = async (
	order_id: number,
	payload: EditOrderFormDataType
) => {
	"use server";
	const response = await authorizedFetch(
		`${process.env.API_URL}/order/${order_id}/`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		}
	);

	if (response.status == 200) {
		revalidateTag("getOrder");
		revalidatePath("sales");
	}

	return response;
};

export const deleteOrder = async (order_id: number) => {
	"use server";
	const response = await authorizedFetch(
		`${process.env.API_URL}/order/${order_id}/`,
		{
			method: "DELETE",
		}
	);

	if (response.status == 200) {
		revalidatePath("/sales");
		revalidatePath("/inventory");

		return true;
	}

	return null;
};

export const getCustomerOrders = async (customer_id: number) => {
	"use server";

	const response = await authorizedFetch(
		`${process.env.API_URL}/order/?customer=${customer_id}`,
		{}
	).then((res) => res.json());

	return response;
};

export const getFilteredOrders = async ({
	customer_id,
	bike_id,
	startDate,
	endDate,
}: {
	customer_id?: number;
	bike_id?: number;
	startDate?: Date;
	endDate?: Date;
}) => {
	"use server";

	let request_params = [] as string[];

	if (customer_id) {
		request_params.push(`customer=${customer_id}`);
	}
	if (bike_id) {
		request_params.push(`bike=${bike_id}`);
	}
	if (startDate) {
		request_params.push(`startDate=${startDate.toISOString().split("T")[0]}`);
	}

	if (endDate) {
		request_params.push(`endDate=${endDate.toISOString().split("T")[0]}`);
	}

	const response = await authorizedFetch(
		`${process.env.API_URL}/order/?${request_params.join("&")}`,
		{}
	).then((res) => res.json());

	return response;
};

export const getLatestOrders = async () => {
	"use server";
	const response = await authorizedFetch(
		`${process.env.API_URL}/order/latest/`,
		{}
	);
	return response;
};

export const getReceiptData = async (order_id: number) => {
	"use server";

	const response = await authorizedFetch(
		`${process.env.API_URL}/order/${order_id}/receipt/`,
		{}
	);

	return response;
};

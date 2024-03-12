"use server";
import { IOrder } from "@/types/Order";
import { authorizedFetch } from "@/util/AuthorizedFetch";
import { revalidatePath, revalidateTag } from "next/cache";
import { DateType } from "react-tailwindcss-datepicker";

export const getOrders = async () => {
	"use server";
	const response = await authorizedFetch(`${process.env.API_URL}/order/`, {
		next: {
			revalidate: 0,
		},
	}).then((res) => res.json());

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
		return { status: "success", data: response.json() };
	} else {
		return { status: "error", data: response.json() };
	}
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
	).then((res) => res.json());

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
		return { status: "success", data: response.json() };
	} else {
		return { status: "error", data: response.json() };
	}
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
		return { status: "success", data: response.json() };
	} else {
		return { status: "error", data: response.json() };
	}
};

export const getCustomerOrders = async (customer_id: number) => {
	"use server";

	const response = await authorizedFetch(
		`${process.env.API_URL}/order/?customer=${customer_id}`,
		{}
	);

	if (response.status === 200) {
		return response.json();
	} else {
		return { status: "error", data: response.json() };
	}
};

export const getFilteredOrders = async ({
	customer_id,
	startDate,
	endDate,
}: {
	customer_id?: number;
	startDate?: DateType;
	endDate?: DateType;
}) => {
	"use server";

	let request_params = [] as string[];

	if (customer_id) {
		request_params.push(`customer=${customer_id}`);
	}
	if (startDate) {
		request_params.push(`startDate=${startDate}`);
	}

	if (endDate) {
		request_params.push(`endDate=${endDate}`);
	}

	const response = await authorizedFetch(
		`${process.env.API_URL}/order/?${request_params.join("&")}`,
		{}
	);

	if (response.status === 200) {
		return response.json();
	} else {
		return { status: "error", data: response.json() };
	}
};

export const getLatestOrders = async () => {
	"use server";
	const response = await authorizedFetch(
		`${process.env.API_URL}/order/latest/`,
		{}
	);
	if (response.status === 200) {
		return response.json();
	} else {
		return { status: "error", data: response.json() };
	}
};

export const getReceiptData = async (order_id: number) => {
	"use server";

	const response = await authorizedFetch(
		`${process.env.API_URL}/order/${order_id}/receipt/`,
		{}
	);

	if (response.status === 200) {
		return response.json();
	} else {
		return { status: "error", data: response.json() };
	}
};

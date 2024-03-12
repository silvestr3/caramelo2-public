import { IAdditionalFee } from "./AdditionalFee";
import { IBike } from "./Bike";

export interface IOrder {
	id: number;
	sale_date: Date;
	customer: number;
	bikes: IBike[];

	discount: number;
	down_payment: number;
	additional_fees?: IAdditionalFee[];
	total: number;

	payment_method: string;
	notes: string;
}

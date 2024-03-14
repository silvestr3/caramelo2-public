"use client";
import React, { useEffect, useState } from "react";
import ProductBadge from "../../components/ProductBadge";
import { IBike } from "@/types/Bike";

interface ProductHeaderProps {
	bike: IBike;
}

const ProductHeader = ({ bike }: ProductHeaderProps) => {
	const [badge, setBadge] = useState<"sold" | "available" | "order">(
		!bike.sold ? "available" : "sold"
	);

	return (
		<>
			<div>
				<h2 className="text-3xl font-semibold prompt">{bike.model_name}</h2>
				<h3 className="text-xl prompt opacity-60">{bike.model_code}</h3>
			</div>

			<div className="justify-self-end flex flex-col items-end">
				<ProductBadge type={badge} />
			</div>
		</>
	);
};

export default ProductHeader;

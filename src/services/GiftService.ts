"use server";

import { Gift } from "@/types/Gift";
import { authorizedFetch } from "@/util/AuthorizedFetch";
import { revalidatePath, revalidateTag } from "next/cache";

export const getGifts = async () => {
  "use server";
  const response = await authorizedFetch(`${process.env.API_URL}/gifts`, {
    next: {
      revalidate: 0,
    },
  }).then((res) => res?.json());

  return response;
};

export const getGift = async (gift_id: number) => {
  "use server";
  const response = await authorizedFetch(
    `${process.env.API_URL}/gifts/${gift_id}/`,
    {
      next: {
        tags: ["getGift", `${gift_id}`],
        revalidate: 0,
      },
    }
  );

  return response;
};

export const createGift = async (payload: Gift) => {
  "use server";
  const response = await authorizedFetch(`${process.env.API_URL}/gifts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let status = "error";

  if (response?.status === 201) {
    revalidatePath("/gifts");
    status = "success";
  }

  return { status, data: response?.json() };
};

export const addGiftsToStock = async (giftId: number, amount: number) => {
  "use server";
  const response = await authorizedFetch(
    `${process.env.API_URL}/gifts/${giftId}/add/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
      }),
    }
  );

  let status = "error";

  if (response?.status === 200) {
    revalidatePath("/gifts");
    revalidateTag("getGift");
    status = "success";
  }

  const data = await response?.json();

  return { status, data };
};
